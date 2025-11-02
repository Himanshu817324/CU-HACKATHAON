'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import HeroInput from './HeroInput';

// Rotating Earth Component
function RotatingEarth() {
  return (
    <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00B87C"
        attach="material"
        roughness={0.5}
        speed={0.5}
        distort={0.1}
        opacity={0.15}
        transparent
      />
    </Sphere>
  );
}

export default function Hero() {
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleNetwork />
        
        {/* 3D Rotating Earth - Subtle background illustration */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 3, 5]} intensity={1} />
              <Stars radius={80} depth={50} count={3000} factor={4} fade />
              <RotatingEarth />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-midnight to-midnight" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-text-secondary">AI-Powered Carbon Analysis</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-text-primary via-primary to-success bg-clip-text text-transparent"
          >
            Analyze. Optimize.
            <br />
            Decarbonize.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Real carbon estimates for your sites and repos — instant insights, code-level fixes, measurable impact.
          </motion.p>

          {/* HeroInput */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <HeroInput onAnalyze={() => setHasAnalyzed(true)} />
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <a
              href="#demo"
              className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors group"
            >
              <span>View Live Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Animated Particle Network Background
function ParticleNetwork() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B87C" />
          <stop offset="100%" stopColor="#FFD166" />
        </linearGradient>
      </defs>
      {[...Array(15)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 400}
          r={2}
          fill="url(#particleGradient)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </svg>
  );
}

