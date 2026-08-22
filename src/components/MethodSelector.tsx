import { BookOpen, Sparkles, BarChart3, Check } from "lucide-react";
import type { MethodId } from "../lib/types";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

interface MethodSelectorProps {
  selected: MethodId[];
  onToggle: (id: MethodId) => void;
  language: Language;
}

const METHODS: { id: MethodId; icon: typeof BookOpen; nameKey: "methodIching" | "methodZiwei" | "methodStats"; descKey: "methodIchingDesc" | "methodZiweiDesc" | "methodStatsDesc" }[] = [
  { id: "iching", icon: BookOpen, nameKey: "methodIching", descKey: "methodIchingDesc" },
  { id: "ziwei", icon: Sparkles, nameKey: "methodZiwei", descKey: "methodZiweiDesc" },
  { id: "stats", icon: BarChart3, nameKey: "methodStats", descKey: "methodStatsDesc" },
];

export function MethodSelector({ selected, onToggle, language }: MethodSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {METHODS.map(({ id, icon: Icon, nameKey, descKey }) => {
        const isActive = selected.includes(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`card relative flex flex-col items-center gap-2 p-4 text-center transition-all ${
              isActive
                ? "border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400 dark:bg-amber-950/30"
                : "hover:border-amber-300 hover:shadow-sm"
            }`}
          >
            {isActive && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
            <Icon className={`h-7 w-7 ${isActive ? "text-amber-600 dark:text-amber-400" : "text-stone-400"}`} />
            <span className="font-display font-semibold">{t(nameKey, language)}</span>
            <span className="text-xs text-stone-500 dark:text-stone-400">{t(descKey, language)}</span>
          </button>
        );
      })}
    </div>
  );
}
