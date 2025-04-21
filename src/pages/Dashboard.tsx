
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User } from "lucide-react";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
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
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4 bg-blue-50">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-10 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-python-blue mb-4">Welcome back, {user?.email}!</h1>
          <div className="flex flex-col items-center gap-3">
            <User className="w-14 h-14 text-python-blue mb-2" />
            <p className="text-lg text-gray-700">
              This is your personalized dashboard. Access your courses and resources below.
            </p>
            <div className="w-full flex flex-col items-center gap-4 mt-6">
              <a href="/courses" className="bg-python-blue text-white rounded-full px-8 py-3 text-lg shadow hover:bg-blue-700 transition-colors">
                Go to Courses
              </a>
              <a href="/profile" className="border border-python-blue text-python-blue rounded-full px-8 py-3 text-lg shadow hover:bg-blue-50 transition-colors">
                Visit Your Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
