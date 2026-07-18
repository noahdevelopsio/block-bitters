import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginRoute = nextUrl.pathname === "/admin/login";

      if (isAdminRoute && !isLoginRoute) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to admin login page
        return Response.redirect(new URL("/admin/login", nextUrl));
      } else if (isLoginRoute && isLoggedIn) {
        // Redirect already logged-in users away from login page to dashboard
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Configured in lib/auth.ts for non-edge operations
} satisfies NextAuthConfig;
