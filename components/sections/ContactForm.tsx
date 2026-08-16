'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, User, Briefcase } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const serviceOptions = [
  'SEO & Performance',
  'Paid Advertising & PPC',
  'Web & App Development',
  'E-Commerce Store',
  'Graphic Designer',
  'Social Media Management',
  'Content & Copywriting',
  'Video Editing & Motion Graphics',
  'Brand Identity & UI/UX Design',
  'Email & SMS Automation',
  'Web Analytics & Insights',
  'Not Sure Yet — Need Guidance',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
     const resp = await fetch('/api/submit-lead',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          type: 'contact',
          name: name.trim(),
          email: email.trim(),
          service_type: serviceType.trim(),
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setServiceType('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-border/30">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to <span className="gradient-text">Scale?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop your details below, tell us what you need, and we'll send you a
            free digital growth audit within 48 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="gradient-border glow-cyan rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-cyan-400" />
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'loading'}
                placeholder=""
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
              />
            </div>

            {/* Email field */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-fuchsia-400" />
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                placeholder=""
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all disabled:opacity-50"
              />
            </div>

            {/* Service type dropdown */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Briefcase className="h-4 w-4 text-purple-400" />
                What work do you need?
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                disabled={status === 'loading'}
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
              >
                <option value="" className="bg-card">
                  Select a service...
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-card">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: status === 'idle' ? 0.97 : 1 }}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-fuchsia-500 px-6 py-4 text-base font-semibold text-background shadow-lg shadow-cyan-500/20 disabled:cursor-not-allowed overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    Send My Free Audit
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                )}
                {status === 'loading' && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Audit Request Sent!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    Something went wrong. Try again.
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>

            {/* Error message */}
            <AnimatePresence>
              {status === 'error' && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-red-400 text-center"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-cyan-300 text-center"
                >
                  We've received your request and will reach out within 48 hours.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
