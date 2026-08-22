// Honest statistical analysis of historical draws.
//
// IMPORTANT: Mark Six is a fair, independent random draw. Nothing here
// predicts future numbers — this module only describes PAST frequency
// patterns for entertainment/informational purposes. We say so explicitly
// in the UI everywhere these numbers are shown.

import type { DrawResult } from "./types";

export interface NumberFrequency {
  number: number;
  count: number;
  percentage: number;
  lastSeenDrawsAgo: number; // 0 = appeared in most recent draw, Infinity = never in sample
}

export interface StatsSummary {
  totalDraws: number;
  frequencies: NumberFrequency[]; // all 49, sorted by count desc
  hot: NumberFrequency[]; // top 8
  cold: NumberFrequency[]; // bottom 8
  overdue: NumberFrequency[]; // top 8 by lastSeenDrawsAgo (excluding never-seen)
  avgSum: number;
  avgOddCount: number; // average odd numbers per draw (out of 6)
  zoneDistribution: { zone: string; count: number; percentage: number }[];
}

const ZONES: [string, number, number][] = [
  ["1-10", 1, 10],
  ["11-20", 11, 20],
  ["21-30", 21, 30],
  ["31-40", 31, 40],
  ["41-49", 41, 49],
];

/**
 * Analyze up to `sampleSize` most recent draws (default: all).
 * `draws` must already include both main numbers and special number counted
 * separately depending on `includeSpecial`.
 */
export function analyzeHistory(
  draws: DrawResult[],
  sampleSize: number = draws.length,
  includeSpecial: boolean = false,
): StatsSummary {
  const sample = [...draws]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, sampleSize);

  const counts = new Array(50).fill(0); // index 1..49
  const lastSeenIdx = new Array(50).fill(Infinity);

  sample.forEach((draw, idx) => {
    const nums = includeSpecial ? [...draw.numbers, draw.special] : draw.numbers;
    nums.forEach((n) => {
      counts[n]++;
      if (lastSeenIdx[n] === Infinity) lastSeenIdx[n] = idx;
    });
  });

  const totalDraws = sample.length;
  const frequencies: NumberFrequency[] = [];
  for (let n = 1; n <= 49; n++) {
    frequencies.push({
      number: n,
      count: counts[n],
      percentage: totalDraws > 0 ? (counts[n] / totalDraws) * 100 : 0,
      lastSeenDrawsAgo: lastSeenIdx[n],
    });
  }

  const byCountDesc = [...frequencies].sort((a, b) => b.count - a.count);
  const hot = byCountDesc.slice(0, 8);
  const cold = [...byCountDesc].reverse().slice(0, 8);
  const overdue = [...frequencies]
    .filter((f) => f.lastSeenDrawsAgo !== Infinity)
    .sort((a, b) => b.lastSeenDrawsAgo - a.lastSeenDrawsAgo)
    .slice(0, 8);

  let sumTotal = 0;
  let oddTotal = 0;
  sample.forEach((d) => {
    sumTotal += d.numbers.reduce((s, n) => s + n, 0);
    oddTotal += d.numbers.filter((n) => n % 2 === 1).length;
  });
  const avgSum = totalDraws > 0 ? sumTotal / totalDraws : 0;
  const avgOddCount = totalDraws > 0 ? oddTotal / totalDraws : 0;

  const zoneCounts = ZONES.map(([label, lo, hi]) => {
    let c = 0;
    sample.forEach((d) => {
      d.numbers.forEach((n) => {
        if (n >= lo && n <= hi) c++;
      });
    });
    return {
      zone: label,
      count: c,
      percentage: totalDraws > 0 ? (c / (totalDraws * 6)) * 100 : 0,
    };
  });

  return {
    totalDraws,
    frequencies: byCountDesc,
    hot,
    cold,
    overdue,
    avgSum,
    avgOddCount,
    zoneDistribution: zoneCounts,
  };
}

/**
 * Generate a statistics-informed number pick.
 * Weighted random draw favouring hot numbers, with a couple of overdue
 * numbers mixed in for coverage — a common (but NOT scientifically
 * predictive) heuristic. Purely for entertainment.
 */
export function pickFromStats(stats: StatsSummary, count: number = 6): number[] {
  const weights = new Array(50).fill(1);
  stats.frequencies.forEach((f) => {
    // Higher historical frequency -> higher weight, but keep it gentle
    // so cold numbers still have a real chance (true randomness).
    weights[f.number] = 1 + f.percentage / 10;
  });
  // Small boost for overdue numbers (regression-to-mean heuristic)
  stats.overdue.forEach((f, idx) => {
    weights[f.number] *= 1 + (8 - idx) * 0.05;
  });

  const picked = new Set<number>();
  const pool = Array.from({ length: 49 }, (_, i) => i + 1);
  while (picked.size < count && pool.length > 0) {
    const totalWeight = pool.reduce((s, n) => s + weights[n], 0);
    let r = Math.random() * totalWeight;
    let chosenIdx = 0;
    for (let i = 0; i < pool.length; i++) {
      r -= weights[pool[i]];
      if (r <= 0) {
        chosenIdx = i;
        break;
      }
    }
    picked.add(pool[chosenIdx]);
    pool.splice(chosenIdx, 1);
  }
  return Array.from(picked).sort((a, b) => a - b);
}
