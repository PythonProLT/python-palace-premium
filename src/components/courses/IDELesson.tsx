import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Monitor, Download } from "lucide-react";

const IDELesson: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Introduction */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Getting Started with Python: Choosing Your IDE</h1>
        <p className="text-lg text-gray-700 mb-6">
          Python is a very fun programming language to learn, as well as very versatile. 
          This means that a beginner or an expert programmer may enjoy programming in python, 
          as it has many different possibilities. Before we get started with programming, 
          we have to sort out a few things first.
        </p>
        <p className="text-lg text-gray-700">
          The first and most important thing is finding an IDE that you like. 
          You can use either a IDE that you download, or a web based IDE. 
          This application will allow you to create and run your programs.
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Online IDE Option */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-6 w-6 text-python-blue" />
              Option 1: Online IDE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              You can use an online IDE such as replit to  create and run your programs. 
              In this video, I will show you how to create an account for replit, 
              as well as some of its features.
            </p>
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f2accb11-c038-412f-87f6-dbaa8beee320.png" 
                alt="Replit IDE interface showing Google Chrome with Replit shortcut"
                className="w-full h-auto object-cover"
              />
            </div>
            <Button className="w-full bg-python-blue hover:bg-blue-700"
                    onClick={() => window.open('https://replit.com', '_blank')}>
              Try Replit
            </Button>
          </CardContent>
        </Card>

        {/* Downloadable IDE Option */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-6 w-6 text-python-blue" />
              Option 2: Downloadable IDE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              If you don't want to use a online IDE, you can opt to download an IDE. 
              Some commonly used IDEs are Spyder, Visual Studio Code, and IDLE. 
              In this video, I will show you how to download them, 
              as well as what Visual Studio Code and Spyder's UI look like.
            </p>
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/dc08846a-fc22-4805-87fb-5669b220391b.png" 
                alt="Chrome interface showing development environment shortcuts"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full bg-python-blue hover:bg-blue-700"
                onClick={() => window.open('https://code.visualstudio.com/', '_blank')}
              >
                Download VS Code
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://www.spyder-ide.org/', '_blank')}
              >
                Download Spyder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Try Our IDE */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6 text-python-blue" />
            Try Our Built-in IDE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Want to start coding right away? Try our built-in Python IDE to write and run 
            your first Python program without any setup!
          </p>
          <Button 
            className="bg-python-blue hover:bg-blue-700"
            onClick={() => window.location.href = '/ide'}
          >
            Open IDE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IDELesson;
