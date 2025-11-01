'use client';

import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 glass mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">SustainAI</span>
            </div>
            <p className="text-text-secondary mb-4 max-w-md">
              Empowering a greener digital future with AI-powered carbon emission analysis and optimization.
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>This site saved 0.18kg CO₂ this week.</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><Link href="/dashboard" className="hover:text-text-primary">Dashboard</Link></li>
              <li><Link href="/analyze" className="hover:text-text-primary">Analyze</Link></li>
              <li><Link href="/report" className="hover:text-text-primary">Reports</Link></li>
              <li><Link href="#" className="hover:text-text-primary">Methodology</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><Link href="#" className="hover:text-text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-text-primary">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © 2024 SustainAI. Made for hackathons with 💚
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

