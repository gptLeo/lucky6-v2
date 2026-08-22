import { useState } from "react";
import type { DrawResult } from "../lib/types";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import { LotteryBall } from "./LotteryBall";

export function DrawHistoryTable({ draws, language }: { draws: DrawResult[]; language: Language }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const shown = draws.slice(0, visibleCount);

  return (
    <div className="card p-5">
      <h3 className="mb-3 font-display text-lg font-semibold">{t("recentDraws", language)}</h3>
      <div className="space-y-2">
        {shown.map((draw) => (
          <div
            key={draw.id}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-amber-50/50 px-3 py-2 text-sm dark:bg-stone-800/50"
          >
            <span className="w-20 shrink-0 text-xs text-stone-500 dark:text-stone-400">{draw.date}</span>
            <span className="w-14 shrink-0 text-xs text-stone-400 dark:text-stone-500">#{draw.id}</span>
            <div className="flex flex-wrap gap-1.5">
              {draw.numbers.map((n) => (
                <LotteryBall key={n} number={n} size="sm" />
              ))}
              <LotteryBall number={draw.special} isSpecial size="sm" />
            </div>
          </div>
        ))}
      </div>
      {visibleCount < draws.length && (
        <button
          onClick={() => setVisibleCount((v) => v + 10)}
          className="btn-secondary mt-3 w-full justify-center"
        >
          {language === "zh" ? "顯示更多" : "Show More"}
        </button>
      )}
    </div>
  );
}
