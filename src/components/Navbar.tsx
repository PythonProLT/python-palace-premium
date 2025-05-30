
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, LogIn, User, LogOut, Code } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });
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
    if (data?.avatar_url) setAvatarUrl(data.avatar_url);
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
          <Link to="/projects" className="text-gray-700 hover:text-python-blue transition-colors flex items-center gap-1">
            <Code size={16} />
            Projects
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-python-blue transition-colors">Pricing</Link>
          <Link to="/blog" className="text-gray-700 hover:text-python-blue transition-colors">Blog</Link>
          {user ? (
            // Profile dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center px-2 py-1">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <Link to="/projects" className="text-gray-700 hover:text-python-blue transition-colors py-2 flex items-center gap-1">
            <Code size={16} />
            Projects
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-python-blue transition-colors py-2">Pricing</Link>
          <Link to="/blog" className="text-gray-700 hover:text-python-blue transition-colors py-2">Blog</Link>
          {user ? (
            <div className="space-y-2">
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-python-blue transition-colors py-2">
                <User className="mr-2 h-4 w-4" /> My Profile
              </Link>
              <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-python-blue transition-colors py-2">
                <User className="mr-2 h-4 w-4" /> Dashboard
              </Link>
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center text-red-600 hover:text-red-700 transition-colors py-2"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </button>
            </div>
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
