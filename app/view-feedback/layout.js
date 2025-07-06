'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient('https://sleek-ox-526.convex.cloud');

export default function FeedbackLayout({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
