import { AlertTriangle } from "lucide-react";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

export function Disclaimer({ language }: { language: Language }) {
  return (
    <div className="card flex items-start gap-3 border-amber-400/70 bg-amber-50 p-4 dark:bg-amber-950/30">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
      <div>
        <p className="font-semibold text-amber-800 dark:text-amber-300">{t("disclaimerTitle", language)}</p>
        <p className="mt-1 text-sm leading-relaxed text-amber-700/90 dark:text-amber-200/80">
          {t("disclaimerBody", language)}
        </p>
      </div>
    </div>
  );
}
