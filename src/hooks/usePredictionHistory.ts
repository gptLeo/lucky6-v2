import { useCallback, useEffect, useState } from "react";
import type { SavedPrediction, PredictionResult } from "../lib/types";

const STORAGE_KEY = "marksix-prediction-history";
const MAX_HISTORY = 30;

export function usePredictionHistory() {
  const [history, setHistory] = useState<SavedPrediction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      /* ignore */
    }
  }, [history]);

  const addToHistory = useCallback((result: PredictionResult) => {
    const id = `${result.timestamp}-${Math.random().toString(36).slice(2, 8)}`;
    setHistory((prev) => [{ ...result, id }, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addToHistory, removeFromHistory, clearHistory };
}
