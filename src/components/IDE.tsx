
import React, { useState, useCallback } from "react";
import { FileText, Play, Folder, Code, Download, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import Editor from "@monaco-editor/react";
import { pythonExecutor } from "@/services/pythonExecutor";

const initialCode = `# Try some Python code!
print("Hello, Python in browser!")

# Variables and data types
name = "Python Learner"
age = 25
height = 1.75
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Is student? {is_student}")

# Lists and loops
numbers = [1, 2, 3, 4, 5]
print("\\nNumbers:")
for num in numbers:
    print(f"Square of {num} is {num ** 2}")

# Functions
def calculate_area(radius):
    return 3.14159 * radius ** 2

print("\\nCircle area calculation:")
radius = 5
area = calculate_area(radius)
print(f"Area of circle with radius {radius} is {area:.2f}")

# Conditionals
print("\\nAge category:")
if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")

# Dictionary
person = {
    "name": name,
    "age": age,
    "height": height,
    "is_student": is_student
}

print("\\nPerson dictionary:")
for key, value in person.items():
    print(f"{key}: {value}")`;

const IDE: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"code" | "output">("code");

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const runCode = async () => {
    setIsExecuting(true);
    setOutput("Executing code...");
    setSelectedTab("output");

    try {
      const result = await pythonExecutor.runCode(code);
      setOutput(result);
      toast.success("Code executed successfully");
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
      toast.error("Error executing code");
    } finally {
      setIsExecuting(false);
    }
  };

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.py";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Code downloaded successfully");
  }, [code]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          setCode(content);
          toast.success("File loaded successfully");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden my-8 min-h-[480px] border border-gray-200">
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
            <div className="flex gap-2">
              <input
                type="file"
                accept=".py"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload size={18} className="mr-2" />
                Load
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCode}
              >
                <Download size={18} className="mr-2" />
                Save
              </Button>
              <Button
                className="bg-python-blue hover:bg-blue-700 text-white"
                onClick={runCode}
                disabled={isExecuting}
              >
                <Play size={18} className="mr-2" />
                {isExecuting ? "Running..." : "Run"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "code" | "output")} className="flex flex-col flex-1">
              <div className="border-b">
                <TabsList className="bg-transparent border-b-0 px-4">
                  <TabsTrigger value="code" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="output" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
                    <FileText className="w-4 h-4 mr-2" />
                    Output
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="code" className="flex-1 m-0">
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  value={code}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: false
                  }}
                />
              </TabsContent>
              <TabsContent value="output" className="m-0">
                <ScrollArea className="h-[400px] w-full">
                  <div className="p-4 bg-gray-50 font-mono text-sm">
                    <div className="text-gray-500 font-medium mb-1">Output</div>
                    <pre className="bg-transparent p-0 m-0 whitespace-pre-wrap">{output || "Run your code to see output here..."}</pre>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IDE;
