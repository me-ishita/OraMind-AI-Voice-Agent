'use client'

import React from 'react'
import AppHeader from './_components/AppHeader'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient("https://sleek-ox-526.convex.cloud")

function DashboardLayout({ children }) {
  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100">
        <AppHeader />
        <div className="p-10 mt-12 md:px-20 lg:px-32 xl:px-56 2xl:px-70">
          {children}
        </div>
      </div>
    </ConvexProvider>
  )
}

export default DashboardLayout
