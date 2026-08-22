import { History, Trash2 } from "lucide-react";
import type { SavedPrediction } from "../lib/types";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import { LotteryBall } from "./LotteryBall";

interface PredictionHistoryPanelProps {
  history: SavedPrediction[];
  onRemove: (id: string) => void;
  onClear: () => void;
  language: Language;
}

export function PredictionHistoryPanel({ history, onRemove, onClear, language }: PredictionHistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="card p-5 text-center text-sm text-stone-500 dark:text-stone-400">
        <History className="mx-auto mb-2 h-6 w-6 opacity-40" />
        {t("noHistory", language)}
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{t("history", language)}</h3>
        <button onClick={onClear} className="text-xs text-red-500 hover:underline">
          {t("clearAll", language)}
        </button>
      </div>
      <div className="space-y-2">
        {history.map((h) => (
          <div
            key={h.id}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-amber-50/50 px-3 py-2 dark:bg-stone-800/50"
          >
            <div className="flex flex-wrap gap-1.5">
              {h.mainNumbers.map((n) => (
                <LotteryBall key={n} number={n} size="sm" />
              ))}
              <LotteryBall number={h.specialNumber} isSpecial size="sm" />
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500">
              {h.methods.join(" + ")}
            </span>
            <button
              onClick={() => onRemove(h.id)}
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
