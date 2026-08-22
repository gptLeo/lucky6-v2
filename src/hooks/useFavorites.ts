import { useCallback, useEffect, useState } from "react";
import type { SavedPrediction, PredictionResult } from "../lib/types";

const STORAGE_KEY = "marksix-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<SavedPrediction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const addFavorite = useCallback((result: PredictionResult) => {
    const id = [...result.mainNumbers].sort((a, b) => a - b).join(",") + "+" + result.specialNumber;
    setFavorites((prev) => {
      if (prev.some((f) => f.id === id)) return prev;
      return [{ ...result, id }, ...prev];
    });
    return id;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const isFavorite = useCallback(
    (result: PredictionResult) => {
      const id = [...result.mainNumbers].sort((a, b) => a - b).join(",") + "+" + result.specialNumber;
      return favorites.some((f) => f.id === id);
    },
    [favorites],
  );

  return { favorites, addFavorite, removeFavorite, clearFavorites, isFavorite };
}
