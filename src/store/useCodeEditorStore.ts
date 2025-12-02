import { LANGUAGE_CONFIG } from "@/app/editor/_constants";
import { CodeEditorState } from "@/types";
import { create } from "zustand";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  //   get value from localstorage
  const language = localStorage.getItem("editor-language") || "javascript";
  const fontSize = parseInt(localStorage.getItem("editor-font-size") || "16");
  const theme = localStorage.getItem("editor-theme") || "vs-dark";
  return {
    language,
    fontSize: Number(fontSize) || 16,
    theme,
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    // actions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Monaco editor instance requires any for getValue method
    getCode: () => (get().editor as any)?.getValue() || "",
    setEditor: (editor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Monaco editor instance requires any for setValue method
      if (savedCode) (editor as any).setValue(savedCode);
      set({ editor });
    },
    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },
    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },
    setLanguage: (language: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Monaco editor instance requires any for getValue method
      const currentLanguageCode = (get().editor as any)?.getValue() || "";
      if (currentLanguageCode) {
        localStorage.setItem(
          `editor-code-${get().language}`,
          currentLanguageCode
        );
      }
      localStorage.setItem("editor-language", language);
      set({ language, output: "", error: null });
    },
    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();
      if (!code) {
        set({ error: "Cannot run empty code." });
        return;
      }
      // set isRunning to true
      set({ isRunning: true, output: "", error: null });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        // call api to run code
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });
        const data = await response.json();
        console.log(data);

        // handle api error
        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }
        // handle compile errors
        if (data.compile && data.compile.code !== 0) {
          const error =
            data.run.stderr ||
            data.compile.output ||
            "Unknown compilation error.";
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }

        // handle runtime errors
        if (data.run && data.run.code !== 0) {
          const error =
            data.run.stderr || data.run.output || "Unknown runtime error.";
          set({
            error,
            executionResult: { code, output: "", error },
          });
          return;
        }

        // execution success
        const output = data.run.output;
        set({
          output: output.trim(),
          executionResult: { code, output: output.trim(), error: null },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Runtime error handling requires any type
      } catch (error: any) {
        console.log(error);

        set({
          error:
            error instanceof Error ? error.message : "Unknown error occurred.",
          output: "",
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult;
