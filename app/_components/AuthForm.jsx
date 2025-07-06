'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function AuthForm({ type }) {
  const router = useRouter();
  const signUp = useMutation(api.users.signUp);
  const signIn = useMutation(api.users.signIn);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'sign-up') {
        const result = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          toast.success('Account created! Please sign in.');
          router.push('/handler/sign-in');
        }
      } else {
        const result = await signIn({
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          toast.success('Login successful!');
          localStorage.setItem('user', JSON.stringify(result.user));
          router.push('/main-dashboard');
        }
      }
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  const isSignIn = type === 'sign-in';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100 px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-400 to-blue-500 text-transparent bg-clip-text">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h2>

        {!isSignIn && (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full p-3 bg-white/70 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        )}

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 bg-white/70 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 pr-10 bg-white/70 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? '🔓' : '🔒'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>

        <p className="text-center text-sm text-gray-700/80">
          {isSignIn ? (
            <>
              Don&apos;t have an account?{' '}
              <span
                className="text-purple-700 font-medium cursor-pointer hover:underline"
                onClick={() => router.push('/handler/sign-up')}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-purple-700 font-medium cursor-pointer hover:underline"
                onClick={() => router.push('/handler/sign-in')}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
