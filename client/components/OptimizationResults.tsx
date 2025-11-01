'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface OptimizationData {
  fileName: string;
  problemDescription: string;
  problematicCode: string;
  problematicCodeOptimized: string;
}

const mockOptimizationData: OptimizationData[] = [
  {
    fileName: "auth.js",
    problemDescription: "Inefficient user authentication logic using nested callbacks.",
    problematicCode: `function login(user, pass) {
  getUser(user, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      checkPassword(pass, data.password, function(err, valid) {
        if (valid) {
          console.log("Login successful");
        }
      });
    }
  });
}`,
    problematicCodeOptimized: `async function login(user, pass) {
  try {
    const data = await getUser(user);
    const valid = await checkPassword(pass, data.password);
    if (valid) console.log("Login successful");
  } catch (err) {
    console.error(err);
  }
}`
  },
  {
    fileName: "dataProcessor.js",
    problemDescription: "Manual loops instead of modern array methods.",
    problematicCode: `const result = [];
for (let i = 0; i < numbers.length; i++) {
  result.push(numbers[i] * 2);
}`,
    problematicCodeOptimized: `const result = numbers.map(num => num * 2);`
  },
  {
    fileName: "apiHandler.js",
    problemDescription: "Sequential fetch calls without async/await handling.",
    problematicCode: `fetch('/user')
  .then(res => res.json())
  .then(user => {
    fetch('/posts?user=' + user.id)
      .then(res => res.json())
      .then(posts => console.log(posts));
  });`,
    problematicCodeOptimized: `const getUserAndPosts = async () => {
  const user = await (await fetch('/user')).json();
  const posts = await (await fetch('/posts?user=' + user.id)).json();
  console.log(posts);
};`
  }
];

export default function OptimizationResults() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [optimizedFiles, setOptimizedFiles] = useState<Set<number>>(new Set());
  const [showProgress, setShowProgress] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setShowProgress(true);
    
    // Random delay between 3-5 seconds
    const delay = Math.random() * 2000 + 3000;
    
    setTimeout(() => {
      // Reveal optimized code blocks one by one with staggered animation
      mockOptimizationData.forEach((_, index) => {
        setTimeout(() => {
          setOptimizedFiles(prev => new Set(prev).add(index));
          
          // Check if all files are optimized
          if (index === mockOptimizationData.length - 1) {
            setTimeout(() => {
              setIsOptimizing(false);
              setIsComplete(true);
              setShowProgress(false);
            }, 300);
          }
        }, index * 400);
      });
    }, delay);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 md:p-8 border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#34D399] to-[#38BDF8] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#071428]" />
        </div>
        <h2 className="text-2xl font-bold">AI Code Optimization Report</h2>
      </div>

      {/* Progress Text */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-center gap-2 text-[#38BDF8]"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <p className="text-sm font-medium">Analyzing your code efficiency…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-900/20 border border-green-500/30"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-sm font-medium text-green-300">Optimization Complete</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Cards */}
      <div className="space-y-6 mb-8">
        {mockOptimizationData.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-5 border border-white/10"
          >
            {/* File Name Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#34D399]" />
              <h3 className="text-lg font-semibold text-[#34D399]">{file.fileName}</h3>
            </div>

            {/* Problem Description */}
            <p className="text-sm text-text-secondary mb-4">{file.problemDescription}</p>

            {/* Problematic Code Block */}
            <div className="mb-4">
              <div className="text-xs text-red-300 mb-2 font-medium">Problematic Code</div>
              <div className="code-block-container bg-red-900/20 text-red-300 border-l-4 border-red-500 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                  }}
                  codeTagProps={{
                    style: {
                      color: '#fca5a5',
                    }
                  }}
                >
                  {file.problematicCode}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Optimized Code Block - Animated Reveal */}
            <AnimatePresence>
              {optimizedFiles.has(index) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="text-xs text-green-300 mb-2 font-medium">Optimized Code</div>
                  <div className="code-block-container bg-green-900/20 text-green-300 border-l-4 border-green-500 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                      }}
                      codeTagProps={{
                        style: {
                          color: '#86efac',
                        }
                      }}
                    >
                      {file.problematicCodeOptimized}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Optimize Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="px-8 py-4 bg-gradient-to-r from-[#34D399] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#34D399] text-[#071428] font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-[#34D399]/20"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Optimizing...</span>
            </>
          ) : isComplete ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Optimization Complete</span>
            </>
          ) : (
            <span>Optimize Now</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

