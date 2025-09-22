export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Divy Shah · Built with Next.js, Bun, Drizzle, Neon · Toronto, Canada
      </div>
    </footer>
  );
}