
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Lock } from 'lucide-react';

interface PremiumContentProps {
  children: React.ReactNode;
  preview?: boolean;
}

const PremiumContent: React.FC<PremiumContentProps> = ({ children, preview = false }) => {
  return (
    <div className="premium-content">
      <span className="premium-badge">PREMIUM</span>
      
      {preview ? (
        <div className="space-y-4">
          <div className="blur-sm select-none">{children}</div>
          <div className="flex flex-col items-center justify-center p-4 space-y-3 bg-gray-100 rounded-md">
            <Lock className="text-python-blue h-8 w-8" />
            <h3 className="font-semibold text-center">Premium Content</h3>
            <p className="text-sm text-gray-600 text-center">
              Subscribe to unlock this and all premium content.
            </p>
            <Link to="/pricing">
              <Button className="bg-python-blue hover:bg-blue-700">
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PremiumContent;
