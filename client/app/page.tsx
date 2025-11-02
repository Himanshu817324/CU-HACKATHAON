'use client';

import { motion } from 'framer-motion';
import { Code, Sparkles, TrendingUp, Target, ArrowRight, Leaf, Trees, Users, BarChart3, CheckCircle2, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { ScrollReveal, staggerContainer, fadeInUp } from '@/lib/scrollAnimations';

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
      <section className="container mx-auto px-6 py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
        </div>

        <ScrollReveal variant="fadeInUp" className="relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Features</span>
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary to-success bg-clip-text text-transparent">
              Everything you need to decarbonize
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Powerful features designed to help you build sustainable digital products
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-24 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent relative">
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary to-success bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Three simple steps to start your sustainability journey
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center relative">
          {howItWorks.map((item, index) => (
            <ScrollReveal
              key={index}
              variant="scaleIn"
              delay={index * 0.15}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-3xl p-10 border border-black/10 max-w-xs bg-white/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-7xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
              {index < howItWorks.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 z-10"
                >
                  <ArrowRight className="w-10 h-10 text-primary/40" />
                </motion.div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Environmental Impact Stats */}
      <section className="container mx-auto px-6 py-24 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-success/5 to-primary/5 opacity-50" />
        
        <ScrollReveal variant="fadeInUp" className="text-center mb-16 relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-success/20 mb-6"
          >
            <Leaf className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Impact Metrics</span>
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-success to-primary bg-clip-text text-transparent">
            Real Environmental Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Making a measurable difference in digital carbon footprint
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10"
        >
          {[
            { icon: Leaf, value: '2.5M+', label: 'Trees Planted Equivalent', desc: 'CO₂ emissions prevented across all projects' },
            { icon: Users, value: '12K+', label: 'Active Users', desc: 'Developers committed to sustainable web practices' },
            { icon: Zap, value: '60%', label: 'Average Reduction', desc: 'Carbon footprint reduction after optimization' },
          ].map((stat, index) => (
            <ScrollReveal
              key={index}
              variant="fadeInUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-3xl p-10 border border-black/10 text-center bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Animated gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-success/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 mb-6 group-hover:from-primary/30 group-hover:to-success/30 transition-all"
                  >
                    <stat.icon className="w-10 h-10 text-primary" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    className="text-6xl font-bold mb-3 bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg font-semibold text-text-primary mb-3">{stat.label}</div>
                  <div className="text-sm text-text-secondary leading-relaxed">{stat.desc}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </section>

      {/* Why It Matters */}
      <section className="container mx-auto px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-success/3" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto relative z-10">
          <ScrollReveal variant="slideInLeft">
            <motion.div
              whileHover={{ x: 8 }}
              className="relative"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
                <Trees className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Sustainability</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent">
                The Carbon Crisis in Digital
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                The internet produces approximately 3.7% of global carbon emissions — 
                equivalent to the entire aviation industry. Every website visit, API call, 
                and data transfer consumes energy, mostly from fossil fuels.
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  'Digital pollution is growing 9% annually',
                  'Average website emits 1.76g CO₂ per page view',
                  'Simple optimizations can reduce emissions by 50-80%',
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start space-x-3 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                    </motion.div>
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                      {fact}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="slideInRight">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-10 border border-black/10 relative overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-success/10 to-primary/10 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 mb-6 mx-auto"
                  >
                    <Globe className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    Our Commitment
                  </h3>
                  <p className="text-text-secondary text-center leading-relaxed text-lg">
                    Help 1 million websites reduce their carbon footprint by 50% 
                    by 2025. Join us in building a more sustainable internet.
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-6 py-24 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent relative">
        <ScrollReveal variant="fadeInUp" className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
          >
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary to-success bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Real results from real teams
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              initials: 'EC',
              title: 'E-Commerce Giant',
              subtitle: 'Shopping Platform',
              reduction: '73% Reduction',
              quote: '"After implementing SustainAI recommendations, we reduced our page load emissions from 4.2g to 1.1g CO₂ per page view. Our 10M monthly visitors now generate less carbon than before."',
              saved: '~3.1 tons CO₂/month',
            },
            {
              initials: 'SM',
              title: 'SaaS Platform',
              subtitle: 'B2B Software',
              reduction: '65% Reduction',
              quote: '"The AI-powered recommendations were game-changing. We optimized our API responses, switched to green hosting, and implemented lazy loading across our dashboard."',
              saved: '~850 kg CO₂/month',
            },
          ].map((story, index) => (
            <ScrollReveal
              key={index}
              variant="fadeInUp"
              delay={index * 0.15}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className="glass rounded-3xl p-10 border border-black/10 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start space-x-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg"
                    >
                      {story.initials}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-lg text-text-primary mb-1">{story.title}</h4>
                      <p className="text-sm text-text-secondary">{story.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BarChart3 className="w-6 h-6 text-success" />
                    </motion.div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                      {story.reduction}
                    </span>
                  </div>
                  <p className="text-text-secondary mb-6 leading-relaxed italic">
                    {story.quote}
                  </p>
                  <div className="pt-6 border-t border-black/10">
                    <span className="text-sm font-medium text-success">Saved: {story.saved}</span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-success/10 to-primary/10" />
        
        <ScrollReveal variant="scaleIn" className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-3xl p-16 text-center border border-black/10 bg-white/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 mb-8 mx-auto"
              >
                <Leaf className="w-10 h-10 text-primary" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary to-success bg-clip-text text-transparent">
                Ready to reduce your digital footprint?
              </h2>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers building sustainable digital products with SustainAI
              </p>
              <motion.a
                href="/analyze"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-success text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Get Started for Free</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
