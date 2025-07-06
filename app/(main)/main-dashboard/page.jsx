'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FeatureAssistants from './_components/FeatureAssistants';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' && localStorage.getItem('user');
    if (!storedUser) {
      router.push('/handler/sign-in');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100">
      <FeatureAssistants />
    </div>
  );
}
