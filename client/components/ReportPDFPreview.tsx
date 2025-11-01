'use client';

import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle } from 'lucide-react';

interface ReportPDFPreviewProps {
  reportUrl?: string;
  projectName: string;
  generatedAt: string;
}

export default function ReportPDFPreview({ projectName, generatedAt }: ReportPDFPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 border border-white/10"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{projectName} - Emissions Report</h3>
            <p className="text-sm text-text-secondary">Generated: {generatedAt}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Ready</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">A+</div>
            <div className="text-xs text-text-secondary">Overall Grade</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">312</div>
            <div className="text-xs text-text-secondary">gCO₂/page</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">-62%</div>
            <div className="text-xs text-text-secondary">Potential Savings</div>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <motion.a
        href="#"
        download
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
      >
        <Download className="w-5 h-5" />
        <span>Download PDF Report</span>
      </motion.a>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
          How this was calculated →
        </a>
      </div>
    </motion.div>
  );
}

