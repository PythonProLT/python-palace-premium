
import { loadPyodide } from 'pyodide';

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
        this.pyodide = await loadPyodide();
        resolve();
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
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
      const output = await this.pyodide.runPythonAsync(code);
      return output?.toString() ?? "Code executed successfully";
    } catch (error: any) {
      throw new Error(error?.message || "An error occurred while executing the code");
    }
  }
}

export const pythonExecutor = new PythonExecutor();

