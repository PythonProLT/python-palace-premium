
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BookOpen, GraduationCap, Award } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/");
        return;
      }
      setUser(session.user);
      await fetchProfile(session.user.id);
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/");
      } else {
        setUser(session.user);
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  if (loading) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md mr-4">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-python-blue text-white text-xl">
                    {(profile?.display_name || user?.email || "U")[0].toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {profile?.display_name || user?.email?.split('@')[0] || "User"}!</h1>
                <p className="text-gray-600">Your personalized learning dashboard</p>
              </div>
            </div>
            <button 
              className="bg-python-blue text-white rounded-full px-6 py-2 font-medium hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-python-blue" />
                </div>
                <h2 className="text-xl font-semibold">Recent Courses</h2>
              </div>
              <ul className="space-y-3">
                <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                  <span>Python Fundamentals</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">In Progress</span>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                  <span>Data Analysis with Pandas</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">New</span>
                </li>
              </ul>
              <a href="/courses" className="text-python-blue hover:underline mt-4 inline-block">View all courses</a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold">Your Progress</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Python Fundamentals</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-python-blue rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Analysis</span>
                    <span>25%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-python-blue rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
              <a href="/profile" className="text-python-blue hover:underline mt-4 inline-block">View full report</a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold">Achievements</h2>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-2">
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mb-1">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-xs text-center">First Course</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="bg-gray-100 p-2 rounded-full mb-1">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-xs text-center">Completed</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="bg-gray-100 p-2 rounded-full mb-1">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-xs text-center">Advanced</span>
                </div>
              </div>
              <a href="/profile" className="text-python-blue hover:underline mt-2 inline-block">See all achievements</a>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium">Advanced Python Techniques</h3>
                  <p className="text-sm text-gray-600 mt-1">Take your Python skills to the next level</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium">Web Development with Django</h3>
                  <p className="text-sm text-gray-600 mt-1">Build powerful web applications</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium">Machine Learning Basics</h3>
                  <p className="text-sm text-gray-600 mt-1">Introduction to AI and ML concepts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
