import Image from "next/image";
import Link from "next/link";
import { TimelineWidget } from "@/components/timeline-widget";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <section className="container py-16">
      <div className="grid gap-8 md:grid-cols-[auto,1fr] items-center">
        <Image src="/avatar.jpg" alt="Divy Shah" width={140} height={140} className="rounded-2xl" />
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Divy Shah</h1>
          <p className="text-lg text-muted-foreground">
            Software Engineering • DevOps • AI/ML • Automation — building fast systems & learning out loud.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="rounded-xl bg-foreground text-background px-4 py-2" href="/timeline">View Learning Timeline</Link>
            <a className="rounded-xl border px-4 py-2" href="/Divy_Shah_Resume.pdf" download>Download Resume</a>
          </div>
        </div>
      </div>

      <div className="mt-14">
        {/* Mini timeline widget for last 90 days */}
        <TimelineWidget />
      </div>
    </section>
  );
}