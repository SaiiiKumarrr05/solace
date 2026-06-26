export interface BentoItem {
  id: string;
  title: string;
  description: string;
  metric: { value: string; label: string };
  icon: "chart-pie" | "cog" | "cube" | "arrow-trending-up" | "arrow-path" | "link";
  /** Grid span on desktop, expressed as Tailwind classes for the bento cell. */
  span: string;
}

export const BENTO_ITEMS: BentoItem[] = [
  {
    id: "ingest",
    title: "Unified ingestion",
    description:
      "Pull from 200+ sources into one typed schema. No brittle scripts, no nightly batch jobs — every record lands normalized and queryable in seconds.",
    metric: { value: "200+", label: "native connectors" },
    icon: "link",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "agents",
    title: "Agent pipelines",
    description:
      "Compose retrieval, transformation, and decisioning steps into a single agent graph that runs on a schedule or in response to events.",
    metric: { value: "11ms", label: "median step latency" },
    icon: "cog",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lineage",
    title: "Full data lineage",
    description:
      "Every transformation is traced end to end, so you can answer exactly why a number changed — down to the source record.",
    metric: { value: "100%", label: "field-level traceability" },
    icon: "chart-pie",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "scale",
    title: "Elastic compute",
    description:
      "Pipelines scale horizontally the moment volume spikes, then scale back down. You're billed for what actually ran.",
    metric: { value: "9x", label: "peak-to-baseline scale" },
    icon: "arrow-trending-up",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "sync",
    title: "Bi-directional sync",
    description:
      "Write decisions back to source systems automatically, with conflict resolution rules you control.",
    metric: { value: "87%", label: "manual sync work removed" },
    icon: "arrow-path",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "isolation",
    title: "Workspace isolation",
    description:
      "Every workspace runs in its own logical boundary — separate credentials, separate compute, separate audit trail.",
    metric: { value: "0", label: "shared infrastructure leaks" },
    icon: "cube",
    span: "md:col-span-1 md:row-span-1",
  },
];
