'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sun, Moon, Heart, Droplets, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { validateImageFile, validateLifestyleData } from '@/lib/validation';
import { SecureStorage } from '@/lib/secureStorage';
import { useImageProcessor } from '@/hooks/useImageProcessor';

type LifestyleData = {
  sunExposure: 'low' | 'medium' | 'high' | '';
  sleepQuality: 'poor' | 'fair' | 'good' | '';
  stressLevel: 'low' | 'medium' | 'high' | '';
  skincareConsistency: 'rarely' | 'sometimes' | 'daily' | '';
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { processImage, processing } = useImageProcessor();

  const [lifestyle, setLifestyle] = useState<LifestyleData>({
    sunExposure: '',
    sleepQuality: '',
    stressLevel: '',
    skincareConsistency: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setLoading(true);

    try {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Process image
      const processed = await processImage(file);
      if (!processed) {
        throw new Error('Failed to process image');
      }

      setImageFile(processed.file);
      setImagePreview(processed.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload image';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (step === 1 && imageFile) {
      setError('');
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      setError('');

      try {
        // Validate lifestyle data
        if (!validateLifestyleData(lifestyle)) {
          throw new Error('Please complete all lifestyle questions');
        }

        // Save securely
        SecureStorage.setItem('skinData', {
          lifestyle,
          image: imagePreview,
          timestamp: Date.now(),
        });

        router.push('/analysis');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save data';
        setError(message);
      } finally {
        setLoading(false);
      }
    }
  };

  const isLifestyleComplete = Object.values(lifestyle).every(val => val !== '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 2</span>
            <span className="text-sm font-medium text-primary-600">{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
            />
          </div>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <Camera className="w-12 h-12 text-primary-500 mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Upload Your Selfie
              </h2>
              <p className="text-gray-600 mb-6">
                Take a clear, front-facing photo in good natural lighting
              </p>

              {/* Lighting Tips */}
              <div className="bg-primary-50 border-2 border-primary-100 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-2">📸 Photo Tips:</p>
                    <ul className="space-y-1.5 text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        Face natural light (window/outdoors)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        Avoid harsh shadows
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        Remove makeup if possible
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                        Keep hair away from face
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={loading || processing}
                />
                <div className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all ${
                  imagePreview
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                }`}>
                  {loading || processing ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                      <p className="text-sm text-gray-600">Processing image...</p>
                    </div>
                  ) : imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-64 h-64 object-cover rounded-2xl mx-auto shadow-lg"
                      />
                      <p className="mt-4 text-sm text-gray-600 font-medium">
                        ✓ Photo ready • Tap to change
                      </p>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">
                        Tap to take or upload photo
                      </p>
                      <p className="text-xs text-gray-500">
                        JPEG, PNG, or WebP • Max 10MB
                      </p>
                    </>
                  )}
                </div>
              </label>

              <button
                onClick={handleNext}
                disabled={!imageFile || loading}
                className="w-full mt-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <Heart className="w-12 h-12 text-primary-500 mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Your Lifestyle
              </h2>
              <p className="text-gray-600 mb-8">
                Help us understand your current habits
              </p>

              <div className="space-y-6">
                {/* Sun Exposure */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    Sun Exposure
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLifestyle({ ...lifestyle, sunExposure: level })}
                        className={`py-3.5 rounded-xl font-medium transition-all ${
                          lifestyle.sunExposure === level
                            ? 'bg-primary-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep Quality */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-indigo-500" />
                    Sleep Quality
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['poor', 'fair', 'good'] as const).map((quality) => (
                      <button
                        key={quality}
                        type="button"
                        onClick={() => setLifestyle({ ...lifestyle, sleepQuality: quality })}
                        className={`py-3.5 rounded-xl font-medium transition-all ${
                          lifestyle.sleepQuality === quality
                            ? 'bg-primary-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Stress Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLifestyle({ ...lifestyle, stressLevel: level })}
                        className={`py-3.5 rounded-xl font-medium transition-all ${
                          lifestyle.stressLevel === level
                            ? 'bg-primary-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skincare Consistency */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    Skincare Consistency
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['rarely', 'sometimes', 'daily'] as const).map((frequency) => (
                      <button
                        key={frequency}
                        type="button"
                        onClick={() => setLifestyle({ ...lifestyle, skincareConsistency: frequency })}
                        className={`py-3.5 rounded-xl font-medium transition-all ${
                          lifestyle.skincareConsistency === frequency
                            ? 'bg-primary-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!isLifestyleComplete || loading}
                className="w-full mt-8 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Analyze My Skin
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Notice */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          🔒 Your data is encrypted and stored securely on your device
        </p>
      </div>
    </div>
  );
}