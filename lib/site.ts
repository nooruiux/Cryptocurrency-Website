export const siteConfig = {
  name: "Lumino",
  title: "Lumino — The Faster, Safer Platform To Mining Bitcoin",
  description:
    "Mine Bitcoin with Lumino: flexible hashpower contracts, live profit calculator, yield farming pools and a mobile wallet. Register for free and get $10 on Bitcoin mining.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://cryptocurrency-website-development.vercel.app")).replace(/\/$/, ""),
} as const;

export const navLinks = [
  { label: "EasyMining", href: "#products" },
  { label: "Plans", href: "#mining-plan" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#control" },
  { label: "Referral", href: "#products" },
  { label: "Help", href: "#contact" },
] as const;
