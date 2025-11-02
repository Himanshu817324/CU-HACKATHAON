'use client';

import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-[#34D399]" />
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
        <p className="text-text-secondary">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-[#34D399]" />
            <h2 className="text-xl font-bold">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#34D399] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34D399]"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-[#34D399]" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#34D399] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34D399]"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#34D399]" />
            <h2 className="text-xl font-bold">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 rounded-lg border border-white/10 hover:border-[#34D399]/30 transition-colors text-left">
              Change Password
            </button>
            <button className="w-full py-2 px-4 rounded-lg border border-white/10 hover:border-[#34D399]/30 transition-colors text-left">
              Two-Factor Authentication
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
