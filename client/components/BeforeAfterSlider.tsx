'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeValue: number;
  afterValue: number;
  label: string;
}

export default function BeforeAfterSlider({ beforeValue, afterValue, label }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const x = useMotionValue(0);
  const percentage = useTransform(x, [-200, 200], [0, 100]);
  
  const currentValue = useTransform(
    percentage,
    [0, 100],
    [beforeValue, afterValue]
  );

  const handleDrag = (event: any, info: any) => {
    const containerWidth = event.currentTarget.parentElement?.offsetWidth || 400;
    const position = (info.point.x / containerWidth) * 100;
    const clampedPosition = Math.max(0, Math.min(100, position));
    setSliderPosition(clampedPosition);
  };

  const improvement = ((beforeValue - afterValue) / beforeValue) * 100;

  return (
    <div className="relative w-full">
      <div className="glass rounded-2xl p-8 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{label}</h3>
          <div className="text-right">
            <motion.div className="text-3xl font-bold text-primary">
              {Math.round(currentValue.get())}
              <span className="text-sm text-text-secondary ml-1">gCO₂</span>
            </motion.div>
            <div className="text-sm text-success">
              {improvement > 0 && `↓ ${improvement.toFixed(0)}% improvement`}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-danger to-primary"
            style={{ width: '100%' }}
          />
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-primary cursor-grab active:cursor-grabbing shadow-lg"
            style={{ left: '50%', x }}
            initial={{ x: 0 }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4 text-sm text-text-secondary">
          <div>
            <div className="font-semibold text-text-primary">Before</div>
            <div>{beforeValue} gCO₂/page</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-text-primary">After</div>
            <div>{afterValue} gCO₂/page</div>
          </div>
        </div>
      </div>
    </div>
  );
}

