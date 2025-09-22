import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function StudioPage() {
  const session = await getServerSession();
  if (!session || (session as any).role !== "admin") {
    return (
      <section className="container py-10">
        <h1 className="text-2xl font-semibold">Studio</h1>
        <p className="text-muted-foreground">Admins only. <Link className="underline" href="/api/auth/signin">Sign in</Link></p>
      </section>
    );
  }
  return (
    <section className="container py-10">
      <h1 className="text-2xl font-semibold">Studio</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link className="border rounded-xl p-4" href="/timeline">Manage Timeline</Link>
        <Link className="border rounded-xl p-4" href="/projects">Manage Projects</Link>
        <Link className="border rounded-xl p-4" href="/blog">Manage Posts</Link>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">Tip: Timeline data ingested via server actions & adapters (mock/live switch with <code>ADAPTER_MODE</code>).</p>
    </section>
  );
}