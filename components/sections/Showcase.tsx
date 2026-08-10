'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingBag, Smartphone, Globe, Zap, TrendingUp, Star } from 'lucide-react';

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: 'E-Commerce Stores',
      subtitle: 'Shopify & Next.js Commerce',
      description:
        'High-conversion online stores engineered for scale — from product pages to checkout flows, optimized for maximum revenue per visitor.',
      icon: ShoppingBag,
      stats: [
        { value: '4.2x', label: 'Avg. Conversion Lift' },
        { value: '99.9%', label: 'Store Uptime' },
      ],
      accent: 'from-cyan-400 to-blue-500',
      glow: 'glow-cyan',
      features: ['Shopify Plus', 'Next.js Commerce', 'Payment Integration', 'Inventory Sync'],
    },
    {
      title: 'Mobile Apps',
      subtitle: 'iOS & Android Native',
      description:
        'Secure, lightning-fast mobile applications with clean architecture and seamless UX — built to scale from MVP to millions of users.',
      icon: Smartphone,
      stats: [
        { value: '4.9★', label: 'Avg. App Store Rating' },
        { value: '<1s', label: 'App Launch Time' },
      ],
      accent: 'from-fuchsia-400 to-purple-500',
      glow: 'glow-magenta',
      features: ['React Native', 'Push Notifications', 'Offline Support', 'App Store Deploy'],
    },
  ];

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-4">
            <Zap className="h-3.5 w-3.5" />
            What We Build
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            E-Commerce Stores <span className="gradient-text">&</span> Mobile Apps
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            We don't just market — we build. From high-converting online stores to
            secure mobile apps, we engineer the products that drive your growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom highlight bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6"
        >
          {[
            { icon: Globe, label: '50+ Live Websites' },
            { icon: ShoppingBag, label: '20+ Online Stores' },
            { icon: Smartphone, label: '15+ Mobile Apps' },
            { icon: TrendingUp, label: '312% Avg. Growth' },
            { icon: Star, label: '4.9/5 Client Rating' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="h-4 w-4 text-cyan-400" />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className={`gradient-border ${project.glow} rounded-3xl overflow-hidden h-full transition-all duration-300`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${project.accent}`}
            >
              <Icon className="h-7 w-7 text-background" />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.accent} blur-lg opacity-40 -z-10`} />
            </motion.div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{project.subtitle}</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.stats.map((stat: any) => (
              <div key={stat.label} className="rounded-xl bg-secondary/40 border border-border/50 p-4">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature: string) => (
              <motion.span
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          <div className={`mt-6 h-px bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
        </div>
      </div>
    </motion.div>
  );
}
