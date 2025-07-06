'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../_components/AuthForm';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' && localStorage.getItem('user');
    if (storedUser) {
      router.push('/main-dashboard'); // or your new dashboard route
    }
  }, []);

  return <AuthForm type="sign-in" />;
}
