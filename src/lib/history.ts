// Historical Mark Six draw data loading
//
// Primary source: icelam/mark-six-data-visualization (GitHub, CORS-enabled,
// intended to auto-update via GitHub Actions from official HKJC results;
// its automation lapsed after 2025-12-28, so it may lag behind live draws).
// Fallback: a bundled local snapshot (src/data/markSixHistory.json), which
// additionally includes 2026 draws (26/001 onward) manually verified against
// official HKJC / lottery.hk results and merged in on 2026-08-22 to cover the
// gap left by the remote source. The app still works fully offline / if the
// remote is down.
//
// Format of both remote & local data: compact tuples
//   [drawId, date, [n1..n6], specialNumber]

import type { DrawResult } from "./types";
import localSnapshot from "../data/markSixHistory.json";

const REMOTE_URL =
  "https://raw.githubusercontent.com/icelam/mark-six-data-visualization/master/data/all.json";

type RawTuple = [string, string, number[], number];
type RemoteRow = {
  id: string;
  date: string;
  no: string[];
  sno: string;
};

function tuplesToDrawResults(rows: RawTuple[]): DrawResult[] {
  return rows.map(([id, date, numbers, special]) => ({
    id,
    date,
    numbers: [...numbers].sort((a, b) => a - b),
    special,
  }));
}

function remoteRowsToDrawResults(rows: RemoteRow[]): DrawResult[] {
  return rows.map((r) => ({
    id: r.id,
    date: r.date,
    numbers: r.no.map(Number).sort((a, b) => a - b),
    special: Number(r.sno),
  }));
}

let cachedHistory: DrawResult[] | null = null;
let cachedSource: "merged" | "local" | null = null;

export function getLocalSnapshot(): DrawResult[] {
  return tuplesToDrawResults(localSnapshot as RawTuple[]);
}

/**
 * Load full Mark Six draw history.
 *
 * The bundled local snapshot is always the base (it includes manually
 * verified 2026 draws that cover a gap in the remote source's automation).
 * If the remote dataset is reachable, its rows are merged in on top by
 * drawId — this picks up anything newer than the local snapshot without
 * ever regressing to older data if the remote happens to lag behind.
 * Result is cached in-memory for the session.
 */
export async function loadHistory(): Promise<{
  draws: DrawResult[];
  source: "merged" | "local";
}> {
  if (cachedHistory && cachedSource) {
    return { draws: cachedHistory, source: cachedSource };
  }

  const localDraws = getLocalSnapshot();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(REMOTE_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows: RemoteRow[] = await res.json();
    if (!Array.isArray(rows) || rows.length < 100) throw new Error("Unexpected payload");
    const remoteDraws = remoteRowsToDrawResults(rows);

    const byId = new Map<string, DrawResult>();
    for (const d of localDraws) byId.set(d.id, d);
    for (const d of remoteDraws) byId.set(d.id, d); // remote wins on id collision (freshest)
    const draws = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date));

    cachedHistory = draws;
    cachedSource = "merged";
    return { draws, source: "merged" };
  } catch {
    const draws = [...localDraws].sort((a, b) => b.date.localeCompare(a.date));
    cachedHistory = draws;
    cachedSource = "local";
    return { draws, source: "local" };
  }
}

export function resetHistoryCache() {
  cachedHistory = null;
  cachedSource = null;
}
