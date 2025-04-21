
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
          This means that a beginner or an expert programmer may enjoy programming in Python, 
          as it has many different possibilities. Before we get started with programming, 
          we have to sort out a few things first.
        </p>
        <p className="text-lg text-gray-700">
          The first and most important thing is finding an IDE that you like. 
          You can use either an IDE that you download, or a web-based IDE. 
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
              You can use an online IDE such as Replit to create and run your programs. 
              Online IDEs offer several advantages:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>No installation required</li>
              <li>Access from any device with a browser</li>
              <li>Built-in collaboration features</li>
              <li>Instant setup and configuration</li>
            </ul>
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
              If you prefer a local development environment, you can download an IDE. 
              Popular options include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Visual Studio Code - Lightweight and extensible</li>
              <li>PyCharm - Full-featured Python IDE</li>
              <li>Spyder - Scientific computing focused</li>
              <li>IDLE - Simple, included with Python</li>
            </ul>
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
