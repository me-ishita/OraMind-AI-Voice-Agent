"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";

function Provider({children}) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <Suspense fallback = {<p>Loading...</p>}>
        <ConvexProvider client={convex}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ConvexProvider>
    </Suspense>
  )
}

export default Provider