import type { StatsSummary } from "../lib/stats";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

function MiniBall({ n, colorClass }: { n: number; colorClass: string }) {
  return (
    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${colorClass}`}>
      {n}
    </span>
  );
}

export function StatsPanel({ stats, language }: { stats: StatsSummary; language: Language }) {
  return (
    <div className="card space-y-5 p-5">
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.totalDraws}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{t("totalDrawsAnalyzed", language)}</p>
        </div>
        <div>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.avgSum.toFixed(1)}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{t("avgSum", language)}</p>
        </div>
        <div>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.avgOddCount.toFixed(1)}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{t("avgOdd", language)}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">
          🔥 {t("hotNumbers", language)}
        </p>
        <div className="flex flex-wrap gap-2">
          {stats.hot.map((f) => (
            <div key={f.number} className="flex flex-col items-center gap-1">
              <MiniBall n={f.number} colorClass="bg-red-500" />
              <span className="text-[10px] text-stone-500 dark:text-stone-400">{f.count}x</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
          ❄️ {t("coldNumbers", language)}
        </p>
        <div className="flex flex-wrap gap-2">
          {stats.cold.map((f) => (
            <div key={f.number} className="flex flex-col items-center gap-1">
              <MiniBall n={f.number} colorClass="bg-blue-500" />
              <span className="text-[10px] text-stone-500 dark:text-stone-400">{f.count}x</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
          ⏳ {t("overdueNumbers", language)}
        </p>
        <div className="flex flex-wrap gap-2">
          {stats.overdue.map((f) => (
            <div key={f.number} className="flex flex-col items-center gap-1">
              <MiniBall n={f.number} colorClass="bg-purple-500" />
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                {f.lastSeenDrawsAgo}{t("drawsAgo", language)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-stone-600 dark:text-stone-300">區間分佈 Zone Distribution</p>
        <div className="space-y-1.5">
          {stats.zoneDistribution.map((z) => (
            <div key={z.zone} className="flex items-center gap-2 text-xs">
              <span className="w-14 shrink-0 text-stone-500 dark:text-stone-400">{z.zone}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${Math.min(100, z.percentage * 2.5)}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-stone-500 dark:text-stone-400">
                {z.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
