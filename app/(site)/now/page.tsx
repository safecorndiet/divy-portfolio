export const revalidate = 1800;

export default function NowPage() {
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-semibold">Now</h1>
      <p className="text-muted-foreground">What I’m learning this month.</p>
      <div className="mt-6 space-y-3 text-sm">
        <p>• Deepening knowledge in AI and LLM engineering.</p>
        <p>• Building automation tools to streamline workflows.</p>
        <p>• Preparing for interviews and contributing to open source.</p>
      </div>
    </section>
  );
}