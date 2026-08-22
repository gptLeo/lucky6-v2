import { Star } from "lucide-react";
import { LotteryBall } from "./LotteryBall";
import type { PredictionResult } from "../lib/types";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

const METHOD_LABELS: Record<string, { zh: string; en: string }> = {
  iching: { zh: "易經", en: "I Ching" },
  ziwei: { zh: "紫微", en: "Zi Wei" },
  stats: { zh: "統計", en: "Stats" },
};

interface ResultCardProps {
  result: PredictionResult;
  language: Language;
  isSaved: boolean;
  onSave: () => void;
}

export function ResultCard({ result, language, isSaved, onSave }: ResultCardProps) {
  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {t("mainNumbers", language)}
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {result.mainNumbers.map((n, i) => (
              <LotteryBall key={n} number={n} size="lg" delay={i * 80} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {t("specialNumber", language)}
          </span>
          <LotteryBall number={result.specialNumber} isSpecial size="lg" delay={result.mainNumbers.length * 80} />
        </div>

        {result.methods.length > 1 && (
          <div className="w-full border-t border-amber-200/60 pt-4 dark:border-stone-800">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {t("methodBreakdown", language)}
            </p>
            <div className="flex flex-col gap-2">
              {result.methods.map((m) => {
                const pm = result.perMethod[m];
                if (!pm) return null;
                return (
                  <div key={m} className="flex flex-wrap items-center gap-2 rounded-lg bg-amber-50/60 px-3 py-2 text-sm dark:bg-stone-800/60">
                    <span className="shrink-0 rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      {METHOD_LABELS[m]?.[language] ?? m}
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {pm.numbers.map((n) => (
                        <span
                          key={n}
                          className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
                            result.mainNumbers.includes(n)
                              ? "bg-amber-500 text-white"
                              : "bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                          }`}
                        >
                          {n}
                        </span>
                      ))}
                      <span className="rounded px-1.5 py-0.5 text-xs font-semibold bg-orange-300/70 text-orange-900 dark:bg-orange-800/60 dark:text-orange-200">
                        +{pm.special}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={onSave}
          disabled={isSaved}
          className="btn-secondary"
        >
          <Star className={`h-4 w-4 ${isSaved ? "fill-current text-amber-500" : ""}`} />
          {isSaved ? t("saved", language) : t("saveToFavorites", language)}
        </button>
      </div>
    </div>
  );
}
