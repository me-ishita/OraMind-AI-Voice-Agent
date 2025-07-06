'use client';

import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { ExpertsList } from '@/services/Options';
import Image from 'next/image';
import UserInputDialog from './UserInputDialog';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProfileDialog from './ProfileDialog';
import { motion } from 'framer-motion';

function FeatureAssistants() {
  const [user, setUser] = useState(null);


  // ✅ Fetch user from Convex using email
  const dbUser = useQuery(api.users.getUserByEmail, {
    email: user?.email || '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 bg-opacity-10 backdrop-blur-md p-10 rounded-3xl shadow-xl"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-medium text-white/80">My WorkSpace</h2>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-300 to-indigo-300 text-transparent bg-clip-text">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-300 to-indigo-300 text-transparent bg-clip-text font-extrabold">
              {user?.name || 'Guest'}
            </span>
          </h2>

          <p className="mt-2 text-white/70 font-medium max-w-2xl drop-shadow-sm">
            Let’s explore your personalized AI voice coaching assistant. Choose
            your expert, speak, learn, and grow — at your own pace!
          </p>
        </div>

        {/*<ProfileDialog>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition-transform">
            Profile
          </Button>
        </ProfileDialog>*/}
      </div>

      {/* Coaching Options */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-5 gap-8 mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {ExpertsList.map((option, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <UserInputDialog coachingOption={option}>
              <div
                className="p-6 h-44 w-full rounded-3xl flex flex-col justify-center items-center cursor-pointer 
                 hover:scale-105 transition-all duration-300 ease-in-out 
                 bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100"
                style={{
                  boxShadow: '0 12px 30px rgba(128, 0, 128, 0.2)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={80}
                  height={80}
                  className="mb-3"
                />
                <h2 className="text-center font-semibold text-gray-800 drop-shadow-md">
                  {option.name}
                </h2>
              </div>
            </UserInputDialog>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center mt-20 text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      >
        <span className="bg-gradient-to-r from-pink-500 via-purple-300 to-indigo-300 text-transparent bg-clip-text font-semibold">
          Ready to learn !!
        </span>{' '}
        <span className="bg-gradient-to-r from-blue-500 via-cyan-300 to-indigo-300 text-transparent bg-clip-text font-semibold">
          Our Mentors are here to guide you
        </span>{' '}
        <span className="bg-gradient-to-r from-purple-500 via-pink-300 to-indigo-300 text-transparent bg-clip-text font-semibold">
          — Start from anywhere and grow with real-time feedback.
        </span>{' '}
      </motion.div>
    </motion.div>
  );
}

export default FeatureAssistants;
