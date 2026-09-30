export const stats = [
  { label: "Total deposits", value: "$8M+" },
  { label: "Total withdraws", value: "$5M+" },
  { label: "Active users", value: "$125k+" },
] as const;

export const features = [
  {
    title: "Fees Cashback",
    icon: "/assets/explore/icon-fees-cashback.svg",
    arrow: "/assets/explore/card-arrow-1.svg",
    description: "Digital currencies introduced new financial tools and their value has grown tremendously over the last.",
  },
  {
    title: "Yield Farming",
    icon: "/assets/explore/icon-yield-farming.svg",
    arrow: "/assets/explore/card-arrow.svg",
    description: "Digital currencies introduced new financial tools and their value has grown tremendously over the last.",
  },
  {
    title: "Referral Programme",
    icon: "/assets/explore/icon-referral.svg",
    arrow: "/assets/explore/card-arrow.svg",
    description: "Digital currencies introduced new financial tools and their value has grown tremendously over the last.",
  },
  {
    title: "Bonus Offer",
    icon: "/assets/explore/icon-bonus.svg",
    arrow: "/assets/explore/card-arrow.svg",
    description: "Digital currencies introduced new financial tools and their value has grown tremendously over the last.",
  },
] as const;

export interface Pool {
  pair: string;
  icon: string;
  /** Rendered size of the pair icon in the design (px). */
  iconWidth: number;
  iconHeight: number;
  apy: string;
  apr: string;
  liquidity: string;
}

export const pools: Pool[] = [
  { pair: "NMX-USDC", icon: "/assets/control/pair-nmx-usdc.svg", iconWidth: 50, iconHeight: 28, apy: "40.75%", apr: "32.40%", liquidity: "$20,340" },
  { pair: "LTC-USDT", icon: "/assets/control/pair-ltc-usdt.svg", iconWidth: 54, iconHeight: 32, apy: "39.25%", apr: "34.40%", liquidity: "$30,340" },
  { pair: "NMX-BUSD", icon: "/assets/control/pair-nmx-busd.svg", iconWidth: 52, iconHeight: 32, apy: "20.75%", apr: "39.40%", liquidity: "$25,340" },
  { pair: "AAVX-USDT", icon: "/assets/control/pair-aavx-usdt.png", iconWidth: 48, iconHeight: 28, apy: "45.75%", apr: "32.40%", liquidity: "$20,340" },
  { pair: "ETH-BNB", icon: "/assets/control/pair-eth-bnb.svg", iconWidth: 48, iconHeight: 28, apy: "75.75%", apr: "52.40%", liquidity: "$60,340" },
  { pair: "DOGE-USDT", icon: "/assets/control/pair-doge-usdt.svg", iconWidth: 48, iconHeight: 28, apy: "40.75%", apr: "35.40%", liquidity: "$42,340" },
  { pair: "SHIB-BNB", icon: "/assets/control/pair-shib-bnb.svg", iconWidth: 48, iconHeight: 28, apy: "39.75%", apr: "75.40%", liquidity: "$20,340" },
  { pair: "MATIC-USDT", icon: "/assets/control/pair-matic-usdt.svg", iconWidth: 44, iconHeight: 28, apy: "29.75%", apr: "32.40%", liquidity: "$70,340" },
];

export interface Asset {
  name: string;
  ticker: string;
  price: string;
  change: string;
  trend: "up" | "down";
  logo: string | null;
  graph: string;
}

export const trendArrow = {
  up: "/assets/slider/arrow-up.svg",
  down: "/assets/slider/arrow-down.svg",
} as const;

export const assets: Asset[] = [
  // In Figma the XRP card's logo layer is hidden, so no logo asset exists for it.
  { name: "Ripple", ticker: "XRP", price: "USD 0.3565", change: "0.69%", trend: "down", logo: null, graph: "/assets/slider/card-1-graph.svg" },
  { name: "Bitcoin", ticker: "BTC", price: "USD 43,270.20", change: "2.16%", trend: "up", logo: "/assets/slider/card-2-logo.svg", graph: "/assets/slider/card-2-graph.svg" },
  { name: "Ethereum", ticker: "ETH", price: "USD 35,231.57", change: "0.32%", trend: "down", logo: "/assets/slider/card-3-logo.svg", graph: "/assets/slider/card-3-graph.svg" },
  { name: "Tether", ticker: "USDT", price: "USD 0.5599", change: "1.34%", trend: "up", logo: "/assets/slider/card-4-logo.svg", graph: "/assets/slider/card-4-graph.svg" },
  // Card 5 reuses the same "Market / Graph 7" component instance as card 2 in Figma.
  { name: "Binance", ticker: "BTC", price: "USD 56,240.20", change: "2.11%", trend: "up", logo: "/assets/slider/card-5-logo.svg", graph: "/assets/slider/card-2-graph.svg" },
];

export const footerLinks = ["EasyMining", "Plans", "Calculator", "Referral", "Help"] as const;

export const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: "/assets/footer/social-facebook.svg" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "/assets/footer/social-linkedin.svg" },
  { label: "Twitter", href: "https://twitter.com", icon: "/assets/footer/social-twitter.svg" },
  { label: "Instagram", href: "https://instagram.com", icon: "/assets/footer/social-instagram.svg" },
] as const;
