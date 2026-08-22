import { Star, Trash2 } from "lucide-react";
import type { SavedPrediction } from "../lib/types";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import { LotteryBall } from "./LotteryBall";

interface FavoritesPanelProps {
  favorites: SavedPrediction[];
  onRemove: (id: string) => void;
  onClear: () => void;
  language: Language;
}

export function FavoritesPanel({ favorites, onRemove, onClear, language }: FavoritesPanelProps) {
  if (favorites.length === 0) {
    return (
      <div className="card p-5 text-center text-sm text-stone-500 dark:text-stone-400">
        <Star className="mx-auto mb-2 h-6 w-6 opacity-40" />
        {t("noFavorites", language)}
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{t("favorites", language)}</h3>
        <button onClick={onClear} className="text-xs text-red-500 hover:underline">
          {t("clearAll", language)}
        </button>
      </div>
      <div className="space-y-2">
        {favorites.map((f) => (
          <div
            key={f.id}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-amber-50/50 px-3 py-2 dark:bg-stone-800/50"
          >
            <div className="flex flex-wrap gap-1.5">
              {f.mainNumbers.map((n) => (
                <LotteryBall key={n} number={n} size="sm" />
              ))}
              <LotteryBall number={f.specialNumber} isSpecial size="sm" />
            </div>
            <button
              onClick={() => onRemove(f.id)}
              className="ml-auto rounded-full p-1.5 text-stone-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
