
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Learning Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invest in your future with the right Python learning plan for your goals.
            Upgrade anytime as you grow.
          </p>
        </div>
      </section>
      
      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg shadow-sm p-8 relative">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for beginners exploring Python basics.</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Access to beginner tutorials</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic code examples</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Community forum access</span>
                </li>
              </ul>
              
              <Link to="/signup">
                <Button variant="outline" className="w-full border-python-blue text-python-blue hover:bg-blue-50">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            {/* Premium Plan */}
            <div className="border-2 border-python-blue rounded-lg shadow-lg p-8 relative scale-105 bg-white z-10">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-python-blue text-white text-sm font-semibold py-1 px-4 rounded-full">MOST POPULAR</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$15</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mb-6">For serious Python learners looking to master the language.</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Everything in Free plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Full course library access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Downloadable code examples</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Projects with source code</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
              
              <Link to="/signup">
                <Button className="w-full bg-python-blue hover:bg-blue-700">
                  Start Premium
                </Button>
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="border rounded-lg shadow-sm p-8 relative">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$49</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-600 mb-6">For teams and organizations training multiple developers.</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Everything in Premium plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Team management dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Progress reporting</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom learning paths</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              
              <Link to="/contact">
                <Button variant="outline" className="w-full border-python-blue text-python-blue hover:bg-blue-50">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your subscription at any time. 
                When you upgrade, you'll get immediate access to all the additional content.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee for all new Premium and Enterprise subscriptions.
                If you're not satisfied with your purchase, contact us within 7 days for a full refund.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long do I have access to the courses?</h3>
              <p className="text-gray-600">
                You have access to all courses and materials for as long as your subscription is active.
                Free tier users have permanent access to free content.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you offer student discounts?</h3>
              <p className="text-gray-600">
                Yes, we offer a 50% discount for verified students. Please contact our support team
                with proof of your student status to receive your discount code.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-python-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Python Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of Python learners today and take your programming skills to the next level.
          </p>
          <Link to="/signup">
            <Button className="bg-white text-python-blue hover:bg-gray-100 text-lg py-6 px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
