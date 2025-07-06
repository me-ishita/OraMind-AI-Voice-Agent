import "server-only";
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  loginRedirect: "/dashboard",  // ✅ This ensures the user goes to dashboard after login/signup
});
