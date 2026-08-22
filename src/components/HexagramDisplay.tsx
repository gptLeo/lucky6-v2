import type { HexagramReading } from "../lib/iching";

export function HexagramDisplay({ reading }: { reading: HexagramReading }) {
  return (
    <div className="card flex flex-col items-center gap-3 p-5">
      <div className="flex flex-col-reverse gap-1.5">
        {reading.lines.map((isYang, i) => (
          <div key={i} className="flex h-2 w-24 gap-1.5 sm:w-32">
            {isYang ? (
              <div className="h-full w-full rounded-sm bg-amber-600" />
            ) : (
              <>
                <div className="h-full w-[45%] rounded-sm bg-amber-600" />
                <div className="h-full w-[45%] rounded-sm bg-amber-600" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="font-display text-2xl font-bold text-amber-700 dark:text-amber-400">
          {reading.hexagram.chinese}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          第{reading.hexagram.number}卦 · {reading.hexagram.pinyin} · {reading.hexagram.name}
        </p>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{reading.hexagram.meaning}</p>
      </div>
    </div>
  );
}
