// Zi Wei Dou Shu (紫微斗數) — simplified star-reading for cultural/entertainment
// flavour only. Uses the user's chosen date (default: today) as a
// deterministic seed to pick a "main star" and derive numbers. This is a
// numerological convention, not astrology in any scientific sense, and
// definitely not a predictive mechanism for random lottery draws.

export interface ZiWeiStar {
  chinese: string;
  pinyin: string;
  name: string;
  domain: string;
  meaning: string;
}

export const ZIWEI_STARS: ZiWeiStar[] = [
  { chinese: "紫微", pinyin: "Zǐ Wēi", name: "Purple Star", domain: "帝王 · 領導", meaning: "尊貴領導，統籌大局" },
  { chinese: "天機", pinyin: "Tiān Jī", name: "Heavenly Secret", domain: "智慧 · 謀略", meaning: "足智多謀，善於策劃" },
  { chinese: "太陽", pinyin: "Tài Yáng", name: "Sun", domain: "光明 · 名譽", meaning: "光芒四射，聲名遠播" },
  { chinese: "武曲", pinyin: "Wǔ Qǔ", name: "Military Arts", domain: "財富 · 果斷", meaning: "財運亨通，行事果斷" },
  { chinese: "天同", pinyin: "Tiān Tóng", name: "Heavenly Unity", domain: "和諧 · 享受", meaning: "心境平和，福澤自來" },
  { chinese: "廉貞", pinyin: "Lián Zhēn", name: "Purity", domain: "原則 · 變化", meaning: "堅守原則，善於應變" },
  { chinese: "天府", pinyin: "Tiān Fǔ", name: "Heavenly Treasury", domain: "積蓄 · 穩健", meaning: "廣納資源，穩健積累" },
  { chinese: "太陰", pinyin: "Tài Yīn", name: "Moon", domain: "直覺 · 內斂", meaning: "心思細膩，暗藏機緣" },
  { chinese: "貪狼", pinyin: "Tān Láng", name: "Greedy Wolf", domain: "慾望 · 魅力", meaning: "魅力四射，機遇處處" },
  { chinese: "巨門", pinyin: "Jù Mén", name: "Giant Gate", domain: "口才 · 辯論", meaning: "能言善辯，以口才致勝" },
  { chinese: "天相", pinyin: "Tiān Xiàng", name: "Heavenly Minister", domain: "輔助 · 服務", meaning: "樂於助人，貴人相助" },
  { chinese: "天梁", pinyin: "Tiān Liáng", name: "Heavenly Bridge", domain: "庇蔭 · 化解", meaning: "逢凶化吉，貴人庇蔭" },
  { chinese: "七殺", pinyin: "Qī Shā", name: "Seven Killings", domain: "突破 · 勇氣", meaning: "勇於突破，敢作敢為" },
  { chinese: "破軍", pinyin: "Pò Jūn", name: "Army Breaker", domain: "革新 · 重生", meaning: "破舊立新，浴火重生" },
];

export interface ZiWeiReading {
  mainStar: ZiWeiStar;
  secondaryStar: ZiWeiStar;
  dateUsed: string; // YYYY-MM-DD
}

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function toDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function generateZiWeiReading(date?: Date): ZiWeiReading {
  const d = date ?? new Date();
  const dateStr = toDateStr(d);
  const hash = hashDate(dateStr);

  const mainIdx = hash % ZIWEI_STARS.length;
  let secondaryIdx = (hash >> 4) % ZIWEI_STARS.length;
  if (secondaryIdx === mainIdx) secondaryIdx = (secondaryIdx + 1) % ZIWEI_STARS.length;

  return {
    mainStar: ZIWEI_STARS[mainIdx],
    secondaryStar: ZIWEI_STARS[secondaryIdx],
    dateUsed: dateStr,
  };
}

export function ziWeiToNumbers(reading: ZiWeiReading): {
  numbers: number[];
  special: number;
} {
  let seed = hashDate(reading.dateUsed) + Date.now() % 100000;

  function next(): number {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return Math.abs(seed) / 2147483648;
  }

  const numbers = new Set<number>();
  while (numbers.size < 6) {
    numbers.add(Math.floor(next() * 49) + 1);
  }
  const sorted = Array.from(numbers).sort((a, b) => a - b);

  let special = Math.floor(next() * 49) + 1;
  while (sorted.includes(special)) {
    special = (special % 49) + 1;
  }

  return { numbers: sorted, special };
}
