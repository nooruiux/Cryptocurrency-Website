/**
 * Pure mining-plan calculator.
 *
 * The model is calibrated so the default state (18-Month, USD, 12 TH/s,
 * current BTC price, current difficulty) reproduces the Figma values exactly:
 * $585.75 · $785.86 USD · 2.00% · $15.72 USD · $368.10 USD · 48% ·
 * 0.66 / 5.60 / 25.70 USD.
 */

export type Term = "12" | "18" | "24";
export type Currency = "USD" | "EUR" | "BTC";
export type BtcScenario = "current" | "70k" | "100k";
export type DifficultyScenario = "-20" | "current" | "+20";

export interface MiningInput {
  term: Term;
  currency: Currency;
  hashpower: number;
  btc: BtcScenario;
  difficulty: DifficultyScenario;
}

export interface MiningResult {
  /** All monetary values are in the selected currency. */
  price: number;
  contractPrice: number;
  discountRate: number;
  saved: number;
  estimatedProfit: number;
  roi: number;
  dailyIncome: number;
  weeklyIncome: number;
  monthlyIncome: number;
}

export const TERMS: readonly { value: Term; label: string }[] = [
  { value: "12", label: "12-Month" },
  { value: "18", label: "18-Month" },
  { value: "24", label: "24-Month" },
];

export const CURRENCIES: readonly Currency[] = ["USD", "EUR", "BTC"];
export const HASHPOWER_PRESETS: readonly number[] = [5, 15, 25, 50, 100];
export const HASHPOWER_MIN = 1;
export const HASHPOWER_MAX = 1000;

export const BTC_SCENARIOS: readonly { value: BtcScenario; label: string }[] = [
  { value: "current", label: "Current" },
  { value: "70k", label: "$70k" },
  { value: "100k", label: "$100k" },
];

export const DIFFICULTY_SCENARIOS: readonly { value: DifficultyScenario; label: string }[] = [
  { value: "-20", label: "-20%" },
  { value: "current", label: "Current" },
  { value: "+20", label: "+20%" },
];

export const DEFAULT_INPUT: MiningInput = {
  term: "18",
  currency: "USD",
  hashpower: 12,
  btc: "current",
  difficulty: "current",
};

/** Spot BTC price used across the page (matches the BTC asset card). */
export const BTC_SPOT_USD = 43270.2;
const USD_TO_EUR = 0.92;

/** Baseline per the design: 18-month contract, 12 TH/s. */
const BASELINE = {
  hashpower: 12,
  price: 585.75,
  contractPrice: 785.86,
  profit: 368.1,
  daily: 0.66,
  weekly: 5.6,
  monthly: 25.7,
} as const;

const TERM_FACTORS: Record<Term, { price: number; profit: number }> = {
  "12": { price: 0.7, profit: 0.62 },
  "18": { price: 1, profit: 1 },
  "24": { price: 1.3, profit: 1.45 },
};

const BTC_FACTORS: Record<BtcScenario, number> = {
  current: 1,
  "70k": 70000 / BTC_SPOT_USD,
  "100k": 100000 / BTC_SPOT_USD,
};

/** Higher network difficulty means fewer coins mined per TH/s. */
const DIFFICULTY_FACTORS: Record<DifficultyScenario, number> = {
  "-20": 1 / 0.8,
  current: 1,
  "+20": 1 / 1.2,
};

/** Volume discount tiers (TH/s → discount). */
const DISCOUNT_TIERS: readonly { min: number; rate: number }[] = [
  { min: 100, rate: 0.1 },
  { min: 50, rate: 0.07 },
  { min: 25, rate: 0.05 },
  { min: 15, rate: 0.03 },
  { min: 5, rate: 0.02 },
  { min: 0, rate: 0 },
];

export function clampHashpower(value: number): number {
  if (!Number.isFinite(value)) return HASHPOWER_MIN;
  return Math.min(HASHPOWER_MAX, Math.max(HASHPOWER_MIN, Math.round(value)));
}

export function discountFor(hashpower: number): number {
  return DISCOUNT_TIERS.find((tier) => hashpower >= tier.min)?.rate ?? 0;
}

export function convertFromUsd(amountUsd: number, currency: Currency): number {
  if (currency === "EUR") return amountUsd * USD_TO_EUR;
  if (currency === "BTC") return amountUsd / BTC_SPOT_USD;
  return amountUsd;
}

export function calculateMining(input: MiningInput): MiningResult {
  const hashpower = clampHashpower(input.hashpower);
  const scale = hashpower / BASELINE.hashpower;
  const term = TERM_FACTORS[input.term];
  const yieldFactor = BTC_FACTORS[input.btc] * DIFFICULTY_FACTORS[input.difficulty];

  const priceUsd = BASELINE.price * scale * term.price;
  const contractUsd = BASELINE.contractPrice * scale * term.price;
  const discountRate = discountFor(hashpower);
  const savedUsd = contractUsd * discountRate;
  const profitUsd = BASELINE.profit * scale * term.profit * yieldFactor;
  const netCost = contractUsd - savedUsd;

  const toCurrency = (usd: number) => convertFromUsd(usd, input.currency);

  return {
    price: toCurrency(priceUsd),
    contractPrice: toCurrency(contractUsd),
    discountRate,
    saved: toCurrency(savedUsd),
    estimatedProfit: toCurrency(profitUsd),
    roi: netCost > 0 ? profitUsd / netCost : 0,
    dailyIncome: toCurrency(BASELINE.daily * scale * yieldFactor),
    weeklyIncome: toCurrency(BASELINE.weekly * scale * yieldFactor),
    monthlyIncome: toCurrency(BASELINE.monthly * scale * yieldFactor),
  };
}

const SYMBOLS: Record<Currency, string> = { USD: "$", EUR: "€", BTC: "₿" };

function formatNumber(value: number, currency: Currency, small = false): string {
  const digits = currency === "BTC" ? (small ? 8 : 6) : 2;
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** "$585.75" / "€538.89" / "₿0.013537" */
export function formatMoney(value: number, currency: Currency): string {
  return `${SYMBOLS[currency]}${formatNumber(value, currency)}`;
}

/** "$785.86 USD" */
export function formatMoneyWithCode(value: number, currency: Currency): string {
  return `${formatMoney(value, currency)} ${currency}`;
}

/** "0.66 USD" (income tiles, no symbol) */
export function formatIncome(value: number, currency: Currency): string {
  return `${formatNumber(value, currency, true)} ${currency}`;
}

export function formatPercent(rate: number, digits = 2): string {
  return `${(rate * 100).toFixed(digits)}%`;
}
