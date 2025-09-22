import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Email from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import * as schema from "@/drizzle/schema";

const handler = NextAuth({
  adapter: DrizzleAdapter(db, { usersTable: schema.users, accountsTable: schema.accounts, sessionsTable: schema.sessions, verificationTokensTable: schema.verificationTokens }),
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.emails.send({
          from: process.env.RESEND_FROM || (provider.from as string),
          to: [identifier],
          subject: "Sign in to Divy — Studio",
          text: `Sign in link:\n${url}`
        });
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || (user.email === process.env.ADMIN_EMAIL ? "admin" : "user");
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role;
      return session;
    }
  }
});
export { handler as GET, handler as POST };