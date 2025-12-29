'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, TrendingUp, Sun, Droplets, Wind, ArrowRight, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [glowScore, setGlowScore] = useState(0);
  const [weather, setWeather] = useState({
    uv: 'medium',
    humidity: 'normal',
    pollution: 'low',
  });

  useEffect(() => {
    // Load user progress
    const routine = localStorage.getItem('routine');
    if (routine) {
      // Simulate streak
      setStreak(Math.floor(Math.random() * 30));
      setGlowScore(65 + Math.floor(Math.random() * 25));
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Track your skin journey</p>
          </div>
          <button
            onClick={() => router.push('/settings')}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Glow Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-xl p-8 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Your Glow Score</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-6xl font-bold">{glowScore}</span>
            <span className="text-3xl opacity-75 pb-2">/100</span>
          </div>
          <p className="text-primary-100">
            Keep up the consistency to improve your score!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900">Current Streak</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">{streak}</span>
              <span className="text-xl text-gray-600 pb-1">days</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {streak > 7 ? 'Amazing consistency! 🔥' : 'Build your streak!'}
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Trend</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-600">Improving</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Your habits are on the right track
            </p>
          </motion.div>
        </div>

        {/* Weather Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Today's Skin Weather
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Sun className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">UV Index</span>
                  <span className="text-sm font-medium text-orange-600 uppercase">
                    {weather.uv}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Sunscreen recommended for extended outdoor activities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Humidity</span>
                  <span className="text-sm font-medium text-blue-600 uppercase">
                    {weather.humidity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Good moisture levels for skin today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Wind className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">Air Quality</span>
                  <span className="text-sm font-medium text-green-600 uppercase">
                    {weather.pollution}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Clean air quality - great day for skin
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/simulation')}
            className="bg-white hover:bg-gray-50 rounded-2xl shadow-lg p-6 text-left transition-colors"
          >
            <Sparkles className="w-8 h-8 text-primary-500 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">View Future</h4>
            <p className="text-sm text-gray-600">See your skin predictions</p>
          </button>

          <button
            onClick={() => router.push('/routine')}
            className="bg-white hover:bg-gray-50 rounded-2xl shadow-lg p-6 text-left transition-colors"
          >
            <Calendar className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">My Routine</h4>
            <p className="text-sm text-gray-600">Update your steps</p>
          </button>
        </div>
      </div>
    </div>
  );
}