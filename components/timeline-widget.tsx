import { getTimeline } from "@/lib/timeline";
import TimelineHeatmap from "./timeline-heatmap.client";

export async function TimelineWidget() {
  const { heatmap } = await getTimeline({ range: "3m" });
  return <TimelineHeatmap values={heatmap} />;
}
