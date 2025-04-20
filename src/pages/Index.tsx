
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const basicPythonCode = `print("Hello, World!")
name = "Python Learner"
print(f"Welcome, {name}!")`;

  const advancedPythonCode = `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 animate-slide-up">
                Master Python Programming with <span className="text-python-blue">PythonPalace</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-slide-up">
                From basic syntax to advanced concepts, we've got you covered with interactive lessons, practical examples,
                and expert-led courses.
              </p>
              <div className="flex flex-wrap gap-4 animate-slide-up">
                <Link to="/courses">
                  <Button className="bg-python-blue hover:bg-blue-700 text-lg py-6 px-8">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="border-python-blue text-python-blue hover:bg-blue-50 text-lg py-6 px-8">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 animate-fade-in">
                <CodeBlock code={basicPythonCode} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Learn by doing with our interactive code exercises and real-time feedback.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Curriculum</h3>
              <p className="text-gray-600">
                Follow a clear path from basics to advanced Python concepts with our carefully designed courses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join our community of learners and instructors to get help when you're stuck.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advanced Example Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Go Beyond the Basics</h2>
              <p className="text-xl text-gray-600 mb-6">
                Our premium courses take you from Python fundamentals to advanced concepts 
                like web development, data science, and machine learning.
              </p>
              <Link to="/pricing">
                <Button className="bg-python-blue hover:bg-blue-700">
                  Explore Premium Content
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <CodeBlock code={advancedPythonCode} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "PythonPalace made learning Python so accessible. I went from no coding experience 
                to building my own web applications in just a few months!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Mike Chen</h4>
                  <p className="text-gray-500 text-sm">Data Analyst</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The data science course was exactly what I needed to level up my career. 
                The hands-on projects really helped cement my understanding."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Alex Rodriguez</h4>
                  <p className="text-gray-500 text-sm">CS Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The premium subscription is worth every penny. The advanced courses and 
                personalized feedback have helped me ace my computer science classes."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-python-dark py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Python Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are learning Python and building amazing projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-python-yellow text-python-dark hover:bg-yellow-400 text-lg py-6 px-8">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-python-dark text-lg py-6 px-8">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
