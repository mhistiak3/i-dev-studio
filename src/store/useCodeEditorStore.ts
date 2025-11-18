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
    getCode: () => get().editor?.getValue() || "",
    setEditor: (editor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);

      if (savedCode) editor.setValue(savedCode);
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
      const currentLanguageCode = get().editor?.getValue() || "";
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
      // later implementation
    },
  };
});
