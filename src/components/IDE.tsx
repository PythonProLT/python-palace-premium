
import React, { useState } from "react";
import { FileText, Play, Folder } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const initialCode = `print("Hello, PythonPalace!")`;

const IDE: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  // Placeholder run function: for now, just echo code output!
  const runCode = () => {
    setOutput(
      "Python execution is not supported in-browser yet.\n\nYour code:\n" +
        code
    );
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
        {/* Ready for more files/folders */}
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
            >
              <Play size={18} className="mr-2" />
              Run
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full font-mono text-sm h-48 p-4 outline-none border-0 resize-none rounded-none focus:ring-0"
              style={{
                background: "transparent",
                minHeight: "200px",
              }}
              spellCheck={false}
            />
            <div className="border-t border-gray-200 p-4 bg-gray-50 font-mono text-xs text-gray-800 min-h-[64px]">
              <div className="text-gray-500 font-medium mb-1">Output</div>
              <pre className="bg-transparent p-0 m-0 min-h-4">{output || "..."}</pre>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IDE;
