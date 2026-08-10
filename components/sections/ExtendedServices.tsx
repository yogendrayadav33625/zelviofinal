'use client';

import { motion } from 'framer-motion';
import {
  Share2,
  PenLine,
  LineChart,
  ShoppingBag,
  Mail,
  Palette,
  Video,
} from 'lucide-react';

type ExtendedService = {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
  accent: string;
};

const extendedServices: ExtendedService[] = [
  {
    title: 'Social Media Mastery (SMM)',
    description:
      'Content creation, calendar scheduling, and viral growth management across Instagram, LinkedIn, and TikTok.',
    icon: Share2,
    tags: ['Instagram', 'LinkedIn', 'TikTok'],
    accent: 'text-cyan-400',
  },
  {
    title: 'Content Strategy & Copywriting',
    description:
      'High-converting landing page copies, SEO blog writing, and brand storytelling that turns readers into customers.',
    icon: PenLine,
    tags: ['Landing Copy', 'SEO Blogs', 'Brand Story'],
    accent: 'text-fuchsia-400',
  },
  {
    title: 'Web Analytics & Insights',
    description:
      'Full setup of Google Analytics 4 (GA4) and Google Search Console for live user behavior tracking and reporting.',
    icon: LineChart,
    tags: ['GA4', 'Search Console', 'Live Tracking'],
    accent: 'text-purple-400',
  },
  {
    title: 'E-Commerce Growth',
    description:
      'Designing and optimizing high-conversion online stores on Shopify and Next.js Commerce that scale with demand.',
    icon: ShoppingBag,
    tags: ['Shopify', 'Next.js Commerce', 'CRO'],
    accent: 'text-cyan-400',
  },
  {
    title: 'Email & SMS Automation',
    description:
      'Automated marketing funnels and newsletters engineered for customer retention and lifetime value growth.',
    icon: Mail,
    tags: ['Funnels', 'Newsletters', 'Retention'],
    accent: 'text-fuchsia-400',
  },
  {
    title: 'Brand Identity & UI/UX Design',
    description:
      'Modern logos, comprehensive style guides, and interactive wireframes crafted in Figma for a cohesive brand.',
    icon: Palette,
    tags: ['Logos', 'Style Guides', 'Figma Wireframes'],
    accent: 'text-purple-400',
  },
  {
    title: 'Video Editing & Motion Graphics',
    description:
      'Cinematic promotional videos, reels, and motion graphics designed for maximum engagement across all platforms.',
    icon: Video,
    tags: ['Reels', 'Motion Graphics', 'Promos'],
    accent: 'text-cyan-400',
  },
];

export default function ExtendedServices() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32 border-t border-border/30">
      <div className="absolute top-1/2 right-0 h-64 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300 mb-4">
            Extended Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything Else You <span className="gradient-text">Need to Scale</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A full suite of digital marketing services to cover every touchpoint
            of your brand's online presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {extendedServices.map((service, i) => (
            <ExtendedServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtendedServiceCard({
  service,
  index,
}: {
  service: ExtendedService;
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-card/60"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/60 border border-border/50"
        >
          <Icon className={`h-5 w-5 ${service.accent}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold mb-1.5 leading-tight">{service.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
