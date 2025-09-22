import Link from "next/link";

async function fetchRepo(owner: string, repo: string) {
  const headers: HeadersInit = { "User-Agent": "divy-portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json() as Promise<{ stargazers_count: number; html_url: string; description: string; pushed_at: string }>;
}

export async function RepoCard({ owner, repo }: { owner: string; repo: string }) {
  const data = await fetchRepo(owner, repo);
  if (!data) return null;
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <Link href={data.html_url} className="font-medium" target="_blank">{owner}/{repo}</Link>
        <span className="text-xs">★ {data.stargazers_count}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{data.description}</p>
      <div className="text-xs opacity-70 mt-2">Last commit: {new Date(data.pushed_at).toLocaleDateString()}</div>
    </div>
  );
}