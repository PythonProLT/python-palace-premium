
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import PremiumContent from '@/components/PremiumContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Python Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From beginner to expert, our structured learning paths will take you 
            from your first "Hello World" to advanced Python applications.
          </p>
        </div>
      </section>
      
      {/* Course Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Learning Paths</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner Path */}
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Python Basics</h3>
                <div className="flex items-center mb-4">
                  <div className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded">Beginner</div>
                  <div className="text-sm text-gray-500 ml-auto">12 lessons</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Learn the fundamentals of Python programming, from variables and 
                  data types to control structures and functions.
                </p>
                <CodeBlock code='print("Hello, Python World!")' />
                <div className="flex flex-col space-y-2 mt-6">
                  <Link to="/courses/ide-setup">
                    <Button className="w-full bg-python-blue hover:bg-blue-700">
                      IDE Setup Guide
                    </Button>
                  </Link>
                  <Link to="/courses/basics">
                    <Button variant="outline" className="w-full">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Intermediate Path */}
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Intermediate Python</h3>
                <div className="flex items-center mb-4">
                  <div className="text-sm bg-yellow-100 text-yellow-800 py-1 px-2 rounded">Intermediate</div>
                  <div className="text-sm text-gray-500 ml-auto">15 lessons</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Build on your knowledge with classes, modules, error handling, and 
                  working with files and external libraries.
                </p>
                <PremiumContent preview={true}>
                  <CodeBlock code="class PythonStudent:\n    def __init__(self, name):\n        self.name = name\n        self.skills = []\n        \n    def learn(self, skill):\n        self.skills.append(skill)\n        print(f'{self.name} learned {skill}!')" />
                </PremiumContent>
                <Link to="/pricing">
                  <Button className="w-full mt-6 bg-python-blue hover:bg-blue-700">
                    Upgrade to Access
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Advanced Path */}
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="h-3 bg-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Advanced Python</h3>
                <div className="flex items-center mb-4">
                  <div className="text-sm bg-red-100 text-red-800 py-1 px-2 rounded">Advanced</div>
                  <div className="text-sm text-gray-500 ml-auto">18 lessons</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Master advanced concepts like decorators, context managers, 
                  metaclasses, and concurrency in Python.
                </p>
                <PremiumContent preview={true}>
                  <CodeBlock code="def decorator(func):\n    def wrapper(*args, **kwargs):\n        print('Before function call')\n        result = func(*args, **kwargs)\n        print('After function call')\n        return result\n    return wrapper\n\n@decorator\ndef greet(name):\n    return f'Hello, {name}!'" />
                </PremiumContent>
                <Link to="/pricing">
                  <Button className="w-full mt-6 bg-python-blue hover:bg-blue-700">
                    Upgrade to Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialization Tracks */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Specialization Tracks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                Build web applications using Django, Flask, and FastAPI frameworks.
              </p>
              <Link to="/courses/web" className="text-python-blue hover:text-blue-700 text-sm font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Data Science</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn data analysis with Pandas, NumPy, and data visualization with Matplotlib.
              </p>
              <Link to="/courses/data-science" className="text-python-blue hover:text-blue-700 text-sm font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Machine Learning</h3>
              <p className="text-gray-600 text-sm mb-4">
                Master machine learning with scikit-learn, TensorFlow, and PyTorch.
              </p>
              <Link to="/courses/machine-learning" className="text-python-blue hover:text-blue-700 text-sm font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-python-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Security & Automation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn cybersecurity tools and system automation with Python.
              </p>
              <Link to="/courses/security" className="text-python-blue hover:text-blue-700 text-sm font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Course */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white border rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="inline-block bg-blue-100 text-python-blue text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  NEW COURSE
                </div>
                <h2 className="text-2xl font-bold mb-4">Python for Data Analysis</h2>
                <p className="text-gray-600 mb-6">
                  Learn how to use Python's powerful libraries to analyze and visualize data.
                  This comprehensive course covers everything from data cleaning to advanced
                  statistical analysis.
                </p>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">What you'll learn:</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Data manipulation with Pandas
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Visualization with Matplotlib and Seaborn
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Statistical analysis techniques
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Working with real-world datasets
                    </li>
                  </ul>
                </div>
                <PremiumContent preview={true}>
                  <div className="text-sm text-gray-600">
                    This premium course includes 45 video lessons, 15 hands-on projects,
                    downloadable resources, and a certificate upon completion.
                  </div>
                </PremiumContent>
                <div className="mt-6">
                  <Link to="/pricing">
                    <Button className="bg-python-blue hover:bg-blue-700">
                      Unlock This Course
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 bg-python-dark p-8 text-white flex flex-col justify-between">
                <div>
                  <div className="text-xl font-bold mb-4">Course Details</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-300">Duration</div>
                      <div className="font-semibold">8 weeks</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Difficulty</div>
                      <div className="font-semibold">Intermediate</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Prerequisites</div>
                      <div className="font-semibold">Python Basics</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Instructor</div>
                      <div className="font-semibold">Dr. Sarah Chen</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="text-python-yellow text-xl font-bold">Premium</div>
                    <svg className="h-5 w-5 text-python-yellow ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-gray-300 text-sm mt-1">
                    Included with Premium subscription
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-python-blue py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning Python?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are learning Python and building amazing projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses/basics">
              <Button className="bg-white text-python-blue hover:bg-gray-100 text-lg py-5 px-8">
                Start Free Course
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-python-blue text-lg py-5 px-8">
                View Premium Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Courses;
