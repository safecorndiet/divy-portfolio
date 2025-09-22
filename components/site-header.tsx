"use client";
import Link from "next/link";
import { useTheme } from "next-themes";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b">
      <div className="container flex items-center h-14 justify-between">
        <Link href="/" className="font-semibold">Divy</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/experience">Experience</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/timeline">Timeline</Link>
          <Link href="/now">Now</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/hire-me" className="font-medium">Hire Me</Link>
        </nav>
        <button className="border rounded-xl px-2 py-1 text-xs" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "Light" : "Dark"}</button>
      </div>
    </header>
  );
}