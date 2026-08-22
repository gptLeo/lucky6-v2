import { Moon, Sun, Languages } from "lucide-react";
import type { Language } from "../lib/i18n";

interface HeaderControlsProps {
  isDark: boolean;
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export function HeaderControls({ isDark, onToggleTheme, language, onToggleLanguage }: HeaderControlsProps) {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <button
        onClick={onToggleLanguage}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white/90 text-amber-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900/90 dark:text-amber-300"
        title={language === "zh" ? "Switch to English" : "切換至中文"}
      >
        <Languages className="h-4 w-4" />
      </button>
      <button
        onClick={onToggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white/90 text-amber-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900/90 dark:text-amber-300"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}
