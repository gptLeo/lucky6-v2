// Prediction orchestration: runs the selected method(s) and combines results.
//
// HONESTY NOTE: Mark Six main-draw numbers are chosen by a certified random
// mechanical/electronic device. No algorithm — statistical, numerological,
// or otherwise — can predict them. Everything below is either (a) a
// transparent statistical description of PAST draws, or (b) a traditional
// cultural practice (I Ching / Zi Wei Dou Shu) offered purely for
// entertainment. This file's job is just to generate numbers via those
// methods and blend them when more than one is chosen, for fun and variety.

import type { DrawResult, MethodId, NumberAttribution, PredictionResult } from "./types";
import { analyzeHistory, pickFromStats } from "./stats";
import { generateHexagram, hexagramToNumbers, type HexagramReading } from "./iching";
import { generateZiWeiReading, ziWeiToNumbers, type ZiWeiReading } from "./ziwei";

export interface MethodRunResult {
  method: MethodId;
  numbers: number[];
  special: number;
  detail: string;
  hexagramReading?: HexagramReading;
  ziWeiReading?: ZiWeiReading;
}

export function runIChing(): MethodRunResult {
  const reading = generateHexagram();
  const { numbers, special } = hexagramToNumbers(reading);
  return {
    method: "iching",
    numbers,
    special,
    detail: `第${reading.hexagram.number}卦 ${reading.hexagram.chinese}（${reading.hexagram.pinyin}）— ${reading.hexagram.meaning}`,
    hexagramReading: reading,
  };
}

export function runZiWei(date?: Date): MethodRunResult {
  const reading = generateZiWeiReading(date);
  const { numbers, special } = ziWeiToNumbers(reading);
  return {
    method: "ziwei",
    numbers,
    special,
    detail: `主星 ${reading.mainStar.chinese}（${reading.mainStar.name}）配 ${reading.secondaryStar.chinese} — ${reading.mainStar.meaning}`,
    ziWeiReading: reading,
  };
}

export function runStats(draws: DrawResult[], sampleSize: number = 100): MethodRunResult {
  const stats = analyzeHistory(draws, sampleSize);
  const numbers = pickFromStats(stats, 6);
  let special = pickFromStats(stats, 1)[0];
  while (numbers.includes(special)) {
    special = (special % 49) + 1;
  }
  const hotDisplay = stats.hot.slice(0, 5).map((h) => h.number).join(", ");
  return {
    method: "stats",
    numbers,
    special,
    detail: `基於最近 ${stats.totalDraws} 期數據，熱門號碼：${hotDisplay}`,
  };
}

/**
 * Combine multiple method results into a single 6+1 prediction.
 * Numbers picked by 2+ methods get priority ("consensus"); remaining slots
 * filled by weighted random draw from the combined candidate pool.
 */
export function combineResults(results: MethodRunResult[]): PredictionResult {
  if (results.length === 1) {
    const r = results[0];
    return {
      mainNumbers: r.numbers,
      specialNumber: r.special,
      methods: [r.method],
      perMethod: { [r.method]: { numbers: r.numbers, special: r.special, detail: r.detail } },
      attributions: r.numbers.map((n) => ({ number: n, methods: [r.method], confidence: 100 })),
      timestamp: Date.now(),
    };
  }

  const voteCount: Record<number, MethodId[]> = {};
  results.forEach((r) => {
    r.numbers.forEach((n) => {
      if (!voteCount[n]) voteCount[n] = [];
      voteCount[n].push(r.method);
    });
  });

  const totalMethods = results.length;
  const attributions: NumberAttribution[] = Object.entries(voteCount)
    .map(([num, methods]) => ({
      number: Number(num),
      methods,
      confidence: Math.round((methods.length / totalMethods) * 100),
    }))
    .sort((a, b) => b.methods.length - a.methods.length || a.number - b.number);

  const selected = new Set<number>();
  // Step 1: consensus picks (2+ methods)
  attributions.filter((a) => a.methods.length >= 2).forEach((a) => {
    if (selected.size < 6) selected.add(a.number);
  });
  // Step 2: fill remaining from single-method picks, weighted by vote pool order
  const remaining = attributions.filter((a) => !selected.has(a.number));
  let i = 0;
  while (selected.size < 6 && i < remaining.length) {
    selected.add(remaining[i].number);
    i++;
  }
  // Step 3: safety fill with random numbers if still short
  while (selected.size < 6) {
    selected.add(Math.floor(Math.random() * 49) + 1);
  }

  const mainNumbers = Array.from(selected).sort((a, b) => a - b);

  const avgSpecial = Math.round(
    results.reduce((sum, r) => sum + r.special, 0) / results.length,
  );
  let specialNumber = Math.min(49, Math.max(1, avgSpecial));
  while (mainNumbers.includes(specialNumber)) {
    specialNumber = (specialNumber % 49) + 1;
  }

  const perMethod: PredictionResult["perMethod"] = {};
  results.forEach((r) => {
    perMethod[r.method] = { numbers: r.numbers, special: r.special, detail: r.detail };
  });

  return {
    mainNumbers,
    specialNumber,
    methods: results.map((r) => r.method),
    perMethod,
    attributions: attributions.filter((a) => mainNumbers.includes(a.number)),
    timestamp: Date.now(),
  };
}
