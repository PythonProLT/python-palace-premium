import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error('Sign up failed', {
          description: error.message
        });
        return;
      }

      if (data.user) {
        // Create blank profile for new user (display_name defaults to email username)
        const defaultDisplayName =
          email.includes("@") ? email.split("@")[0] : email;
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          display_name: defaultDisplayName,
          bio: "",
          avatar_url: null,
        });
        if (profileError) {
          toast.error("Profile creation failed", {
            description: profileError.message,
          });
        } else {
          toast.success('Successfully signed up! Please check your email to confirm your account.');
        }
        navigate('/signin');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <div className="mx-auto h-12 w-12 rounded bg-python-blue flex items-center justify-center">
              <span className="text-white font-bold">Py</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/signin" className="font-medium text-python-blue hover:text-blue-700">
                sign in to your existing account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-t-md"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="rounded-b-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-python-blue hover:bg-blue-700"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
