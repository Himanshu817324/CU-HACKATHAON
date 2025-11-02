'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';

const reports = [
  { id: 1, title: 'Monthly Emission Report - January 2025', date: '2025-01-31', size: '2.4 MB', type: 'PDF' },
  { id: 2, title: 'Quarterly Sustainability Review', date: '2025-01-15', size: '5.1 MB', type: 'PDF' },
  { id: 3, title: 'Weekly Optimization Summary', date: '2025-01-28', size: '890 KB', type: 'PDF' },
];

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-[#34D399]" />
          <h1 className="text-4xl font-bold">Reports</h1>
        </div>
        <p className="text-text-secondary">
          View and download your sustainability reports
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6 border border-white/10 hover:border-[#34D399]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#34D399]/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#34D399]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </div>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
