'use client';

import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CreditBadge from './CreditBadge';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Analyze', href: '/analyze' },
  { name: 'Reports', href: '/report' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold bg-linear-to-r from-primary to-success bg-clip-text text-transparent">
              SustainAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            {user && (
              <CreditBadge credits={user.credits} />
            )}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-6 py-2 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors font-medium"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <div className="py-2">
                <CreditBadge credits={user.credits} />
              </div>
            )}
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-primary text-white rounded-2xl"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

