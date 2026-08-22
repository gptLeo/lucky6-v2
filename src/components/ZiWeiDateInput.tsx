import { Calendar } from "lucide-react";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

interface ZiWeiDateInputProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  language: Language;
}

export function ZiWeiDateInput({ value, onChange, language }: ZiWeiDateInputProps) {
  return (
    <label className="card flex items-center gap-3 p-4">
      <Calendar className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
      <span className="text-sm font-medium">{t("ziweiDateLabel", language)}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-auto rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-800"
      />
    </label>
  );
}
