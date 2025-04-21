
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .maybeSingle();
    
    if (data?.avatar_url) {
      setAvatarUrl(data.avatar_url);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Successfully signed out');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-python-blue flex items-center justify-center">
            <span className="text-white font-bold">Py</span>
          </div>
          <span className="font-bold text-xl text-python-blue">PythonPalace</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-python-blue transition-colors">Home</Link>
          <Link to="/courses" className="text-gray-700 hover:text-python-blue transition-colors">Courses</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-python-blue transition-colors">Pricing</Link>
          <Link to="/blog" className="text-gray-700 hover:text-python-blue transition-colors">Blog</Link>
          {user && (
            <Link to="/profile" className="text-gray-700 hover:text-python-blue transition-colors flex items-center">
              {avatarUrl ? (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={avatarUrl} alt="Profile" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="mr-2 h-4 w-4" />
              )}
              Profile
            </Link>
          )}
          {user ? (
            <Button onClick={handleSignOut} className="bg-python-blue hover:bg-blue-700">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          ) : (
            <Link to="/signin">
              <Button className="bg-python-blue hover:bg-blue-700">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden container mx-auto px-4 pt-4 pb-6 flex flex-col space-y-4 animate-fade-in">
          <Link to="/" className="text-gray-700 hover:text-python-blue transition-colors py-2">Home</Link>
          <Link to="/courses" className="text-gray-700 hover:text-python-blue transition-colors py-2">Courses</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-python-blue transition-colors py-2">Pricing</Link>
          <Link to="/blog" className="text-gray-700 hover:text-python-blue transition-colors py-2">Blog</Link>
          {user && (
            <Link to="/profile" className="text-gray-700 hover:text-python-blue transition-colors py-2 flex items-center">
              {avatarUrl ? (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={avatarUrl} alt="Profile" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="mr-2 h-4 w-4" />
              )}
              Profile
            </Link>
          )}
          {user ? (
            <Button onClick={handleSignOut} className="bg-python-blue hover:bg-blue-700 w-full">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          ) : (
            <Link to="/signin">
              <Button className="bg-python-blue hover:bg-blue-700 w-full">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
