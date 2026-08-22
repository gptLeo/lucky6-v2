import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

export function DataSourceBadge({ source, language }: { source: "merged" | "local" | null; language: Language }) {
  if (!source) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
      <span
        className={`h-1.5 w-1.5 rounded-full ${source === "merged" ? "bg-green-500" : "bg-amber-500"}`}
      />
      {t("dataSource", language)}: {source === "merged" ? t("dataSourceRemote", language) : t("dataSourceLocal", language)}
    </div>
  );
}
