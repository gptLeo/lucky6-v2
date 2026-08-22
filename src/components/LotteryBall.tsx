interface LotteryBallProps {
  number: number;
  isSpecial?: boolean;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const ZONE_COLORS = [
  { max: 10, bg: "bg-red-500", ring: "ring-red-300" },
  { max: 20, bg: "bg-blue-500", ring: "ring-blue-300" },
  { max: 30, bg: "bg-green-500", ring: "ring-green-300" },
  { max: 40, bg: "bg-slate-700", ring: "ring-slate-400" },
  { max: 49, bg: "bg-amber-500", ring: "ring-amber-300" },
];

function getZoneColor(n: number) {
  return ZONE_COLORS.find((z) => n <= z.max) ?? ZONE_COLORS[ZONE_COLORS.length - 1];
}

const SIZE_CLASSES = {
  sm: "w-9 h-9 text-sm",
  md: "w-12 h-12 text-base sm:w-14 sm:h-14 sm:text-lg",
  lg: "w-16 h-16 text-xl sm:w-20 sm:h-20 sm:text-2xl",
};

export function LotteryBall({ number, isSpecial = false, size = "md", delay = 0 }: LotteryBallProps) {
  const zone = getZoneColor(number);
  return (
    <div
      className={`animate-ball-pop flex items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ${SIZE_CLASSES[size]} ${
        isSpecial ? "bg-gradient-to-br from-amber-400 to-orange-600 ring-amber-200" : `${zone.bg} ${zone.ring}`
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {number}
    </div>
  );
}
