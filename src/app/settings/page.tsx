'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Bell, Lock, Trash2, FileText, Info } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  const handleDeleteData = () => {
    if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      localStorage.clear();
      alert('All data deleted successfully');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Settings</h1>
          <p className="text-gray-600 mb-8">Manage your account and preferences</p>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Account */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Account</h3>
                  <p className="text-sm text-gray-600">Manage your profile</p>
                </div>
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Manage reminders and alerts</p>
                </div>
              </button>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Privacy & Safety</h3>
                  <p className="text-sm text-gray-600">Data and security settings</p>
                </div>
              </button>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Info className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">About</h3>
                  <p className="text-sm text-gray-600">App info and disclaimers</p>
                </div>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-red-50 rounded-2xl border-2 border-red-200 p-6">
            <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-sm text-red-700 mb-4">
              This action cannot be undone. All your data including images and progress will be permanently deleted.
            </p>
            <button
              onClick={handleDeleteData}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Delete All Data
            </button>
          </div>

          {/* Legal */}
          <div className="mt-8 text-center space-y-2">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Terms of Service
            </button>
            <span className="text-gray-400 mx-2">•</span>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </button>
          </div>

          <p className="mt-8 text-xs text-gray-400 text-center">
            SkinFutures v1.0.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}