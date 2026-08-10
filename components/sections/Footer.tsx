'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const footerLinks = {
    Services: ['SEO & Performance', 'Paid Advertising', 'Web Development', 'E-Commerce Stores'],
    Company: ['About Us', 'Case Studies', 'Careers', 'Blog'],
    Resources: ['Free Audit', 'Growth Guide', 'SEO Checklist', 'Contact'],
  };

  return (
    <footer className="relative border-t border-border/30 py-16">
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size={36} className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Engineering digital growth through data-driven marketing,
              e-commerce stores, and next-gen web & app development.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Zelvio. All rights reserved.
            </p>
            <a
              href="/admin"
              className="text-xs text-muted-foreground/50 hover:text-cyan-400 transition-colors"
            >
              Admin
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
