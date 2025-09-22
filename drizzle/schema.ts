import { pgTable, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  role: varchar("role", { length: 16 }).default("user")
});

export const accounts = pgTable("accounts", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  access_token: text("access_token"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  refresh_token: text("refresh_token"),
  expires_at: integer("expires_at")
}, (t) => ({ pk: { columns: [t.provider, t.providerAccountId], isPrimaryKey: true } }));

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull()
});

export const verificationTokens = pgTable("verificationTokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull()
}, (t) => ({ pk: { columns: [t.identifier, t.token], isPrimaryKey: true } }));

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  title: text("title").notNull(),
  blurb: text("blurb").notNull(),
  stack: jsonb("stack").$type<string[]>().notNull().default([]),
  impact: jsonb("impact").$type<Record<string, number>>().default({}),
  links: jsonb("links").$type<{ repo?: string; demo?: string }>().default({}),
  images: jsonb("images").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow()
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  start: timestamp("start").notNull(),
  end: timestamp("end"),
  highlights: jsonb("highlights").$type<string[]>().default([]),
  tools: jsonb("tools").$type<string[]>().default([])
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  tags: jsonb("tags").$type<string[]>().default([]),
  publishedAt: timestamp("publishedAt").notNull()
});

export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  source: varchar("source", { length: 32 }).notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  metrics: jsonb("metrics").$type<Record<string, number>>().default({}),
  links: jsonb("links").$type<string[]>().default([])
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  title: text("title").notNull(),
  criteria: text("criteria").notNull(),
  earnedAt: timestamp("earnedAt")
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 16 }).notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  embedding: text("embedding").notNull()
});