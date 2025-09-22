"use client";

import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export type HeatmapPoint = { date: string | Date; count: number };

export default function TimelineHeatmap({ values }: { values: HeatmapPoint[] }) {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 3);

  return (
    <div className="rounded-2xl border p-5">
      <h2 className="text-lg font-medium mb-2">Last 90 Days</h2>
      <Heatmap
        startDate={start}
        endDate={end}
        values={values.map(d => ({ date: d.date, count: d.count }))}
        classForValue={(v) => !v ? "color-empty" : `color-scale-${Math.min(4, Math.max(1, v.count))}`}
      />
      <style jsx global>{`
        .color-empty { fill: hsl(var(--muted)); }
        .color-scale-1 { fill: #c7d2fe }
        .color-scale-2 { fill: #a5b4fc }
        .color-scale-3 { fill: #818cf8 }
        .color-scale-4 { fill: #6366f1 }
      `}</style>
    </div>
  );
}
