import type { ZiWeiReading } from "../lib/ziwei";

export function ZiWeiDisplay({ reading }: { reading: ZiWeiReading }) {
  return (
    <div className="card flex flex-col items-center gap-2 p-5 text-center">
      <p className="font-display text-xl font-bold text-amber-700 dark:text-amber-400">
        {reading.mainStar.chinese} · {reading.secondaryStar.chinese}
      </p>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {reading.mainStar.name} ({reading.mainStar.pinyin}) + {reading.secondaryStar.name}
      </p>
      <p className="text-sm text-stone-600 dark:text-stone-300">{reading.mainStar.meaning}</p>
      <p className="text-xs text-stone-400 dark:text-stone-500">推算日期：{reading.dateUsed}</p>
    </div>
  );
}
