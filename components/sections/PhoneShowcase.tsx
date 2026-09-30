import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Figma "Frame 1000007764" (192:1613), rebuilt from its layers instead of a
 * flattened raster. All geometry is in Figma px of the 549×668 frame and is
 * expressed in container units (1 design px = 100cqw / 549), so the group is
 * exact at 549px wide and scales proportionally below that.
 */
const u = (n: number) => `calc(var(--u) * ${n})`;
const box = (left: number, top: number, width: number, height: number): CSSProperties => ({
  position: "absolute",
  left: u(left),
  top: u(top),
  width: u(width),
  height: u(height),
});

/** Ellipse 28 / 29: 1.6486px inside stroke, dash 4.1216 / 3.2973, Base/Grey 80. */
function Orbit({ left, top, width, height }: { left: number; top: number; width: number; height: number }) {
  const sw = 1.6486486196517944;
  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} style={box(left, top, width, height)} className="overflow-visible">
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2 - sw / 2}
        ry={height / 2 - sw / 2}
        fill="none"
        stroke="var(--color-grey-80)"
        strokeWidth={sw}
        strokeDasharray="4.121621608734131 3.297297239303589"
      />
    </svg>
  );
}

function Text({ style, className = "", children }: { style: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <span className={`absolute leading-[normal] whitespace-nowrap ${className}`} style={style}>
      {children}
    </span>
  );
}

const rows = [
  { top: 13.18, logo: "/assets/portfolio/logo-btc.svg", ticker: "BTC", name: "Bitcoin", change: "2.31%", up: true, changeLeft: 92.32 },
  { top: 62.47, logo: "/assets/portfolio/logo-eth.svg", ticker: "ETH", name: "Ethereum", change: "1.80%", up: true, changeLeft: 91.5 },
  { top: 112.02, logo: "/assets/portfolio/logo-usdt.svg", ticker: "USDT", name: "Tether", change: "1.64%", up: false, changeLeft: 91.5 },
];

export function PhoneShowcase() {
  return (
    <div aria-hidden className="absolute inset-0 [--u:calc(100cqw/549)]">
      <Orbit left={23.08} top={27.18} width={353.64} height={352.53} />
      <Orbit left={211.03} top={355} width={313.24} height={313} />

      {/* Card 191:1102 — BTC / ETH / USDT list (sits under the phone) */}
      <div
        className="rounded-[4px] border border-white/4 bg-[rgb(28_59_102/0.32)] shadow-[0_calc(var(--u)*34)_calc(var(--u)*104)_0_rgb(16_16_16/0.85)] backdrop-blur-[calc(var(--u)*5.77)]"
        style={box(328, 28, 156, 160)}
      >
        {rows.map((row) => (
          <div key={row.ticker}>
            <Image src={row.logo} alt="" width={17} height={17} style={box(13.19, row.top, 16.49, 16.47)} />
            <Text style={{ left: u(39.26), top: u(row.top + 0.3), fontSize: u(14) }} className="text-white">
              {row.ticker}
            </Text>
            <Text style={{ left: u(39.26), top: u(row.top + 19), fontSize: u(12) }} className="text-details">
              {row.name}
            </Text>
            <span className="absolute flex items-center" style={{ left: u(row.changeLeft), top: u(row.top), height: u(15.66), gap: u(3.3) }}>
              <Image
                src={row.up ? "/assets/slider/arrow-up.svg" : "/assets/slider/arrow-down.svg"}
                alt=""
                width={20}
                height={20}
                style={{ width: u(13.19), height: u(13.19) }}
              />
              <span
                className={`leading-[normal] font-medium ${row.up ? "text-green-primary" : "text-red-primary"}`}
                style={{ fontSize: u(12) }}
              >
                {row.change}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Rectangle 192:2025 — phone image */}
      <Image
        src="/assets/portfolio/phone.webp"
        alt=""
        width={287}
        height={558}
        sizes="(min-width: 1280px) 287px, 53vw"
        style={box(158, 88, 287, 558)}
      />

      {/* Phone group 191:1101 — coin bubbles + Bitcoin price card */}
      <Image src="/assets/portfolio/bubble-btc.svg" alt="" width={90} height={90} style={box(94.8, 0, 89.34, 89.27)} />
      <Image src="/assets/portfolio/bubble-usdc.svg" alt="" width={47} height={47} style={box(0, 180.39, 46.58, 46.54)} />
      <div
        className="rounded-[4px] border border-white/4 bg-[rgb(28_59_102/0.4)] backdrop-blur-[calc(var(--u)*1.005)]"
        style={box(52.76, 447.26, 173.93, 91.92)}
      >
        {/* Auto-layout 192:1585: column gap 8 at (10.06, 11.74) */}
        <div className="absolute flex flex-col" style={{ left: u(10.06), top: u(11.74), gap: u(8) }}>
          <div className="flex items-start" style={{ gap: u(1) }}>
            <div className="flex items-start" style={{ gap: u(8) }}>
              <Image src="/assets/slider/card-2-logo.svg" alt="" width={44} height={44} style={{ width: u(22.12), height: u(22.1) }} />
              <div className="flex flex-col leading-[normal]" style={{ gap: u(4) }}>
                <span className="text-grey-20" style={{ fontSize: u(12), height: u(12), width: u(40) }}>
                  Bitcoin
                </span>
                <span className="font-semibold whitespace-nowrap text-white" style={{ fontSize: u(14) }}>
                  USD 46,245.20
                </span>
              </div>
            </div>
            <span className="leading-[normal] text-[#9e9e9e]" style={{ fontSize: u(10), height: u(12), width: u(20) }}>
              BTC
            </span>
          </div>
          <div className="flex items-center" style={{ gap: u(18) }}>
            <Image src="/assets/portfolio/asset-graph.svg" alt="" width={96} height={28} style={{ width: u(95.76), height: u(27.12) }} />
            <span className="flex items-center">
              <Image src="/assets/slider/arrow-up.svg" alt="" width={20} height={20} style={{ width: u(10.05), height: u(10.05) }} />
              <span className="leading-[normal] font-medium text-green-primary" style={{ fontSize: u(12), width: u(32), textAlign: "right" }}>
                2.11%
              </span>
            </span>
          </div>
        </div>
      </div>

      <Image src="/assets/portfolio/bubble-eth.svg" alt="" width={47} height={47} style={box(92.32, 332.77, 46.58, 46.54)} />
      <Image src="/assets/portfolio/bubble-ltc.svg" alt="" width={50} height={50} style={box(499.54, 468.67, 49.46, 49.42)} />

      {/* Rectangle 4277 (192:1629): rotated rounded rect, 32% gradient, layer blur 348 (CSS blur 174) */}
      <div className="pointer-events-none flex items-center justify-center" style={box(327.96, 179, 377.43, 377.43)}>
        <div
          className="shrink-0 rotate-[-48.26deg] rounded-full bg-[linear-gradient(187.84deg,rgb(94_252_232/0.32)_12.878%,rgb(115_110_254/0.026)_139.38%)]"
          style={{ width: u(267.319), height: u(267.319), filter: `blur(${u(174)})` }}
        />
      </div>
    </div>
  );
}
