// Historical Mark Six draw data loading
//
// Primary source: icelam/mark-six-data-visualization (GitHub, CORS-enabled,
// auto-updated daily via GitHub Actions from official HKJC results).
// Fallback: a bundled local snapshot (src/data/markSixHistory.json) captured
// at build time, so the app still works fully offline / if the remote is down.
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
let cachedSource: "remote" | "local" | null = null;

export function getLocalSnapshot(): DrawResult[] {
  return tuplesToDrawResults(localSnapshot as RawTuple[]);
}

/**
 * Load full Mark Six draw history.
 * Tries the live remote dataset first (with a timeout), falls back to the
 * bundled local snapshot on any failure. Result is cached in-memory for the
 * session.
 */
export async function loadHistory(): Promise<{
  draws: DrawResult[];
  source: "remote" | "local";
}> {
  if (cachedHistory && cachedSource) {
    return { draws: cachedHistory, source: cachedSource };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(REMOTE_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows: RemoteRow[] = await res.json();
    if (!Array.isArray(rows) || rows.length < 100) throw new Error("Unexpected payload");
    const draws = remoteRowsToDrawResults(rows).sort((a, b) => b.date.localeCompare(a.date));
    cachedHistory = draws;
    cachedSource = "remote";
    return { draws, source: "remote" };
  } catch {
    const draws = getLocalSnapshot().sort((a, b) => b.date.localeCompare(a.date));
    cachedHistory = draws;
    cachedSource = "local";
    return { draws, source: "local" };
  }
}

export function resetHistoryCache() {
  cachedHistory = null;
  cachedSource = null;
}
