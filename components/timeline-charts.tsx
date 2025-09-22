"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type ChartData = Awaited<ReturnType<typeof import("@/lib/timeline").getTimeline>>;

export function TimelineCharts({ data }: { data: ChartData }) {
  const { radar, stacks, milestones } = data;
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-2xl p-4">
          <h3 className="font-medium mb-2">Skill growth (per quarter)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radar as any}>
              <PolarGrid /><PolarAngleAxis dataKey="skill" /><PolarRadiusAxis />
              <Radar dataKey="score" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="border rounded-2xl p-4">
          <h3 className="font-medium mb-2">Stack shifts</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stacks as any}>
              <XAxis dataKey="q" /><YAxis /><Tooltip />
              <Line dataKey="FE" /><Line dataKey="BE" /><Line dataKey="DevOps" /><Line dataKey="AI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {milestones.map(m => (
          <article key={m.id} className="border rounded-2xl p-4">
            <div className="text-xs opacity-60">{new Date(m.date).toLocaleDateString()} • {m.source.toUpperCase()}</div>
            <h4 className="font-medium mt-1">{m.title}</h4>
            <p className="text-sm text-muted-foreground">{m.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {m.tags.map(t => <span key={t} className="rounded-full bg-accent px-2 py-0.5">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}