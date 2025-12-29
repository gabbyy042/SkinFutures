'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sun, Moon, Plus, Check, ArrowLeft, Save } from 'lucide-react';

type RoutineStep = {
  id: string;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen';
  timeOfDay: 'am' | 'pm';
  label: string;
};

const AVAILABLE_STEPS: Omit<RoutineStep, 'id'>[] = [
  { category: 'cleanser', timeOfDay: 'am', label: 'Morning Cleanser' },
  { category: 'toner', timeOfDay: 'am', label: 'Morning Toner' },
  { category: 'serum', timeOfDay: 'am', label: 'Morning Serum' },
  { category: 'moisturizer', timeOfDay: 'am', label: 'Morning Moisturizer' },
  { category: 'sunscreen', timeOfDay: 'am', label: 'Sunscreen (Essential!)' },
  { category: 'cleanser', timeOfDay: 'pm', label: 'Evening Cleanser' },
  { category: 'toner', timeOfDay: 'pm', label: 'Evening Toner' },
  { category: 'serum', timeOfDay: 'pm', label: 'Evening Serum' },
  { category: 'moisturizer', timeOfDay: 'pm', label: 'Evening Moisturizer' },
];

export default function RoutinePage() {
  const router = useRouter();
  const [selectedSteps, setSelectedSteps] = useState<RoutineStep[]>([]);

  const toggleStep = (step: Omit<RoutineStep, 'id'>) => {
    const exists = selectedSteps.find(
      s => s.category === step.category && s.timeOfDay === step.timeOfDay
    );

    if (exists) {
      setSelectedSteps(selectedSteps.filter(s => s !== exists));
    } else {
      setSelectedSteps([
        ...selectedSteps,
        { ...step, id: `${step.timeOfDay}-${step.category}` }
      ]);
    }
  };

  const isSelected = (step: Omit<RoutineStep, 'id'>) => {
    return selectedSteps.some(
      s => s.category === step.category && s.timeOfDay === step.timeOfDay
    );
  };

  const handleSave = () => {
    localStorage.setItem('routine', JSON.stringify(selectedSteps));
    router.push('/dashboard');
  };

  const amSteps = AVAILABLE_STEPS.filter(s => s.timeOfDay === 'am');
  const pmSteps = AVAILABLE_STEPS.filter(s => s.timeOfDay === 'pm');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          {selectedSteps.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedSteps.length} steps selected
            </span>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Build Your Routine
          </h1>
          <p className="text-gray-600 mb-8">
            Select up to 4 steps for morning and evening
          </p>

          {/* Morning Routine */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Morning Routine
              </h2>
            </div>

            <div className="space-y-3">
              {amSteps.map((step) => {
                const selected = isSelected(step);
                return (
                  <button
                    key={`${step.timeOfDay}-${step.category}`}
                    onClick={() => toggleStep(step)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      selected
                        ? 'bg-primary-50 border-2 border-primary-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <span className={`font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>
                      {step.label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selected
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Routine */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="w-6 h-6 text-indigo-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Evening Routine
              </h2>
            </div>

            <div className="space-y-3">
              {pmSteps.map((step) => {
                const selected = isSelected(step);
                return (
                  <button
                    key={`${step.timeOfDay}-${step.category}`}
                    onClick={() => toggleStep(step)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      selected
                        ? 'bg-primary-50 border-2 border-primary-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <span className={`font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>
                      {step.label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selected
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={selectedSteps.length === 0}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Routine
          </button>
        </motion.div>
      </div>
    </div>
  );
}