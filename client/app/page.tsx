'use client';

import { motion } from 'framer-motion';
import { Code, Sparkles, TrendingUp, Target, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ImpactBadge from '@/components/ImpactBadge';
import { mockComparison } from '@/lib/mockData';

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
              <div className="glass rounded-2xl p-8 border border-white/10 max-w-xs">
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

      {/* Interactive Demo */}
      <section id="demo" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See the impact
          </h2>
          <p className="text-xl text-text-secondary">
            Drag the slider to see real-time optimization results
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <BeforeAfterSlider
            beforeValue={mockComparison.before}
            afterValue={mockComparison.after}
            label={mockComparison.label}
          />
        </div>

        <div className="flex justify-center gap-4">
          <ImpactBadge label="A+" value={312} trend={[400, 350, 320, 312]} />
          <ImpactBadge label="Before" value={820} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center border border-white/10"
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
