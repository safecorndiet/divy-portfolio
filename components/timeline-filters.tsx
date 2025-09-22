"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function TimelineFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    p.set(key, value);
    router.replace(`/timeline?${p.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select className="border rounded-xl px-3 py-2" defaultValue={params.get("range") ?? "6m"} onChange={(e) => setParam("range", e.target.value)}>
        <option value="3m">3m</option><option value="6m">6m</option><option value="12m">12m</option>
      </select>
      <select className="border rounded-xl px-3 py-2" defaultValue={params.get("tag") ?? "all"} onChange={(e) => setParam("tag", e.target.value)}>
        <option value="all">All tags</option><option value="AI">AI</option><option value="DevOps">DevOps</option><option value="FE">FE</option><option value="BE">BE</option><option value="Finance">Finance</option>
      </select>
      <select className="border rounded-xl px-3 py-2" defaultValue={params.get("source") ?? "all"} onChange={(e) => setParam("source", e.target.value)}>
        <option value="all">All sources</option><option value="github">GitHub</option><option value="leetcode">LeetCode</option><option value="courses">Courses</option><option value="blog">Blog</option>
      </select>
      <label className="text-sm flex items-center gap-2">
        <input type="checkbox" defaultChecked={params.get("compare") === "on"} onChange={(e) => setParam("compare", e.target.checked ? "on" : "off")} />
        Compare periods (Q-by-Q)
      </label>
    </div>
  );
}