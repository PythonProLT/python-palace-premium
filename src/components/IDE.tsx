
import React, { useState } from "react";
import { FileText, Play, Folder, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

const initialCode = `print("Hello, PythonPalace!")`;

const IDE: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"code" | "output">("code");

  // Enhanced Python code execution simulator
  const runCode = () => {
    setIsExecuting(true);
    setOutput("Executing code...");

    setTimeout(() => {
      try {
        const lines = code.split('\n');
        const output: string[] = [];
        let indentationLevel = 0;
        let inLoop = false;
        let loopCount = 0;

        for (const line of lines) {
          const trimmedLine = line.trim();
          
          // Handle basic Python syntax
          if (trimmedLine.startsWith('print(')) {
            const content = trimmedLine.substring(6, trimmedLine.length - 1);
            // Handle string literals with both single and double quotes
            const processed = content.replace(/^["'](.*)["']$/, '$1');
            
            if (inLoop && loopCount > 0) {
              for (let i = 0; i < loopCount; i++) {
                output.push(processed);
              }
            } else {
              output.push(processed);
            }
          }
          // Basic for loop simulation
          else if (trimmedLine.startsWith('for ') && trimmedLine.includes(' in range(')) {
            inLoop = true;
            const rangeMatch = trimmedLine.match(/range\((\d+)\)/);
            if (rangeMatch) {
              loopCount = parseInt(rangeMatch[1]);
            }
          }
          // Handle basic variable assignment
          else if (trimmedLine.includes('=')) {
            const [varName, value] = trimmedLine.split('=').map(part => part.trim());
            output.push(`Variable ${varName} assigned value: ${value}`);
          }
          // Handle comments
          else if (trimmedLine.startsWith('#')) {
            // Ignore comments
            continue;
          }
          // Empty lines
          else if (trimmedLine === '') {
            continue;
          }
          // Unknown command
          else if (trimmedLine) {
            output.push(`Command not supported: ${trimmedLine}`);
          }
        }

        if (output.length > 0) {
          setOutput(output.join('\n'));
          toast.success("Code executed successfully");
        } else {
          setOutput("No output generated");
          toast.success("Code executed successfully (no output)");
        }
      } catch (error: any) {
        setOutput(`Error: ${error.message}`);
        toast.error("Error executing code");
      } finally {
        setIsExecuting(false);
        setSelectedTab("output");
      }
    }, 500);
  };

  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden my-8 min-h-[380px] border border-gray-200">
      {/* Sidebar (File navigator) */}
      <aside className="w-40 bg-blue-50 border-r border-gray-200 p-4 flex flex-col">
        <h3 className="font-semibold mb-3 text-python-blue flex items-center gap-2">
          <Folder size={18} /> Files
        </h3>
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded font-mono text-sm text-python-blue">
          <FileText size={16} />
          <span>main.py</span>
        </div>
      </aside>

      {/* Main IDE area */}
      <main className="flex-1 flex flex-col">
        <Card className="flex-1 rounded-none h-full border-none shadow-none">
          <CardHeader className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText size={18} /> main.py
            </CardTitle>
            <Button
              className="bg-python-blue hover:bg-blue-700 text-white"
              onClick={runCode}
              disabled={isExecuting}
            >
              <Play size={18} className="mr-2" />
              {isExecuting ? "Running..." : "Run"}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={selectedTab} onValueChange={v => setSelectedTab(v as "code" | "output")} className="w-full">
              <div className="border-b">
                <TabsList className="bg-transparent border-b-0 px-4">
                  <TabsTrigger value="code" className="data-[state=active]:bg-white data-[state=active]:shadow-none">Code</TabsTrigger>
                  <TabsTrigger value="output" className="data-[state=active]:bg-white data-[state=active]:shadow-none">Output</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="code" className="mt-0">
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full font-mono text-sm p-4 outline-none border-0 resize-none rounded-none focus:ring-0"
                  style={{
                    background: "transparent",
                    minHeight: "300px",
                  }}
                  spellCheck={false}
                />
              </TabsContent>
              <TabsContent value="output" className="mt-0 p-4 bg-gray-50 font-mono text-xs text-gray-800 min-h-[300px]">
                <div className="text-gray-500 font-medium mb-1">Output</div>
                <pre className="bg-transparent p-0 m-0 whitespace-pre-wrap">{output || "Run your code to see output here..."}</pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IDE;
