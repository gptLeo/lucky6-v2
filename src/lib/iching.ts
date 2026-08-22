// I Ching (易經) hexagram generator — for cultural/entertainment flavour only.
// The mapping from hexagram to lottery numbers is an arbitrary-but-consistent
// numerological convention, not a predictive mechanism.

export interface Hexagram {
  number: number;
  chinese: string;
  pinyin: string;
  name: string;
  meaning: string;
}

export const HEXAGRAMS: Hexagram[] = [
  { number: 1, chinese: "乾", pinyin: "Qián", name: "The Creative", meaning: "剛健創造，宜主動出擊" },
  { number: 2, chinese: "坤", pinyin: "Kūn", name: "The Receptive", meaning: "柔順包容，宜靜待時機" },
  { number: 3, chinese: "屯", pinyin: "Zhūn", name: "Difficulty at the Beginning", meaning: "初生艱難，堅持必有成" },
  { number: 4, chinese: "蒙", pinyin: "Méng", name: "Youthful Folly", meaning: "蒙昧待啟，虛心求教" },
  { number: 5, chinese: "需", pinyin: "Xū", name: "Waiting", meaning: "等待時機，穩中求勝" },
  { number: 6, chinese: "訟", pinyin: "Sòng", name: "Conflict", meaning: "爭訟不利，宜和為貴" },
  { number: 7, chinese: "師", pinyin: "Shī", name: "The Army", meaning: "紀律嚴明，統籌得當" },
  { number: 8, chinese: "比", pinyin: "Bǐ", name: "Holding Together", meaning: "團結互助，共創佳績" },
  { number: 9, chinese: "小畜", pinyin: "Xiǎo Xù", name: "Small Taming", meaning: "積少成多，循序漸進" },
  { number: 10, chinese: "履", pinyin: "Lǚ", name: "Treading", meaning: "步步為營，謹慎行事" },
  { number: 11, chinese: "泰", pinyin: "Tài", name: "Peace", meaning: "否極泰來，時運亨通" },
  { number: 12, chinese: "否", pinyin: "Pǐ", name: "Standstill", meaning: "閉塞不通，宜守不宜進" },
  { number: 13, chinese: "同人", pinyin: "Tóng Rén", name: "Fellowship", meaning: "志同道合，眾志成城" },
  { number: 14, chinese: "大有", pinyin: "Dà Yǒu", name: "Great Possession", meaning: "大豐大有，吉慶盈門" },
  { number: 15, chinese: "謙", pinyin: "Qiān", name: "Modesty", meaning: "謙遜低調，福澤綿長" },
  { number: 16, chinese: "豫", pinyin: "Yù", name: "Enthusiasm", meaning: "歡欣鼓舞，順勢而為" },
  { number: 17, chinese: "隨", pinyin: "Suí", name: "Following", meaning: "隨機應變，因時制宜" },
  { number: 18, chinese: "蠱", pinyin: "Gǔ", name: "Work on the Decayed", meaning: "撥亂反正，革新有成" },
  { number: 19, chinese: "臨", pinyin: "Lín", name: "Approach", meaning: "喜事臨門，機會將至" },
  { number: 20, chinese: "觀", pinyin: "Guān", name: "Contemplation", meaning: "冷靜觀察，三思後行" },
  { number: 21, chinese: "噬嗑", pinyin: "Shì Kè", name: "Biting Through", meaning: "當機立斷，排除阻礙" },
  { number: 22, chinese: "賁", pinyin: "Bì", name: "Grace", meaning: "文采飛揚，錦上添花" },
  { number: 23, chinese: "剝", pinyin: "Bō", name: "Splitting Apart", meaning: "由盛轉衰，宜靜守待變" },
  { number: 24, chinese: "復", pinyin: "Fù", name: "Return", meaning: "否極泰來，時來運轉" },
  { number: 25, chinese: "無妄", pinyin: "Wú Wàng", name: "Innocence", meaning: "順其自然，誠信為本" },
  { number: 26, chinese: "大畜", pinyin: "Dà Xù", name: "Great Taming", meaning: "厚積薄發，蓄勢待發" },
  { number: 27, chinese: "頤", pinyin: "Yí", name: "Nourishment", meaning: "養精蓄銳，量力而為" },
  { number: 28, chinese: "大過", pinyin: "Dà Guò", name: "Great Exceeding", meaning: "非常之時，行非常之事" },
  { number: 29, chinese: "坎", pinyin: "Kǎn", name: "The Abysmal", meaning: "重重險阻，宜謹慎應對" },
  { number: 30, chinese: "離", pinyin: "Lí", name: "The Clinging", meaning: "光明在望，明察秋毫" },
  { number: 31, chinese: "咸", pinyin: "Xián", name: "Influence", meaning: "感應相通，人緣旺盛" },
  { number: 32, chinese: "恆", pinyin: "Héng", name: "Duration", meaning: "持之以恆，穩健致遠" },
  { number: 33, chinese: "遯", pinyin: "Dùn", name: "Retreat", meaning: "以退為進，靜觀其變" },
  { number: 34, chinese: "大壯", pinyin: "Dà Zhuàng", name: "Great Power", meaning: "氣勢如虹，切忌躁進" },
  { number: 35, chinese: "晉", pinyin: "Jìn", name: "Progress", meaning: "步步高升，前程似錦" },
  { number: 36, chinese: "明夷", pinyin: "Míng Yí", name: "Darkening of the Light", meaning: "韜光養晦，靜待天明" },
  { number: 37, chinese: "家人", pinyin: "Jiā Rén", name: "The Family", meaning: "家和萬事興，內外兼修" },
  { number: 38, chinese: "睽", pinyin: "Kuí", name: "Opposition", meaning: "求同存異，化解分歧" },
  { number: 39, chinese: "蹇", pinyin: "Jiǎn", name: "Obstruction", meaning: "遇阻不餒，尋求助力" },
  { number: 40, chinese: "解", pinyin: "Xiè", name: "Deliverance", meaning: "困境化解，撥雲見日" },
  { number: 41, chinese: "損", pinyin: "Sǔn", name: "Decrease", meaning: "捨得取捨，先損後益" },
  { number: 42, chinese: "益", pinyin: "Yì", name: "Increase", meaning: "增益有加，把握良機" },
  { number: 43, chinese: "夬", pinyin: "Guài", name: "Breakthrough", meaning: "當斷則斷，決意前行" },
  { number: 44, chinese: "姤", pinyin: "Gòu", name: "Coming to Meet", meaning: "不期而遇，把握機緣" },
  { number: 45, chinese: "萃", pinyin: "Cuì", name: "Gathering Together", meaning: "眾人齊聚，凝聚力量" },
  { number: 46, chinese: "升", pinyin: "Shēng", name: "Pushing Upward", meaning: "循序上升，穩步向前" },
  { number: 47, chinese: "困", pinyin: "Kùn", name: "Oppression", meaning: "身處困境，堅忍待變" },
  { number: 48, chinese: "井", pinyin: "Jǐng", name: "The Well", meaning: "源源不絕，取之有道" },
  { number: 49, chinese: "革", pinyin: "Gé", name: "Revolution", meaning: "變革求新，破舊立新" },
  { number: 50, chinese: "鼎", pinyin: "Dǐng", name: "The Cauldron", meaning: "推陳出新，穩固根基" },
  { number: 51, chinese: "震", pinyin: "Zhèn", name: "The Arousing", meaning: "驚而後定，臨危不亂" },
  { number: 52, chinese: "艮", pinyin: "Gèn", name: "Keeping Still", meaning: "適可而止，靜中求安" },
  { number: 53, chinese: "漸", pinyin: "Jiàn", name: "Development", meaning: "循序漸進，水到渠成" },
  { number: 54, chinese: "歸妹", pinyin: "Guī Mèi", name: "The Marrying Maiden", meaning: "順應時勢，隨遇而安" },
  { number: 55, chinese: "豐", pinyin: "Fēng", name: "Abundance", meaning: "盛極一時，居安思危" },
  { number: 56, chinese: "旅", pinyin: "Lǚ", name: "The Wanderer", meaning: "客旅在外，謹言慎行" },
  { number: 57, chinese: "巽", pinyin: "Xùn", name: "The Gentle", meaning: "柔中帶剛，順勢滲透" },
  { number: 58, chinese: "兌", pinyin: "Duì", name: "The Joyous", meaning: "喜悅共享，人和事順" },
  { number: 59, chinese: "渙", pinyin: "Huàn", name: "Dispersion", meaning: "化解隔閡，凝聚共識" },
  { number: 60, chinese: "節", pinyin: "Jié", name: "Limitation", meaning: "適度節制，量入為出" },
  { number: 61, chinese: "中孚", pinyin: "Zhōng Fú", name: "Inner Truth", meaning: "誠信為本，內外一致" },
  { number: 62, chinese: "小過", pinyin: "Xiǎo Guò", name: "Small Exceeding", meaning: "小心行事，細節致勝" },
  { number: 63, chinese: "既濟", pinyin: "Jì Jì", name: "After Completion", meaning: "功成之際，慎終如始" },
  { number: 64, chinese: "未濟", pinyin: "Wèi Jì", name: "Before Completion", meaning: "尚未功成，仍需努力" },
];

export interface HexagramReading {
  hexagram: Hexagram;
  lines: boolean[]; // true = yang, false = yin, bottom to top
}

function throwCoins(): boolean {
  // 3-coin toss simulation: majority heads = yang
  let heads = 0;
  for (let i = 0; i < 3; i++) if (Math.random() < 0.5) heads++;
  return heads >= 2;
}

export function generateHexagram(): HexagramReading {
  const lines = Array.from({ length: 6 }, () => throwCoins());
  let binary = 0;
  lines.forEach((isYang, i) => {
    if (isYang) binary |= 1 << i;
  });
  const hexagram = HEXAGRAMS[binary % 64];
  return { hexagram, lines };
}

/**
 * Derive 6 main numbers + 1 special number from a hexagram reading.
 * Uses the hexagram number, line pattern, and current time as a numerological
 * seed. This is a cultural/entertainment convention, not a predictive model.
 */
export function hexagramToNumbers(reading: HexagramReading): {
  numbers: number[];
  special: number;
} {
  let seed = reading.hexagram.number * 6364136223846793005 % 2147483647;
  reading.lines.forEach((isYang, i) => {
    seed = (seed + (isYang ? 1 : 0) * (i + 1) * 97) % 2147483647;
  });
  seed = (seed + Date.now()) % 2147483647;

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
