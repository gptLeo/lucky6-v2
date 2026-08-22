// Core data types shared across the app

export interface DrawResult {
  id: string;
  date: string; // YYYY-MM-DD
  numbers: number[]; // 6 main numbers, ascending
  special: number;
}

export type MethodId = "iching" | "ziwei" | "stats";

export interface NumberAttribution {
  number: number;
  methods: MethodId[];
  confidence: number; // 0-100
}

export interface PredictionResult {
  mainNumbers: number[];
  specialNumber: number;
  methods: MethodId[];
  perMethod: Partial<Record<MethodId, { numbers: number[]; special: number; detail: string }>>;
  attributions: NumberAttribution[];
  timestamp: number;
}

export interface SavedPrediction extends PredictionResult {
  id: string;
}
