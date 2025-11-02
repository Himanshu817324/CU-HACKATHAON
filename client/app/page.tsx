'use client';

import { motion } from 'framer-motion';
import { Code, Sparkles, TrendingUp, Target, ArrowRight, Leaf, Trees, Users, BarChart3, CheckCircle2, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

const features = [
  {
    icon: Code,
    title: 'Analyze Any Repo or Website',
    description: 'Get instant carbon estimates for any URL or GitHub repository with AI-powered analysis.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Emission Insights',
    description: 'Deep learning models identify optimization opportunities across code, assets, and infrastructure.',
  },
  {
    icon: TrendingUp,
    title: 'Actionable Optimization Reports',
    description: 'Receive detailed, code-level recommendations with predicted impact metrics.',
  },
  {
    icon: Target,
    title: 'Gamified Eco-Score System',
    description: 'Track your progress with real-time scores and celebrate your sustainability wins.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Scan',
    description: 'Enter your website URL or GitHub repo link',
  },
  {
    step: '02',
    title: 'Analyze',
    description: 'AI models process your code and infrastructure',
  },
  {
    step: '03',
    title: 'Optimize',
    description: 'Get actionable recommendations and track impact',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to decarbonize
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Powerful features designed to help you build sustainable digital products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-xl text-text-secondary">
            Three simple steps to start your sustainability journey
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 border border-black/10 max-w-xs">
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-text-secondary ml-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Environmental Impact Stats */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Environmental Impact
          </h2>
          <p className="text-xl text-text-secondary">
            Making a measurable difference in digital carbon footprint
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-black/10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-linear-to-r from-primary to-success bg-clip-text text-transparent">
              2.5M+
            </div>
            <div className="text-lg text-text-secondary mb-3">Trees Planted Equivalent</div>
            <div className="text-sm text-text-secondary">
              CO₂ emissions prevented across all projects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-black/10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-linear-to-r from-primary to-success bg-clip-text text-transparent">
              12K+
            </div>
            <div className="text-lg text-text-secondary mb-3">Active Users</div>
            <div className="text-sm text-text-secondary">
              Developers committed to sustainable web practices
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8 border border-black/10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-linear-to-r from-primary to-success bg-clip-text text-transparent">
              60%
            </div>
            <div className="text-lg text-text-secondary mb-3">Average Reduction</div>
            <div className="text-sm text-text-secondary">
              Carbon footprint reduction after optimization
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-black/10 mb-6">
              <Trees className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-secondary">Sustainability</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Carbon Crisis in Digital
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              The internet produces approximately 3.7% of global carbon emissions — 
              equivalent to the entire aviation industry. Every website visit, API call, 
              and data transfer consumes energy, mostly from fossil fuels.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <span className="text-text-secondary">
                  Digital pollution is growing 9% annually
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <span className="text-text-secondary">
                  Average website emits 1.76g CO₂ per page view
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                <span className="text-text-secondary">
                  Simple optimizations can reduce emissions by 50-80%
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 border border-black/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10 opacity-50" />
              <div className="relative z-10">
                <Globe className="w-16 h-16 text-primary mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-center">Our Commitment</h3>
                <p className="text-text-secondary text-center leading-relaxed">
                  Help 1 million websites reduce their carbon footprint by 50% 
                  by 2025. Join us in building a more sustainable internet.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-text-secondary">
            Real results from real teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-black/10"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                EC
              </div>
              <div>
                <h4 className="font-semibold text-lg">E-Commerce Giant</h4>
                <p className="text-sm text-text-secondary">Shopping Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-success" />
              <span className="text-2xl font-bold">73% Reduction</span>
            </div>
            <p className="text-text-secondary mb-4">
              "After implementing SustainAI recommendations, we reduced our 
              page load emissions from 4.2g to 1.1g CO₂ per page view. 
              Our 10M monthly visitors now generate less carbon than before."
            </p>
            <div className="pt-4 border-t border-black/10">
              <span className="text-sm text-text-secondary">Saved: ~3.1 tons CO₂/month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-black/10"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                SM
              </div>
              <div>
                <h4 className="font-semibold text-lg">SaaS Platform</h4>
                <p className="text-sm text-text-secondary">B2B Software</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-success" />
              <span className="text-2xl font-bold">65% Reduction</span>
            </div>
            <p className="text-text-secondary mb-4">
              "The AI-powered recommendations were game-changing. We optimized 
              our API responses, switched to green hosting, and implemented lazy 
              loading across our dashboard."
            </p>
            <div className="pt-4 border-t border-black/10">
              <span className="text-sm text-text-secondary">Saved: ~850 kg CO₂/month</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center border border-black/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to reduce your digital footprint?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of developers building sustainable digital products with SustainAI
          </p>
          <motion.a
            href="/analyze"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started for Free
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
