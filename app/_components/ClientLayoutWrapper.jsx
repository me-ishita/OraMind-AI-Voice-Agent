// app/_components/ClientLayoutWrapper.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientLayoutWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    // do something on client side
  }, []);

  return <>{children}</>;
}
