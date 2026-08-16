'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Code2, Megaphone, ShoppingBag, Smartphone } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const stats = [
    { value: '312%', label: 'Avg. Organic Traffic Growth', icon: TrendingUp },
    { value: '4.8x', label: 'Average ROAS on Paid Ads', icon: Megaphone },
    { value: '99.9%', label: 'Uptime on Stores & Apps', icon: Code2 },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        style={{ y: yOrb1 }}
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <motion.div
        style={{ y: yOrb2 }}
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-purple-500/15 blur-[100px]"
      />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Now accepting new projects for Q3 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          We Engineer
          <br />
          <span className="gradient-text neon-text-cyan">Digital Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Zelvio is a full-stack digital agency that fuses data-driven marketing
          with cutting-edge engineering — SEO, paid media, e-commerce stores,
          and mobile apps under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(190 100% 50% / 0.5)' }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-400 to-fuchsia-500 px-8 py-4 text-base font-semibold text-background shadow-xl shadow-cyan-500/30"
          >
            <Sparkles className="h-5 w-5" />
            Get a Free Audit
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-base font-medium text-foreground hover:border-cyan-500/50 transition-colors"
          >
            See Our Work
          </motion.a>
        </motion.div>

        {/* Quick highlight badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {[
            { icon: ShoppingBag, label: 'E-Commerce Stores' },
            { icon: Smartphone, label: 'Mobile Apps' },
            { icon: Code2, label: 'Websites' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card/30 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground"
            >
              <item.icon className="h-3.5 w-3.5 text-cyan-400" />
              {item.label}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="gradient-border rounded-2xl p-6 text-left"
            >
              <stat.icon className="h-6 w-6 text-cyan-400 mb-3" />
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
