import { useCallback, useEffect, useMemo, useState } from "react";
import { Home as HomeIcon, Loader2 } from "lucide-react";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import type { DrawResult, MethodId, PredictionResult } from "../lib/types";
import { loadHistory } from "../lib/history";
import { analyzeHistory } from "../lib/stats";
import { runIChing, runZiWei, runStats, combineResults, type MethodRunResult } from "../lib/predictions";
import { HeaderControls } from "../components/HeaderControls";
import { Disclaimer } from "../components/Disclaimer";
import { MethodSelector } from "../components/MethodSelector";
import { ZiWeiDateInput } from "../components/ZiWeiDateInput";
import { ResultCard } from "../components/ResultCard";
import { HexagramDisplay } from "../components/HexagramDisplay";
import { ZiWeiDisplay } from "../components/ZiWeiDisplay";
import { StatsPanel } from "../components/StatsPanel";
import { DrawHistoryTable } from "../components/DrawHistoryTable";
import { FavoritesPanel } from "../components/FavoritesPanel";
import { PredictionHistoryPanel } from "../components/PredictionHistoryPanel";
import { DataSourceBadge } from "../components/DataSourceBadge";
import { useFavorites } from "../hooks/useFavorites";
import { usePredictionHistory } from "../hooks/usePredictionHistory";
import type { HexagramReading } from "../lib/iching";
import type { ZiWeiReading } from "../lib/ziwei";

interface HomeProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onBackHome: () => void;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function Home({ language, onToggleLanguage, isDark, onToggleTheme, onBackHome }: HomeProps) {
  const [selectedMethods, setSelectedMethods] = useState<MethodId[]>([]);
  const [ziweiDate, setZiweiDate] = useState(todayStr());
  const [draws, setDraws] = useState<DrawResult[]>([]);
  const [dataSource, setDataSource] = useState<"remote" | "local" | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showMethodError, setShowMethodError] = useState(false);
  const [hexagramReading, setHexagramReading] = useState<HexagramReading | null>(null);
  const [ziweiReading, setZiweiReading] = useState<ZiWeiReading | null>(null);

  const { favorites, addFavorite, removeFavorite, clearFavorites, isFavorite } = useFavorites();
  const { history, addToHistory, removeFromHistory, clearHistory } = usePredictionHistory();

  useEffect(() => {
    loadHistory().then(({ draws, source }) => {
      setDraws(draws);
      setDataSource(source);
      setIsLoadingHistory(false);
    });
  }, []);

  const stats = useMemo(() => {
    if (draws.length === 0) return null;
    return analyzeHistory(draws, Math.min(200, draws.length));
  }, [draws]);

  const toggleMethod = useCallback((id: MethodId) => {
    setSelectedMethods((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
    setResult(null);
    setShowMethodError(false);
  }, []);

  const handlePredict = useCallback(async () => {
    if (selectedMethods.length === 0) {
      setShowMethodError(true);
      return;
    }
    setShowMethodError(false);
    setIsPredicting(true);
    setResult(null);
    setHexagramReading(null);
    setZiweiReading(null);

    await new Promise((r) => setTimeout(r, 900));

    const results: MethodRunResult[] = [];
    if (selectedMethods.includes("iching")) {
      const r = runIChing();
      results.push(r);
      if (r.hexagramReading) setHexagramReading(r.hexagramReading);
    }
    if (selectedMethods.includes("ziwei")) {
      const r = runZiWei(ziweiDate ? new Date(ziweiDate) : undefined);
      results.push(r);
      if (r.ziWeiReading) setZiweiReading(r.ziWeiReading);
    }
    if (selectedMethods.includes("stats")) {
      results.push(runStats(draws, 100));
    }

    const combined = combineResults(results);
    setResult(combined);
    addToHistory(combined);
    setIsPredicting(false);
  }, [selectedMethods, ziweiDate, draws, addToHistory]);

  return (
    <div className="min-h-screen px-3 py-6 sm:px-4 sm:py-8">
      <div className="fixed left-4 top-4 z-50">
        <button onClick={onBackHome} className="btn-secondary">
          <HomeIcon className="h-4 w-4" />
          {t("home", language)}
        </button>
      </div>
      <HeaderControls
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
        <Disclaimer language={language} />

        <header className="space-y-2 pt-6 text-center">
          <div className="animate-float inline-block text-5xl sm:text-6xl">🎱</div>
          <h1 className="font-display gold-text text-3xl font-bold sm:text-4xl">{t("appTitle", language)}</h1>
          <p className="mx-auto max-w-xl text-sm text-stone-500 sm:text-base dark:text-stone-400">
            {t("appSubtitle", language)}
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-center font-display text-lg font-semibold">{t("chooseMethod", language)}</h2>
          <MethodSelector selected={selectedMethods} onToggle={toggleMethod} language={language} />
        </section>

        {selectedMethods.includes("ziwei") && (
          <section className="mx-auto max-w-md animate-in fade-in">
            <ZiWeiDateInput value={ziweiDate} onChange={setZiweiDate} language={language} />
          </section>
        )}

        {showMethodError && (
          <p className="text-center text-sm font-medium text-red-500">⚠️ {t("selectMethodError", language)}</p>
        )}

        <div className="flex justify-center">
          <button onClick={handlePredict} disabled={isPredicting} className="btn-primary text-lg">
            {isPredicting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("predictingButton", language)}
              </>
            ) : (
              t("predictButton", language)
            )}
          </button>
        </div>

        {hexagramReading && (
          <section className="animate-in fade-in">
            <HexagramDisplay reading={hexagramReading} />
          </section>
        )}

        {ziweiReading && (
          <section className="animate-in fade-in">
            <ZiWeiDisplay reading={ziweiReading} />
          </section>
        )}

        {result && (
          <section className="animate-in fade-in space-y-3">
            <h2 className="text-center font-display text-lg font-semibold">{t("yourNumbers", language)}</h2>
            <ResultCard
              result={result}
              language={language}
              isSaved={isFavorite(result)}
              onSave={() => addFavorite(result)}
            />
            <div className="flex justify-center">
              <button
                onClick={handlePredict}
                className="font-display text-sm text-amber-600 underline underline-offset-4 hover:text-amber-700 dark:text-amber-400"
              >
                🔄 {t("predictAgain", language)}
              </button>
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-center font-display text-lg font-semibold">{t("historicalStats", language)}</h2>
          {isLoadingHistory ? (
            <div className="card flex items-center justify-center gap-2 p-8 text-sm text-stone-500 dark:text-stone-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("loading", language)}
            </div>
          ) : (
            stats && <StatsPanel stats={stats} language={language} />
          )}
          <DataSourceBadge source={dataSource} language={language} />
        </section>

        {!isLoadingHistory && draws.length > 0 && (
          <section>
            <DrawHistoryTable draws={draws} language={language} />
          </section>
        )}

        <section>
          <FavoritesPanel
            favorites={favorites}
            onRemove={removeFavorite}
            onClear={clearFavorites}
            language={language}
          />
        </section>

        <section>
          <PredictionHistoryPanel
            history={history}
            onRemove={removeFromHistory}
            onClear={clearHistory}
            language={language}
          />
        </section>

        <Disclaimer language={language} />

        <footer className="border-t border-amber-200/60 pt-6 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
          <p>{t("appTitle", language)}</p>
          <p className="mt-1 opacity-70">{t("footerNote", language)}</p>
        </footer>
      </div>
    </div>
  );
}
