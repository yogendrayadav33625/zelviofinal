'use client';

import { motion } from 'framer-motion';

type LogoProps = {
  size?: number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
};

export default function Logo({ size = 36, className = '', showText = true, animated = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={animated ? { rotate: [0, -8, 8, 0], scale: 1.1 } : undefined}
        transition={{ duration: 0.6 }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="zelvio-grad-main" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
            <linearGradient id="zelvio-grad-inner" x1="10" y1="10" x2="38" y2="38">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
            <filter id="zelvio-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer hexagon */}
          <motion.path
            d="M24 2 L42 12 L42 36 L24 46 L6 36 L6 12 Z"
            stroke="url(#zelvio-grad-main)"
            strokeWidth="2"
            fill="hsl(240 20% 6%)"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
            animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Inner Z shape */}
          <motion.path
            d="M16 14 L32 14 L16 34 L32 34"
            stroke="url(#zelvio-grad-inner)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#zelvio-glow)"
            initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
            animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
          />

          {/* Accent dot */}
          <motion.circle
            cx="32"
            cy="14"
            r="2.5"
            fill="#e879f9"
            initial={animated ? { scale: 0 } : undefined}
            animate={animated ? { scale: 1 } : undefined}
            transition={{ delay: 1.3, type: 'spring', stiffness: 400 }}
          />
        </svg>

        {/* Glow halo */}
        <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 blur-md -z-10" />
      </motion.div>

      {showText && (
        <span className="text-xl font-bold tracking-tight gradient-text">Zelvio</span>
      )}
    </div>
  );
}
