'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Camera, TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Sparkles className="w-20 h-20 text-primary-500" />
            <div className="absolute inset-0 animate-pulse opacity-50">
              <Sparkles className="w-20 h-20 text-primary-300" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          See Your Skin's <span className="text-primary-600">Future</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-4">
          Discover how your skin may change over time
        </p>

        <p className="text-base text-gray-500 mb-12">
          Visual simulations to motivate better skincare habits
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/onboarding')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Start Your Journey
        </motion.button>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Camera className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Simple Upload</h3>
            <p className="text-sm text-gray-600">
              Take a quick selfie to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Future Paths</h3>
            <p className="text-sm text-gray-600">
              See potential outcomes in 1, 5, 10 years
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Build better habits with visual motivation
            </p>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-xs text-gray-400 max-w-lg mx-auto"
        >
          ⚠️ This app provides visual simulations, NOT medical advice. All predictions are estimates only.
        </motion.p>
      </motion.div>
    </div>
  );
}