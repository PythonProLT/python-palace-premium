
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User } from "@supabase/supabase-js";
import { Image } from "lucide-react";

const AVATARS_BUCKET = "avatars";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Always update user and session properly
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/signin");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });
    // Also listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        navigate("/signin");
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) {
      setProfile(data);
      setDisplayName(data.display_name);
      setBio(data.bio || "");
      setAvatarUrl(data.avatar_url || null);
    }
    if (error) {
      toast.error("Could not fetch profile", { description: error.message });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updates = {
      display_name: displayName,
      bio,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);
    if (error) {
      toast.error("Update failed", { description: error.message });
    } else {
      toast.success("Profile updated!");
      fetchProfile(user.id);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    setAvatarUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = fileName;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(AVATARS_BUCKET)
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setAvatarUploading(false);
      toast.error("Failed to upload avatar", { description: uploadError.message });
      return;
    }

    // Get public URL & update profile
    const { data } = supabase.storage
      .from(AVATARS_BUCKET)
      .getPublicUrl(filePath);

    if (data?.publicUrl) {
      setAvatarUrl(data.publicUrl);
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (updateErr) {
        toast.error("Failed to update avatar URL", { description: updateErr.message });
      } else {
        toast.success("Profile picture updated!");
      }
    }
    setAvatarUploading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-1">
            Your Profile
          </h2>
          <form className="space-y-6" onSubmit={handleSave}>
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border">
                {avatarUrl ?
                  (<img src={avatarUrl} alt="Avatar" className="object-cover w-24 h-24" />)
                  : <Image className="w-10 h-10 text-gray-400" />}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={avatarUploading}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
              >
                {avatarUploading ? "Uploading..." : "Change Profile Picture"}
              </Button>
            </div>
            {/* Display Name */}
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                maxLength={32}
              />
            </div>
            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us a little about yourself (optional)"
                maxLength={160}
              />
            </div>
            {/* Save Button */}
            <Button type="submit" className="w-full bg-python-blue hover:bg-blue-700">Save</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
