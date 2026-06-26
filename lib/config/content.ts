export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;

export const TRUSTED_LOGOS = [
  "Helios Health",
  "Quanta Logistics",
  "Bridgewell Finance",
  "Northbeam Retail",
  "Arvo Energy",
  "Latitude Insurance",
  "Cobalt Freight",
  "Meridian Labs",
] as const;

export const STAT_ITEMS = [
  { value: "11ms", label: "median pipeline step latency" },
  { value: "9x", label: "peak load handled without re-provisioning" },
  { value: "87%", label: "manual sync work eliminated" },
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced four internal sync scripts and a part-time contractor with one Solace pipeline. It hasn't gone down once.",
    name: "Priya Raman",
    role: "Head of Data Platform",
    company: "Quanta Logistics",
  },
  {
    quote:
      "The lineage view is the first thing I open when finance asks why a number moved. It just answers the question.",
    name: "Daniel Ortiz",
    role: "VP Engineering",
    company: "Bridgewell Finance",
  },
  {
    quote:
      "Workspace isolation let us onboard a regulated client without touching our existing infrastructure at all.",
    name: "Mei Lin Chen",
    role: "CTO",
    company: "Helios Health",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is pricing actually calculated?",
    answer:
      "Each plan has a base monthly rate. Annual billing applies a flat 20% discount, and your local currency is applied through a regional rate — nothing is a fixed, hardcoded number per region.",
  },
  {
    question: "Can I switch currency or billing cycle without losing my place?",
    answer:
      "Yes. Switching currency or cycle only updates the price figures themselves — the rest of the page, including your scroll position and open panels, stays exactly as it was.",
  },
  {
    question: "What happens to my data if I downgrade?",
    answer:
      "Nothing is deleted. Pipelines beyond your new plan's limits are paused, not removed, and you can reactivate them the moment you upgrade again.",
  },
  {
    question: "Do you support on-premise or VPC deployment?",
    answer:
      "Enterprise plans include a dedicated infrastructure region, including VPC peering and on-premise connectors for regulated environments.",
  },
  {
    question: "Is there a limit on the number of connected sources?",
    answer:
      "Starter includes three. Scale and Enterprise both include unlimited source connections, governed by your workspace's event volume.",
  },
];
