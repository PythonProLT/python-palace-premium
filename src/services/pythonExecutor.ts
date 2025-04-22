
import { toast } from "sonner";

// Declare the Pyodide global type
declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

class PythonExecutor {
  private pyodide: any = null;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;

  async initialize() {
    if (this.pyodide) return;
    if (this.isLoading) {
      await this.loadPromise;
      return;
    }

    this.isLoading = true;
    this.loadPromise = new Promise(async (resolve) => {
      try {
        // Use the global loadPyodide function from the script tag
        this.pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        resolve();
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        toast.error('Failed to initialize Python environment');
        resolve();
      } finally {
        this.isLoading = false;
      }
    });

    await this.loadPromise;
  }

  async runCode(code: string): Promise<string> {
    if (!this.pyodide) {
      await this.initialize();
    }

    try {
      // Capture stdout
      let output = '';
      const originalStdout = this.pyodide.runPython('import sys\nsys.stdout.getvalue()');
      
      // Run the code
      const result = await this.pyodide.runPythonAsync(code);
      
      // Get the captured output
      output = this.pyodide.runPython('sys.stdout.getvalue()');
      
      // Clear the stdout buffer
      this.pyodide.runPython('sys.stdout.truncate(0)\nsys.stdout.seek(0)');

      return output || result?.toString() || "Code executed successfully";
    } catch (error: any) {
      console.error('Python execution error:', error);
      toast.error('Error executing Python code');
      throw new Error(error?.message || "An error occurred while executing the code");
    }
  }
}

export const pythonExecutor = new PythonExecutor();

