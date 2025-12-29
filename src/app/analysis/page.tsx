'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';

type TrendType = 'improving' | 'stable' | 'at-risk';

export default function AnalysisPage() {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const [trend, setTrend] = useState<TrendType>('stable');
  const [skinMetrics, setSkinMetrics] = useState({
    texture: 72,
    tone: 68,
    clarity: 75,
  });

  useEffect(() => {
    // Simulate analysis
    setTimeout(() => {
      // Get data from localStorage
      const data = localStorage.getItem('skinData');
      if (data) {
        const parsed = JSON.parse(data);
        // Simple rule-based logic
        const score = calculateScore(parsed.lifestyle);
        setTrend(score > 70 ? 'improving' : score < 50 ? 'at-risk' : 'stable');
        setSkinMetrics({
          texture: score + Math.random() * 10 - 5,
          tone: score + Math.random() * 10 - 5,
          clarity: score + Math.random() * 10 - 5,
        });
      }
      setAnalyzing(false);
    }, 3000);
  }, []);

  const calculateScore = (lifestyle: any) => {
    let score = 60;

    if (lifestyle.sunExposure === 'low') score += 10;
    if (lifestyle.sunExposure === 'high') score -= 10;

    if (lifestyle.sleepQuality === 'good') score += 10;
    if (lifestyle.sleepQuality === 'poor') score -= 10;

    if (lifestyle.stressLevel === 'low') score += 10;
    if (lifestyle.stressLevel === 'high') score -= 10;

    if (lifestyle.skincareConsistency === 'daily') score += 15;
    if (lifestyle.skincareConsistency === 'rarely') score -= 15;

    return Math.max(0, Math.min(100, score));
  };

  const getTrendConfig = () => {
    switch (trend) {
      case 'improving':
        return {
          icon: TrendingUp,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Improving',
          description: 'Your current habits support healthy skin'
        };
      case 'at-risk':
        return {
          icon: TrendingDown,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          label: 'At Risk',
          description: 'Small changes could improve your skin health'
        };
      default:
        return {
          icon: Minus,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Stable',
          description: 'Your skin is maintaining its current state'
        };
    }
  };

  const config = getTrendConfig();
  const TrendIcon = config.icon;

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-20 h-20 text-primary-500" />
            </motion.div>
            <div className="absolute inset-0 animate-pulse">
              <Sparkles className="w-20 h-20 text-primary-300 opacity-50" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Skin...
          </h2>
          <p className="text-gray-600">
            This will take just a moment
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Your Skin Snapshot
          </h1>

          {/* Trend Indicator */}
          <div className={`${config.bg} ${config.border} border-2 rounded-xl p-6 mb-6`}>
            <div className="flex items-center gap-3 mb-2">
              <TrendIcon className={`w-8 h-8 ${config.color}`} />
              <div>
                <h3 className={`text-xl font-bold ${config.color}`}>
                  {config.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {config.description}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4 mb-8">
            {Object.entries(skinMetrics).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 capitalize">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-primary-600">
                    {Math.round(value)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/simulation')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            See Your Future
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center">
          ⚠️ Visual simulation only, not medical advice
        </p>
      </div>
    </div>
  );
}