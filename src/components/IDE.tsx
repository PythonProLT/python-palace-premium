
import React, { useState } from "react";
import { FileText, Play, Folder, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

const initialCode = `# Try some Python code!
print("Hello, PythonPalace!")

# Variables
name = "Python Learner"
age = 25
print(f"Welcome, {name}! You are {age} years old.")

# Conditionals
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# Lists
colors = ["red", "green", "blue"]
print("Colors:")
for color in colors:
    print(color)

# Functions
def greet(person):
    return f"Hello, {person}!"

print(greet("friend"))`;

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
        
        // Variable storage
        const variables: Record<string, any> = {};
        
        // Function storage
        const functions: Record<string, { params: string[], body: string[], returnLine: number }> = {};
        
        let i = 0;
        let indentationStack: number[] = [0];
        let skipUntilIndentation: number | null = null;
        let inFunction = false;
        let currentFunctionName = "";
        let currentParams: string[] = [];
        let functionBody: string[] = [];
        let inLoop = false;
        let loopIndices: Record<string, number> = {};
        let loopRanges: Record<string, number[]> = {};
        let loopCollections: Record<string, any[]> = {};
        let loopVars: string[] = [];
        let ifResult = true;
        let ifIndentation = 0;
        let collectingIf = false;
        let returnLineNumber = -1;

        const getIndentation = (line: string) => {
          const spaces = line.match(/^(\s*)/);
          return spaces ? spaces[0].length : 0;
        };

        const evaluateCondition = (condition: string): boolean => {
          // Replace variable names with their values
          Object.keys(variables).forEach(varName => {
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            condition = condition.replace(regex, JSON.stringify(variables[varName]));
          });

          // Handle basic comparisons
          try {
            // Simple eval for demonstration - in a real system, use a safer approach
            return eval(condition);
          } catch (error) {
            output.push(`Error evaluating condition: ${condition}`);
            return false;
          }
        };

        const parseFString = (str: string): string => {
          // Remove the f and quotes
          const content = str.slice(2, -1);
          
          // Find expressions in curly braces and replace them with variable values
          return content.replace(/{([^}]+)}/g, (match, expr) => {
            return variables[expr.trim()] !== undefined 
              ? String(variables[expr.trim()]) 
              : `{${expr}}`;
          });
        };

        const processLine = (line: string, lineIndex: number): void => {
          const trimmedLine = line.trim();
          const currentIndentation = getIndentation(line);
          
          // Skip processing if we're waiting for a lower indentation level
          if (skipUntilIndentation !== null && currentIndentation >= skipUntilIndentation) {
            return;
          } else {
            skipUntilIndentation = null;
          }

          // Skip processing if we're in a conditional block that didn't evaluate to true
          if (collectingIf && currentIndentation > ifIndentation && !ifResult) {
            return;
          }

          // Handle basic Python syntax
          if (trimmedLine.startsWith('#')) {
            // Comments - ignore
            return;
          } else if (trimmedLine === '') {
            // Empty lines - ignore
            return;
          } else if (trimmedLine.startsWith('def ')) {
            // Function definition
            inFunction = true;
            const funcMatch = trimmedLine.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\):/);
            if (funcMatch) {
              currentFunctionName = funcMatch[1];
              currentParams = funcMatch[2].split(',').map(p => p.trim());
              functionBody = [];
              indentationStack.push(currentIndentation);
            }
            return;
          } else if (inFunction && currentIndentation <= indentationStack[indentationStack.length - 1]) {
            // End of function definition
            inFunction = false;
            functions[currentFunctionName] = {
              params: currentParams,
              body: functionBody,
              returnLine: returnLineNumber
            };
            indentationStack.pop();
            currentFunctionName = "";
            currentParams = [];
            functionBody = [];
            returnLineNumber = -1;
          } else if (inFunction) {
            // Collect function body
            functionBody.push(line);
            if (trimmedLine.startsWith('return ')) {
              returnLineNumber = functionBody.length - 1;
            }
            return;
          } else if (trimmedLine.startsWith('if ') && trimmedLine.endsWith(':')) {
            // If statement
            collectingIf = true;
            ifIndentation = currentIndentation;
            const condition = trimmedLine.substring(3, trimmedLine.length - 1);
            ifResult = evaluateCondition(condition);
            return;
          } else if (trimmedLine.startsWith('else:') && collectingIf) {
            // Else statement - invert condition
            ifResult = !ifResult;
            return;
          } else if (trimmedLine.startsWith('elif ') && trimmedLine.endsWith(':') && collectingIf) {
            // Elif statement - evaluate only if previous conditions were false
            if (!ifResult) {
              const condition = trimmedLine.substring(5, trimmedLine.length - 1);
              ifResult = evaluateCondition(condition);
            } else {
              // Previous condition was true, skip this elif
              ifResult = false;
            }
            return;
          } else if (collectingIf && currentIndentation <= ifIndentation) {
            // End of if/else block
            collectingIf = false;
          }
          
          // Continue with the rest of the code
          if (trimmedLine.startsWith('print(')) {
            const content = trimmedLine.substring(6, trimmedLine.lastIndexOf(')'));
            
            // Handle f-strings
            if (content.startsWith('f"') || content.startsWith("f'")) {
              output.push(parseFString(content));
            } 
            // Handle variable printing
            else if (!content.startsWith('"') && !content.startsWith("'") && variables[content]) {
              output.push(String(variables[content]));
            } 
            // Handle string literals
            else {
              const processed = content.replace(/^["'](.*)["']$/, '$1');
              output.push(processed);
            }
          } else if (trimmedLine.includes('=') && !trimmedLine.includes('==')) {
            // Variable assignment
            const [varName, ...valueParts] = trimmedLine.split('=').map(part => part.trim());
            const valueStr = valueParts.join('='); // Rejoin in case there are multiple = in the value
            
            // Handle list creation
            if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
              const listContent = valueStr.substring(1, valueStr.length - 1);
              const items = listContent ? listContent.split(',').map(item => {
                const trimmed = item.trim();
                
                // Handle strings in the list
                if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
                    (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                  return trimmed.substring(1, trimmed.length - 1);
                } 
                // Handle numbers in the list
                else if (!isNaN(Number(trimmed))) {
                  return Number(trimmed);
                }
                // Handle variables in the list
                else if (variables[trimmed] !== undefined) {
                  return variables[trimmed];
                }
                return trimmed;
              }) : [];
              variables[varName] = items;
            } 
            // Handle string literals
            else if ((valueStr.startsWith('"') && valueStr.endsWith('"')) || 
                     (valueStr.startsWith("'") && valueStr.endsWith("'"))) {
              variables[varName] = valueStr.substring(1, valueStr.length - 1);
            } 
            // Handle numeric values
            else if (!isNaN(Number(valueStr))) {
              variables[varName] = Number(valueStr);
            } 
            // Handle calling functions
            else if (valueStr.includes('(') && valueStr.includes(')')) {
              const funcName = valueStr.substring(0, valueStr.indexOf('('));
              if (functions[funcName]) {
                // Execute the function and assign its return value
                const func = functions[funcName];
                const args = valueStr.substring(valueStr.indexOf('(') + 1, valueStr.lastIndexOf(')'))
                  .split(',')
                  .map(arg => arg.trim());
                
                // Set function arguments as variables
                const funcVars: Record<string, any> = {...variables};
                func.params.forEach((param, idx) => {
                  if (idx < args.length) {
                    // Parse argument value
                    let argValue = args[idx];
                    if ((argValue.startsWith('"') && argValue.endsWith('"')) || 
                        (argValue.startsWith("'") && argValue.endsWith("'"))) {
                      argValue = argValue.substring(1, argValue.length - 1);
                    } else if (!isNaN(Number(argValue))) {
                      argValue = Number(argValue);
                    } else if (variables[argValue] !== undefined) {
                      argValue = variables[argValue];
                    }
                    funcVars[param] = argValue;
                  }
                });
                
                // Execute function body
                let returnValue = undefined;
                for (let j = 0; j < func.body.length; j++) {
                  const funcLine = func.body[j];
                  if (j === func.returnLine) {
                    const returnExpr = funcLine.trim().substring(7); // Remove 'return '
                    
                    // Parse return value
                    if ((returnExpr.startsWith('"') && returnExpr.endsWith('"')) || 
                        (returnExpr.startsWith("'") && returnExpr.endsWith("'"))) {
                      returnValue = returnExpr.substring(1, returnExpr.length - 1);
                    } else if (returnExpr.startsWith('f"') || returnExpr.startsWith("f'")) {
                      // Handle f-strings in returns
                      const content = returnExpr.slice(2, -1);
                      returnValue = content.replace(/{([^}]+)}/g, (match, expr) => {
                        return funcVars[expr.trim()] !== undefined 
                          ? String(funcVars[expr.trim()]) 
                          : `{${expr}}`;
                      });
                    } else if (!isNaN(Number(returnExpr))) {
                      returnValue = Number(returnExpr);
                    } else if (funcVars[returnExpr] !== undefined) {
                      returnValue = funcVars[returnExpr];
                    }
                    break;
                  }
                }
                variables[varName] = returnValue;
              } else {
                variables[varName] = `Error: Function ${funcName} not defined`;
              }
            } 
            // Default case - just store as a string
            else {
              variables[varName] = valueStr;
            }
          } else if (trimmedLine.startsWith('for ') && trimmedLine.includes(' in ') && trimmedLine.endsWith(':')) {
            // For loop
            inLoop = true;
            const loopMatch = trimmedLine.match(/for\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+(.+):/);
            if (loopMatch) {
              const loopVar = loopMatch[1];
              const collection = loopMatch[2].trim();
              loopVars.push(loopVar);
              
              // Handle range function
              if (collection.startsWith('range(') && collection.endsWith(')')) {
                const rangeArgs = collection.substring(6, collection.length - 1).split(',').map(Number);
                let start = 0, end = 0, step = 1;
                
                if (rangeArgs.length === 1) {
                  end = rangeArgs[0];
                } else if (rangeArgs.length === 2) {
                  start = rangeArgs[0];
                  end = rangeArgs[1];
                } else if (rangeArgs.length === 3) {
                  start = rangeArgs[0];
                  end = rangeArgs[1];
                  step = rangeArgs[2];
                }
                
                loopIndices[loopVar] = 0;
                const range = [];
                for (let j = start; j < end; j += step) {
                  range.push(j);
                }
                loopRanges[loopVar] = range;
                variables[loopVar] = range[0];
              } 
              // Handle lists
              else if (variables[collection] && Array.isArray(variables[collection])) {
                loopIndices[loopVar] = 0;
                loopCollections[loopVar] = variables[collection];
                variables[loopVar] = variables[collection][0];
              }
              
              indentationStack.push(currentIndentation);
            }
          } else if (inLoop && currentIndentation <= indentationStack[indentationStack.length - 1]) {
            // End of loop
            inLoop = false;
            const loopVar = loopVars.pop() || "";
            delete loopIndices[loopVar];
            delete loopRanges[loopVar];
            delete loopCollections[loopVar];
            indentationStack.pop();
          } else if (trimmedLine.startsWith('return ')) {
            // Function returns are handled within function processing
            return;
          } else if (trimmedLine.includes('(') && trimmedLine.includes(')') && !trimmedLine.startsWith('print(')) {
            // Function call without assignment
            const funcName = trimmedLine.substring(0, trimmedLine.indexOf('('));
            if (functions[funcName]) {
              const func = functions[funcName];
              const args = trimmedLine.substring(trimmedLine.indexOf('(') + 1, trimmedLine.lastIndexOf(')'))
                .split(',')
                .map(arg => arg.trim());
              
              // Set function arguments as variables
              const funcVars: Record<string, any> = {...variables};
              func.params.forEach((param, idx) => {
                if (idx < args.length) {
                  let argValue = args[idx];
                  if ((argValue.startsWith('"') && argValue.endsWith('"')) || 
                      (argValue.startsWith("'") && argValue.endsWith("'"))) {
                    argValue = argValue.substring(1, argValue.length - 1);
                  } else if (!isNaN(Number(argValue))) {
                    argValue = Number(argValue);
                  } else if (variables[argValue] !== undefined) {
                    argValue = variables[argValue];
                  }
                  funcVars[param] = argValue;
                }
              });
              
              // Execute function body
              let returnValue = undefined;
              for (let j = 0; j < func.body.length; j++) {
                const funcLine = func.body[j];
                if (j === func.returnLine) {
                  const returnExpr = funcLine.trim().substring(7); // Remove 'return '
                  
                  if ((returnExpr.startsWith('"') && returnExpr.endsWith('"')) || 
                      (returnExpr.startsWith("'") && returnExpr.endsWith("'"))) {
                    returnValue = returnExpr.substring(1, returnExpr.length - 1);
                  } else if (returnExpr.startsWith('f"') || returnExpr.startsWith("f'")) {
                    // Handle f-strings in returns
                    const content = returnExpr.slice(2, -1);
                    returnValue = content.replace(/{([^}]+)}/g, (match, expr) => {
                      return funcVars[expr.trim()] !== undefined 
                        ? String(funcVars[expr.trim()]) 
                        : `{${expr}}`;
                    });
                  } else if (!isNaN(Number(returnExpr))) {
                    returnValue = Number(returnExpr);
                  } else if (funcVars[returnExpr] !== undefined) {
                    returnValue = funcVars[returnExpr];
                  }
                  if (returnValue !== undefined) {
                    output.push(String(returnValue));
                  }
                  break;
                }
              }
            } else {
              output.push(`Error: Function ${funcName} not defined`);
            }
          } else if (trimmedLine) {
            // Unknown command
            output.push(`Command not supported: ${trimmedLine}`);
          }
        };

        // Process code line by line
        while (i < lines.length) {
          const line = lines[i];
          processLine(line, i);
          i++;
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
              <TabsContent value="output" className="mt-0">
                <ScrollArea className="h-[300px] w-full">
                  <div className="p-4 bg-gray-50 font-mono text-xs text-gray-800">
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
