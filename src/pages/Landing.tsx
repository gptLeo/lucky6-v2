import { BookOpen, Sparkles, Database, ExternalLink } from "lucide-react";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import { HeaderControls } from "../components/HeaderControls";

interface LandingProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onStart: () => void;
}

export function Landing({ language, onToggleLanguage, isDark, onToggleTheme, onStart }: LandingProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <HeaderControls
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="animate-float mb-6 text-7xl">🎱</div>
      <h1 className="font-display gold-text mb-3 text-4xl font-bold sm:text-5xl md:text-6xl">
        {t("appTitle", language)}
      </h1>
      <p className="mb-2 max-w-xl text-lg text-stone-600 dark:text-stone-300">{t("landingTagline", language)}</p>
      <p className="mb-10 text-sm font-medium text-amber-600 dark:text-amber-400">
        {t("entertainmentOnly", language)}
      </p>

      <div className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card flex flex-col items-center gap-2 p-5">
          <BookOpen className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          <span className="font-display font-semibold">{t("featureIching", language)}</span>
        </div>
        <div className="card flex flex-col items-center gap-2 p-5">
          <Sparkles className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          <span className="font-display font-semibold">{t("featureZiwei", language)}</span>
        </div>
        <div className="card flex flex-col items-center gap-2 p-5">
          <Database className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          <span className="font-display font-semibold">{t("featureStats", language)}</span>
          <span className="text-xs text-stone-500 dark:text-stone-400">{t("featureStatsDesc", language)}</span>
        </div>
      </div>

      <button onClick={onStart} className="btn-primary text-lg">
        ✨ {t("getStarted", language)}
      </button>

      <a
        href="https://github.com/icelam/mark-six-data-visualization"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-600 dark:text-stone-500 dark:hover:text-amber-400"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        {t("dataSource", language)}: icelam/mark-six-data-visualization
      </a>
    </div>
  );
}
