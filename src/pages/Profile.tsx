
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
import { Image, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Always update user and session properly
    const getInitialSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/signin");
        return;
      }
      setUser(session.user);
      await fetchProfile(session.user.id);
      setIsLoading(false);
    };

    getInitialSession();

    // Also listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        navigate("/signin");
      }
    });
    
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url || null);
      } else {
        // If no profile exists yet, create one
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ 
            id: userId,
            display_name: user?.email?.split('@')[0] || "User",
            updated_at: new Date().toISOString()
          });
          
        if (insertError) {
          throw insertError;
        }
        
        // Set default values after creating the profile
        setDisplayName(user?.email?.split('@')[0] || "User");
        setBio("");
      }
    } catch (error: any) {
      toast.error("Error loading profile", { description: error.message });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    try {
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
        throw error;
      }
      
      toast.success("Profile updated!");
      await fetchProfile(user.id);
    } catch (error: any) {
      toast.error("Update failed", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    setAvatarUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error("Failed to get public URL for avatar");
      }

      // Update profile with new avatar URL
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({ 
          avatar_url: data.publicUrl, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);
        
      if (updateErr) {
        throw updateErr;
      }
      
      setAvatarUrl(data.publicUrl);
      toast.success("Profile picture updated!");
    } catch (error: any) {
      toast.error("Failed to update avatar", { description: error.message });
    } finally {
      setAvatarUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-python-blue" />
        </div>
        <Footer />
      </div>
    );
  }

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
              <Avatar className="w-24 h-24">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-gray-100">
                    <Image className="w-10 h-10 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>
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
                value={bio || ""}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us a little about yourself (optional)"
                maxLength={160}
              />
            </div>
            {/* Save Button */}
            <Button 
              type="submit" 
              className="w-full bg-python-blue hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : "Save"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
