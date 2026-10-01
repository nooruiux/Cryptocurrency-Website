"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import {
  BTC_SCENARIOS,
  CURRENCIES,
  DEFAULT_INPUT,
  DIFFICULTY_SCENARIOS,
  HASHPOWER_MAX,
  HASHPOWER_MIN,
  HASHPOWER_PRESETS,
  TERMS,
  calculateMining,
  clampHashpower,
  formatIncome,
  formatMoney,
  formatMoneyWithCode,
  formatPercent,
  type BtcScenario,
  type Currency,
  type DifficultyScenario,
  type Term,
} from "@/lib/mining";

const currencyOptions = CURRENCIES.map((c) => ({ value: c, label: c }));

/** Figma "Mining Plan" (157:184) — fully interactive, driven by lib/mining.ts. */
export function MiningPlan() {
  const [term, setTerm] = useState<Term>(DEFAULT_INPUT.term);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_INPUT.currency);
  const [hashpower, setHashpower] = useState<number>(DEFAULT_INPUT.hashpower);
  const [draft, setDraft] = useState<string>(String(DEFAULT_INPUT.hashpower));
  const [btc, setBtc] = useState<BtcScenario>(DEFAULT_INPUT.btc);
  const [difficulty, setDifficulty] = useState<DifficultyScenario>(DEFAULT_INPUT.difficulty);

  const ids = useId();
  const panelId = `${ids}-panel`;
  const hashId = `${ids}-hash`;
  const btcLabelId = `${ids}-btc`;
  const diffLabelId = `${ids}-diff`;

  const result = useMemo(
    () => calculateMining({ term, currency, hashpower, btc, difficulty }),
    [term, currency, hashpower, btc, difficulty],
  );

  const commitHashpower = (next: number) => {
    const clamped = clampHashpower(next);
    setHashpower(clamped);
    setDraft(String(clamped));
  };

  const onDraftChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "").slice(0, 4);
    setDraft(digits);
    const parsed = Number(digits);
    if (digits !== "" && parsed >= HASHPOWER_MIN && parsed <= HASHPOWER_MAX) setHashpower(parsed);
  };

  const rows = [
    { label: "Contract Price", value: formatMoneyWithCode(result.contractPrice, currency) },
    { label: "Discount on Volume", value: formatPercent(result.discountRate) },
    { label: "Saved", value: formatMoneyWithCode(result.saved, currency) },
  ];

  const income = [
    { label: "Daily Income", value: result.dailyIncome },
    { label: "Weekly Income", value: result.weeklyIncome },
    { label: "Monthly", value: result.monthlyIncome },
  ];

  return (
    <section id="mining-plan" aria-labelledby="mining-title" data-section="mining" className="container-lumino mt-16 scroll-mt-8 md:mt-[88px] lg:mt-[120px]">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <h2
          id="mining-title"
          className="text-fluid-h3 font-display font-bold tracking-[0.2px] text-white"
        >
          Setup Your <span className="text-mint">Mining Plan</span> Right Now
        </h2>
        <p className="max-w-[570px] text-base leading-6 sm:leading-[26px] tracking-[0.08px] text-white/64">
          Digital currencies introduced new financial tools and their value has grown tremendously over the last few
          years. There&apos;s never been a better time.
        </p>
      </Reveal>

      <Reveal className="mt-10 rounded-[20px] bg-white/4 px-5 pt-6 pb-8 sm:px-8 lg:mt-14 lg:px-12 lg:pt-8 lg:pb-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-12 xl:gap-[120px]">
          {/* Plan configurator */}
          <div className="flex w-full flex-col gap-10 lg:w-[397px] lg:shrink-0">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-12">
                  <Tabs label="Contract duration" items={TERMS} value={term} onChange={setTerm} panelId={panelId} idPrefix={`${ids}-term`} />
                  <div
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={`${ids}-term-${term}`}
                    className="flex flex-col items-center gap-5"
                  >
                    <p className="text-[32px] leading-[normal] font-semibold tracking-[0.16px] text-white" aria-live="polite">
                      <span className="sr-only">Plan price: </span>
                      {formatMoney(result.price, currency)}
                    </p>
                    <OptionGroup
                      label="Currency"
                      options={currencyOptions}
                      value={currency}
                      onChange={setCurrency}
                      className="w-full gap-3 sm:w-auto sm:gap-6"
                      optionClassName="px-4 sm:px-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={hashId} className="font-inder text-lg leading-7 tracking-[0.09px] text-white">
                    Hashpower, TH/s
                  </label>
                  <div className="relative flex h-14 w-full items-stretch rounded-[4px] border border-white/24 focus-within:border-mint">
                    <input
                      id={hashId}
                      type="text"
                      inputMode="numeric"
                      role="spinbutton"
                      aria-valuemin={HASHPOWER_MIN}
                      aria-valuemax={HASHPOWER_MAX}
                      aria-valuenow={hashpower}
                      value={draft}
                      onChange={(event) => onDraftChange(event.target.value)}
                      onBlur={() => commitHashpower(Number(draft) || HASHPOWER_MIN)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowUp") {
                          event.preventDefault();
                          commitHashpower(hashpower + 1);
                        } else if (event.key === "ArrowDown") {
                          event.preventDefault();
                          commitHashpower(hashpower - 1);
                        } else if (event.key === "Enter") {
                          commitHashpower(Number(draft) || HASHPOWER_MIN);
                        }
                      }}
                      className="w-full min-w-0 flex-1 bg-transparent text-center font-display text-xl leading-[normal] font-semibold tracking-[0.1px] text-white outline-none"
                    />
                    <span aria-hidden className="my-px w-[1.4px] bg-white/24" />
                    {/* Desktop: stacked halves over the Figma stepper glyph. Below lg the
                        same glyph is split into two side-by-side 44×56 touch targets. */}
                    <div className="relative flex w-16 shrink-0 items-center justify-center max-lg:w-[88px]">
                      <Image src="/assets/mining/stepper.svg" alt="" width={24} height={24} className="pointer-events-none max-lg:hidden" />
                      <button
                        type="button"
                        aria-label="Decrease hashpower"
                        aria-controls={hashId}
                        disabled={hashpower <= HASHPOWER_MIN}
                        onClick={() => commitHashpower(hashpower - 1)}
                        className="absolute inset-x-0 bottom-0 h-1/2 rounded-br-[4px] hover:bg-white/4 disabled:opacity-40 max-lg:static max-lg:flex max-lg:h-full max-lg:w-11 max-lg:items-center max-lg:justify-center max-lg:rounded-none"
                      >
                        <span aria-hidden className="hidden h-3 w-6 overflow-hidden max-lg:block">
                          <Image src="/assets/mining/stepper.svg" alt="" width={24} height={24} className="-mt-3 max-w-none" />
                        </span>
                      </button>
                      <button
                        type="button"
                        aria-label="Increase hashpower"
                        aria-controls={hashId}
                        disabled={hashpower >= HASHPOWER_MAX}
                        onClick={() => commitHashpower(hashpower + 1)}
                        className="absolute inset-x-0 top-0 h-1/2 rounded-tr-[4px] hover:bg-white/4 disabled:opacity-40 max-lg:static max-lg:flex max-lg:h-full max-lg:w-11 max-lg:items-center max-lg:justify-center max-lg:rounded-r-[4px]"
                      >
                        <span aria-hidden className="hidden h-3 w-6 overflow-hidden max-lg:block">
                          <Image src="/assets/mining/stepper.svg" alt="" width={24} height={24} className="max-w-none" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 max-sm:flex-wrap" role="group" aria-label="Hashpower presets">
                {HASHPOWER_PRESETS.map((preset) => (
                  <Chip key={preset} label={`${preset} TH/s`} pressed={hashpower === preset} onClick={() => commitHashpower(preset)} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <dl className="flex flex-col gap-4 leading-[normal]" aria-live="polite">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <dt className="text-base font-medium tracking-[0.08px] text-white/80">{row.label}</dt>
                    <dd className="text-lg font-semibold tracking-[0.09px] text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <span aria-hidden className="h-px w-full bg-white/12" />
              <dl className="flex items-center justify-between gap-4 leading-[normal]">
                <dt className="text-base font-medium tracking-[0.08px] text-white/80">Estimate Profit</dt>
                <dd className="text-2xl font-semibold tracking-[0.12px] text-mint" aria-live="polite">
                  {formatMoneyWithCode(result.estimatedProfit, currency)}
                </dd>
              </dl>
            </div>
          </div>

          <span aria-hidden className="h-px w-full shrink-0 bg-white/12 lg:h-[518px] lg:w-px" />

          {/* Profit calculator */}
          <div id="calculator" className="flex scroll-mt-24 flex-col items-center gap-8 lg:min-w-0">
            <Image
              src="/assets/mining/profit-illustration.webp"
              alt="Bitcoin coin orbited by Ethereum, Litecoin and Dogecoin"
              width={190}
              height={186}
              className="h-[186px] w-[190px]"
            />
            <div className="flex w-full flex-col gap-14">
              <div className="flex flex-col items-center gap-10">
                <h3 className="text-[28px] leading-[normal] font-medium tracking-[0.16px] text-white sm:text-[32px]">Profit Calculator</h3>
                <div className="flex w-full flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p id={btcLabelId} className="font-inder text-lg leading-7 tracking-[0.09px] text-white">
                      BTC Price, USD
                    </p>
                    <OptionGroup
                      label="BTC price"
                      labelledBy={btcLabelId}
                      options={BTC_SCENARIOS}
                      value={btc}
                      onChange={setBtc}
                      className="gap-3 sm:gap-8 lg:gap-3 xl:gap-8"
                      optionClassName="px-3 sm:px-10 lg:px-5 xl:px-10"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p id={diffLabelId} className="font-inder text-lg leading-7 tracking-[0.09px] text-white">
                      Mining Difficulty
                    </p>
                    <OptionGroup
                      label="Mining difficulty"
                      labelledBy={diffLabelId}
                      options={DIFFICULTY_SCENARIOS}
                      value={difficulty}
                      onChange={setDifficulty}
                      className="gap-3 sm:gap-8 lg:gap-3 xl:gap-8"
                      optionClassName="px-3 sm:px-10 lg:px-5 xl:px-10"
                    />
                  </div>
                </div>
              </div>
              <dl className="flex items-center gap-6 leading-[normal]">
                <dt className="text-base font-medium tracking-[0.08px] text-white/80">Estimate ROI</dt>
                <dd className="text-2xl font-semibold tracking-[0.12px] text-mint" aria-live="polite">
                  {Math.round(result.roi * 100)}%
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 xl:flex xl:gap-[136px]" aria-live="polite">
          {income.map((item) => (
            <div
              key={item.label}
              className="flex h-[88px] flex-col items-center justify-center gap-2 rounded-lg bg-white/8 px-6 py-4 leading-[normal] xl:px-[72px]"
            >
              <dt className="flex items-center gap-3 text-base font-medium tracking-[0.08px] whitespace-nowrap text-white/80">
                <Image src="/assets/mining/wave.svg" alt="" width={18} height={6} className="h-[5.4px] w-[17.4px]" />
                {item.label}
              </dt>
              <dd className="text-lg font-semibold tracking-[0.09px] whitespace-nowrap text-white">{formatIncome(item.value, currency)}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
