'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const creditPackages = [
  { id: 1, credits: 50, price: 4.99, popular: false },
  { id: 2, credits: 100, price: 9.99, popular: true },
  { id: 3, credits: 500, price: 39.99, popular: false },
  { id: 4, credits: 1000, price: 69.99, popular: false },
];

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  const { user, addCredits } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = async (credits: number) => {
    setPurchasing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add credits to user
    addCredits(credits);
    setPurchasing(false);
    setPurchased(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-3xl p-8 border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#34D399] to-[#38BDF8] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#071428]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Get More Credits</h2>
                    <p className="text-text-secondary">Purchase credits to continue analyzing</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Current Balance */}
              {user && (
                <div className="glass rounded-2xl p-6 border border-white/10 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary mb-2">Current Balance</p>
                      <div className="flex items-center gap-3">
                        <Coins className="w-6 h-6 text-accent" />
                        <span className="text-3xl font-bold">{user.credits}</span>
                        <span className="text-lg text-text-secondary">credits</span>
                      </div>
                    </div>
                    <motion.div
                      animate={user.credits < 20 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-3 h-3 rounded-full ${user.credits < 20 ? 'bg-danger' : 'bg-success'}`}
                    />
                  </div>
                </div>
              )}

              {/* Success Message */}
              <AnimatePresence>
                {purchased && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-4 rounded-xl bg-success/20 border border-success/30 flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-success font-semibold">Credits added successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Credit Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {creditPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`relative glass rounded-2xl p-6 border ${
                      pkg.popular 
                        ? 'border-[#34D399]/50 bg-gradient-to-br from-[#34D399]/10 to-transparent' 
                        : 'border-white/10'
                    } cursor-pointer transition-all`}
                    onClick={() => !purchasing && handlePurchase(pkg.credits)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#34D399] text-[#071428] text-xs font-bold">
                        POPULAR
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-8 h-8 text-accent" />
                        <span className="text-4xl font-bold">{pkg.credits}</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-4">credits</p>
                      <div className="text-3xl font-bold">
                        ${pkg.price}
                        <span className="text-lg text-text-secondary font-normal">/one-time</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-2">
                        ${(pkg.price / pkg.credits).toFixed(2)} per credit
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={purchasing}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-[#071428]'
                          : 'bg-primary text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {purchasing ? 'Processing...' : 'Purchase Now'}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Info Section */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  How Credits Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Website Analysis</p>
                    <p>Costs 5 credits per analysis</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">GitHub Analysis</p>
                    <p>Costs 10 credits per analysis</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Credits Never Expire</p>
                    <p>Use them at your own pace</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Demo Mode</p>
                    <p>This is a demo - credits are free!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

