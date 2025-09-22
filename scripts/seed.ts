import { db } from "@/lib/db";
import { projects, experience as expTable, timelineEvents, badges, posts as postsTable } from "@/drizzle/schema";

async function run() {
  // Projects
  await db.insert(projects).values([
    {
      slug: "ecowatch-water-quality",
      title: "EcoWatch — Water Quality Visualizer",
      blurb: "Lake monitoring dashboard (React + QGIS + serverless) built with Agile over 8 months.",
      stack: ["Next.js", "React", "QGIS", "Tailwind", "Neon", "Drizzle"],
      impact: { users: 1200, datasets: 48 },
      links: { repo: "https://github.com/safecorndiet", demo: "#" },
      images: []
    },
    {
      slug: "resume-as-a-service",
      title: "Resume-as-a-Service",
      blurb: "Google Sheets → LaTeX → GitHub Actions to auto-generate tailored resumes.",
      stack: ["Actions", "LaTeX", "Sheets", "Node"],
      impact: { resumes: 150, timeSavedHours: 40 },
      links: { repo: "https://github.com/safecorndiet/ras", demo: "#" },
      images: []
    }
  ]).onConflictDoNothing({ target: projects.slug });

  // Experience
  await db.insert(expTable).values([
    {
      company: "U-Links Centre for Community-Based Research",
      role: "Software Developer — Capstone",
      start: new Date("2024-09-01"),
      end: new Date("2025-04-30"),
      highlights: ["Built water quality visualizer", "Agile delivery", "Stakeholder demos"],
      tools: ["React", "QGIS", "Tailwind", "GitHub"]
    }
  ]);

  // Posts
  await db.insert(postsTable).values([
    { slug: "shipping-faster-with-edge", tags: ["DevOps","Edge"], publishedAt: new Date("2025-05-10") },
    { slug: "ai-notes-vector-search", tags: ["AI"], publishedAt: new Date("2025-06-01") },
    { slug: "trading-automation", tags: ["Automation","Finance"], publishedAt: new Date("2025-07-08") }
  ]).onConflictDoNothing({ target: postsTable.slug });

  // Timeline milestones
  const now = new Date();
  await db.insert(timelineEvents).values([
    { date: new Date(now.getFullYear(), now.getMonth()-1, 12), type:"milestone", title:"Shipped EcoWatch MVP", description:"First public demo with real datasets.", source:"custom", tags:["FE","DevOps"], metrics:{}, links:[] },
    { date: new Date(now.getFullYear(), now.getMonth()-2, 5), type:"course", title:"Completed ‘LLM Engineering’", description:"Covered RAG, evals, and safety.", source:"courses", tags:["AI"], metrics:{hours:12}, links:[] },
    { date: new Date(now.getFullYear(), now.getMonth()-3, 20), type:"commit", title:"Merged OSS PR: drizzle-orm docs", description:"Improved Neon recipe.", source:"github", tags:["BE","DevOps"], metrics:{prs:1}, links:[] },
    { date: new Date(now.getFullYear(), now.getMonth()-4, 3), type:"blog", title:"AI Notes: Vector Search", description:"How pgvector pipelines work.", source:"blog", tags:["AI"], metrics:{reads:400}, links:[] },
    { date: new Date(now.getFullYear(), now.getMonth()-5, 18), type:"cert", title:"AWS Cloud Practitioner", description:"Core AWS services and security.", source:"courses", tags:["DevOps"], metrics:{}, links:[] }
  ]);

  // Badges
  await db.insert(badges).values([
    { slug: "streak-7", title:"7-day Streak", criteria:"7 consecutive days activity", earnedAt: new Date() },
    { slug: "first-oss-pr", title:"First OSS PR", criteria:"Opened & merged first PR", earnedAt: new Date(now.getFullYear(), now.getMonth()-3, 20) }
  ]).onConflictDoNothing({ target: badges.slug });

  console.log("Seeded demo data ✓");
}
run();