
import React from "react";
import { Plus, Code, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
// Footer import removed
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";

const Projects: React.FC = () => {
  const projects = [
    { id: 1, name: "Hello World", description: "Basic Python program", lastUpdated: "2 days ago" },
    { id: 2, name: "Calculator", description: "Simple calculator app", lastUpdated: "1 week ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Python Projects</h1>
              <p className="text-gray-600">Create, manage, and run your Python code</p>
            </div>
            <Link to="/ide">
              <Button className="bg-python-blue hover:bg-blue-700">
                <Plus size={18} className="mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          <Menubar className="mb-8">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New File</MenubarItem>
                <MenubarItem>Open</MenubarItem>
                <MenubarItem>Save</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Export</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Run</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Run Current File</MenubarItem>
                <MenubarItem>Debug</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Stop</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText size={18} />
                    {project.name}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Last updated: {project.lastUpdated}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Open Project</Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="border-dashed border-2 hover:bg-gray-50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-500">
                  <Plus size={18} />
                  Create New Project
                </CardTitle>
                <CardDescription>Start coding with Python</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-8">
                <Code size={48} className="text-gray-300" />
              </CardContent>
              <CardFooter>
                <Link to="/ide" className="w-full">
                  <Button variant="outline" className="w-full">Create New</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* IDE removed from the Projects page */}

        </div>
      </div>
      {/* <Footer /> removed */}
    </div>
  );
};

export default Projects;
