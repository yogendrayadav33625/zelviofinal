'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  Rocket,
  Search,
  Gauge,
  KeyRound,
  Map,
  Target,
  Megaphone,
  DollarSign,
  Users,
  Code2,
  ShieldCheck,
  Layers,
} from 'lucide-react';

type Service = {
  title: string;
  description: string;
  icon: React.ElementType;
  features: { label: string; icon: React.ElementType }[];
  accent: string;
  glow: string;
  delay: number;
  iconColor: string;
};

const services: Service[] = [
  {
    title: 'SEO & Performance Dominance',
    description:
      'Engineer sustained organic traffic growth through technical SEO, site speed optimization, and precision keyword strategy built for Google crawling at scale.',
    icon: TrendingUp,
    accent: 'from-cyan-400 to-blue-500',
    glow: 'glow-cyan',
    delay: 0,
    iconColor: 'text-cyan-400',
    features: [
      { label: 'Technical SEO Audits', icon: Search },
      { label: 'Site Speed Optimization', icon: Gauge },
      { label: 'Keyword Research', icon: KeyRound },
      { label: 'Sitemaps & Crawling', icon: Map },
    ],
  },
  {
    title: 'Paid Advertising & PPC Engines',
    description:
      'Maximize return on ad spend with high-ROI Google Ads, Meta Ads across Facebook & Instagram, intelligent budget optimization, and real-time lead tracking.',
    icon: BarChart3,
    accent: 'from-fuchsia-400 to-purple-500',
    glow: 'glow-magenta',
    delay: 0.1,
    iconColor: 'text-fuchsia-400',
    features: [
      { label: 'Google Ads Management', icon: Target },
      { label: 'Meta Ads (FB & IG)', icon: Megaphone },
      { label: 'Budget Optimization', icon: DollarSign },
      { label: 'Lead Generation Trackers', icon: Users },
    ],
  },
  {
    title: 'Next-Gen Web & App Development',
    description:
      'Ship lightning-fast Next.js websites and secure mobile applications with clean code, robust architecture, and modern frameworks built to scale.',
    icon: Rocket,
    accent: 'from-purple-400 to-indigo-500',
    glow: 'glow-purple',
    delay: 0.2,
    iconColor: 'text-purple-400',
    features: [
      { label: 'Next.js Websites', icon: Code2 },
      { label: 'Secure Mobile Apps', icon: ShieldCheck },
      { label: 'Clean Code Practices', icon: Layers },
      { label: 'Robust Architecture', icon: Rocket },
    ],
  },
];

export default function MainServices() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-sm text-fuchsia-300 mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Core <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Three pillars of engineered growth — each one a complete engine for
            driving traffic, conversions, and digital excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: service.delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className={`gradient-border ${service.glow} group-hover:${service.glow} rounded-3xl overflow-hidden h-full transition-all duration-300`}>
        <div className="p-8 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileInView={{ scale: [0.8, 1.1, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: service.delay + 0.2 }}
            className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent}`}
          >
            <Icon className="h-8 w-8 text-background" />
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} blur-lg opacity-40 -z-10`} />
          </motion.div>

          <h3 className="text-xl font-bold mb-3 leading-tight">{service.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Feature pills */}
          <div className="mt-auto space-y-2">
            {service.features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2 text-sm border border-border/50"
                >
                  <FeatureIcon className={`h-4 w-4 ${service.iconColor} flex-shrink-0`} />
                  <span className="text-foreground/90">{feature.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Hover gradient line */}
          <div className={`mt-6 h-px bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
        </div>
      </div>
    </motion.div>
  );
}
