
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Shield, Zap } from "lucide-react";
import { activateTestSubscription } from "@/utils/subscriptionService";
import { useNavigate } from "react-router-dom";

const TestPayment = () => {
  const navigate = useNavigate();

  const handleSubscribe = async (tier: 'premium' | 'enterprise') => {
    const success = await activateTestSubscription(tier);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Test Payment System</h1>
            <p className="text-lg text-gray-600">
              This is a simulated payment system for testing premium features.
              No real payments are processed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto text-python-blue mb-4" />
                <h2 className="text-2xl font-bold mb-2">Premium</h2>
                <p className="text-3xl font-bold">$15/month</p>
                <p className="text-gray-500 mt-2">Perfect for individual learners</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-python-blue mr-2" />
                  Access to all premium courses
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-python-blue mr-2" />
                  Priority support
                </li>
              </ul>
              <Button 
                className="w-full bg-python-blue hover:bg-blue-700"
                onClick={() => handleSubscribe('premium')}
              >
                Activate Premium (Test)
              </Button>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
                <p className="text-3xl font-bold">$49/month</p>
                <p className="text-gray-500 mt-2">For teams and organizations</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  Everything in Premium
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  Team management features
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  Custom learning paths
                </li>
              </ul>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleSubscribe('enterprise')}
              >
                Activate Enterprise (Test)
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPayment;
