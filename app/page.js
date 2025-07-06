'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner';

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showExploreBox, setShowExploreBox] = useState(false)



  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user) // Proper check
  }, [])

  const handleGetStarted = () => {
    const user = localStorage.getItem('user')
    if (user) {
      setShowExploreBox(true)
    } else {
      router.push('/handler/sign-in')
    }
  }

  const handleExplore = () => {
  const user = localStorage.getItem('user');
  if (user) {
    router.push('/main-dashboard');
  } else {
    router.push('/handler/sign-in');
  }
};


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* ✅ Background Image with darker translucent overlay and subtle blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>



      {/* ✅ Foreground Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center mb-4"
        >
          <Image
            src="/icon.jpg"
            alt="ORAMIND Logo"
            width={100}
            height={100}
            className="rounded-full shadow-2xl border-3 border-white"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-blue-600 text-transparent bg-clip-text ml-6 tracking-wide drop-shadow-lg">
            ORAMIND
          </h1>
        </motion.div>

        {/* Tagline */}
        <div className="flex gap-4 mt-2 mb-2">
          {['Speak.', 'Learn.', 'Grow.'].map((word, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              className="text-3xl bg-gradient-to-r from-purple-500 via-pink-300 to-indigo-300 text-transparent bg-clip-text font-semibold"
            >
              {word}
            </motion.p>
          ))}
        </div>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="text-md md:text-lg text-cyan-400 max-w-xl mb-6"
        >
          Your AI-Powered Personalized Voice Coaching Expert — transforming how you speak and grow with confidence.
        </motion.p>

        {/* Get Started */}
        {!showExploreBox && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition"
          >
            Get Started
          </motion.button>
        )}

        {/* Explore Box */}
        <AnimatePresence>
          {showExploreBox && (
            <motion.div
              className="mt-6 p-8 bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-md border border-white/20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 drop-shadow-sm">
                Ready to Explore?
              </h3>
              <p className="text-gray-800 mb-5 leading-relaxed">
                Dive into your personalized coaching dashboard powered by AI voice intelligence.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExplore}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition font-medium tracking-wide"
              >
                Explore Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
