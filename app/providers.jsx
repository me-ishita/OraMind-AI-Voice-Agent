// app/providers.jsx
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/_context/UserContext";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function Providers({ children }) {
  return (
    <UserProvider>
      <ConvexProvider client={convex}>
        {children}
        <Toaster />
      </ConvexProvider>
    </UserProvider>
  );
}
