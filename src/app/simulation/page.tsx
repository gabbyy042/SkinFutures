'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Zap, Heart } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

type TimeFrame = 1 | 5 | 10;
type PathType = 'current' | 'care';

export default function SimulationPage() {
  const router = useRouter();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(5);
  const [activePath, setActivePath] = useState<PathType>('current');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('skinData');
    if (data) {
      const parsed = JSON.parse(data);
      setCurrentImage(parsed.image || '');
    }
  }, []);

  // Simulated future images (in production, use image processing)
  const getCurrentPathImage = () => currentImage;
  const getCarePathImage = () => currentImage;

  const getPathDescription = (path: PathType, years: TimeFrame) => {
    if (path === 'current') {
      return {
        title: 'Current Path',
        subtitle: `If habits stay the same`,
        description: `In ${years} ${years === 1 ? 'year' : 'years'}, your skin may show signs of accumulated lifestyle factors`,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      };
    }
    return {
      title: 'Care Path',
      subtitle: 'With consistent skincare',
      description: `In ${years} ${years === 1 ? 'year' : 'years'}, improved habits could help maintain skin health and clarity`,
      color: 'text-green-600',
      bg: 'bg-green-50',
    };
  };

  const pathData = getPathDescription(activePath, timeFrame);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            {showComparison ? 'Single View' : 'Compare'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Title */}
          <div className="p-8 pb-4">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Your Future Skin
            </h1>
            <p className="text-gray-600">
              See how your skin may change over time
            </p>
          </div>

          {/* Time Slider */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">
                Time Frame
              </span>
            </div>
            <div className="flex gap-3">
              {([1, 5, 10] as TimeFrame[]).map((years) => (
                <button
                  key={years}
                  onClick={() => setTimeFrame(years)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    timeFrame === years
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {years} {years === 1 ? 'Year' : 'Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Image Display */}
          {showComparison ? (
            <div className="relative">
              <div className="aspect-square max-h-[500px] relative">
                {currentImage && (
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={getCurrentPathImage()}
                        alt="Current Path"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={getCarePathImage()}
                        alt="Care Path"
                      />
                    }
                    position={50}
                    className="h-full"
                  />
                )}
              </div>
              {/* Labels */}
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Current Path
              </div>
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Care Path
              </div>
            </div>
          ) : (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePath}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-square max-h-[500px] relative overflow-hidden bg-gray-100"
                >
                  {currentImage && (
                    <img
                      src={activePath === 'current' ? getCurrentPathImage() : getCarePathImage()}
                      alt="Skin simulation"
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Path Toggle */}
          {!showComparison && (
            <div className="p-8 pt-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setActivePath('current')}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    activePath === 'current'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Current Path
                </button>
                <button
                  onClick={() => setActivePath('care')}
                  className={`py-3 rounded-xl font-semibold transition-all ${
                    activePath === 'care'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Care Path
                </button>
              </div>

              {/* Path Description */}
              <div className={`${pathData.bg} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-1 ${pathData.color}`}>
                  {pathData.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {pathData.subtitle}
                </p>
                <p className="text-gray-700">
                  {pathData.description}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-8 pt-0 space-y-3">
            <button
              onClick={() => router.push('/routine')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Build My Routine
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Zap className="w-5 h-5" />
              Track Progress
            </button>
          </div>

          {/* Disclaimer */}
          <div className="px-8 pb-8">
            <p className="text-xs text-gray-400 text-center">
              ⚠️ Visual simulation only, not a medical prediction
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}