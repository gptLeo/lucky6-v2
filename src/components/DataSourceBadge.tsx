import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

export function DataSourceBadge({ source, language }: { source: "remote" | "local" | null; language: Language }) {
  if (!source) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
      <span
        className={`h-1.5 w-1.5 rounded-full ${source === "remote" ? "bg-green-500" : "bg-amber-500"}`}
      />
      {t("dataSource", language)}: {source === "remote" ? t("dataSourceRemote", language) : t("dataSourceLocal", language)}
    </div>
  );
}
