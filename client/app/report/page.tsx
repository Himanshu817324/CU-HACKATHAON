'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReportPDFPreview from '@/components/ReportPDFPreview';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { mockComparison, mockEmissionData } from '@/lib/mockData';

export default function Report() {
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Emissions Report
            </h1>
            <p className="text-xl text-text-secondary">
              Comprehensive analysis of your project's carbon footprint
            </p>
          </div>

          {/* Report Preview */}
          <div className="mb-12">
            <ReportPDFPreview
              projectName={mockEmissionData.project}
              generatedAt={reportDate}
            />
          </div>

          {/* Comparison */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Before vs After Optimization</h2>
            <BeforeAfterSlider
              beforeValue={mockComparison.before}
              afterValue={mockComparison.after}
              label={mockComparison.label}
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass rounded-2xl p-6 border border-black/10">
              <div className="text-sm text-text-secondary mb-2">Total Savings</div>
              <div className="text-3xl font-bold text-success">
                {(mockComparison.before - mockComparison.after).toFixed(0)} gCO₂
              </div>
              <div className="text-sm text-text-secondary mt-2">Per page load</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-black/10">
              <div className="text-sm text-text-secondary mb-2">Overall Score</div>
              <div className="text-3xl font-bold text-primary">
                {mockEmissionData.score}
                <span className="text-base text-text-secondary">/100</span>
              </div>
              <div className="text-sm text-text-secondary mt-2">Eco rating</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-black/10">
              <div className="text-sm text-text-secondary mb-2">CO₂ Saved</div>
              <div className="text-3xl font-bold text-success">
                {mockEmissionData.co2Saved}
                <span className="text-base text-text-secondary">kg</span>
              </div>
              <div className="text-sm text-text-secondary mt-2">This week</div>
            </div>
          </div>

          {/* Methodology */}
          <div className="glass rounded-2xl p-8 border border-black/10">
            <h2 className="text-2xl font-bold mb-4">Methodology</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Our carbon emission estimates are based on the latest research in digital sustainability,
              including the Green Software Foundation's Software Carbon Intensity (SCI) methodology.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We analyze factors such as server energy consumption, data transfer volumes, third-party scripts,
              and hosting infrastructure to provide accurate, actionable insights for reducing your digital carbon footprint.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

