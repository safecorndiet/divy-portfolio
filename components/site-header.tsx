"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-foreground">
          Divy
        </Link>
        <nav
          className="flex items-center gap-5"
          role="navigation"
          aria-label="Primary"
        >
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/experience"
          >
            Experience
          </Link>
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/timeline"
          >
            Timeline
          </Link>
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/now"
          >
            Now
          </Link>
          <Link
            className="text-sm text-foreground underline underline-offset-4 hover:no-underline"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
            href="/hire-me"
          >
            Hire Me
          </Link>
        </nav>
        <button
          className="border rounded-xl px-2 py-1 text-xs text-foreground"
          onClick={() =>
            mounted && setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          aria-label="Toggle theme"
        >
          {mounted ? (resolvedTheme === "dark" ? "Light" : "Dark") : "Theme"}
        </button>
      </div>
    </header>
  );
}
