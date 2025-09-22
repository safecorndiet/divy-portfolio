import { TimelineCharts } from "@/components/timeline-charts";
import { TimelineFilters } from "@/components/timeline-filters";
import { getTimeline } from "@/lib/timeline";

export const dynamic = "force-dynamic";

export default async function TimelinePage({ searchParams }: { searchParams: Record<string,string|undefined> }) {
  const tag = searchParams.tag ?? "all";
  const range = (searchParams.range as "3m"|"6m"|"12m") ?? "6m";
  const source = searchParams.source ?? "all";
  const compare = searchParams.compare ?? "off";

  const data = await getTimeline({ tag, range, source, compare: compare === "on" });

  return (
    <section className="container py-10 timeline-focus">
      <h1 className="text-3xl font-semibold">Learning Timeline</h1>
      <p className="text-muted-foreground mb-6">Unified activity across GitHub, courses, certifications, blogs, and milestones.</p>
      <TimelineFilters />
      <TimelineCharts data={data} />
    </section>
  );
}