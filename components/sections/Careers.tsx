'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, User, Briefcase, MessageSquare } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const positions = [
  'SEO Specialist',
  'PPC / Paid Media Manager',
  'Full-Stack Developer (Next.js)',
  'Video Editor & Motion Designer',
  'Social Media Manager',
  'UI/UX Designer',
  'Content Strategist',
  'Business Development Executive',
];

export default function Careers() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState(positions[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
      const resp = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          type: 'job',
          name: name.trim(),
          email: email.trim(),
          position: position.trim(),
          message: message.trim(),
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
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
    <section id="careers" className="relative py-24 lg:py-32 border-t border-border/30">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/4 right-1/4 h-72 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300 mb-4">
            We're Hiring
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Join the <span className="gradient-text">Zelvio Team</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            We're always looking for passionate marketers, developers, and
            creatives who want to engineer digital growth. Apply below and we'll
            get in touch.
          </p>
        </motion.div>

        {/* Open positions chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {positions.map((pos, i) => (
            <motion.span
              key={pos}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-sm text-muted-foreground hover:border-cyan-500/40 hover:text-foreground transition-colors cursor-pointer"
              onClick={() => setPosition(pos)}
            >
              {pos}
            </motion.span>
          ))}
        </motion.div>

        {/* Application form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="gradient-border glow-purple rounded-3xl p-8 md:p-10 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
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
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
                />
              </div>

              {/* Email */}
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
                  placeholder="jane@email.com"
                  className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Position select */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Briefcase className="h-4 w-4 text-purple-400" />
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={status === 'loading'}
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos} className="bg-card">
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                Cover Letter / Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === 'loading'}
                rows={4}
                placeholder="Tell us about yourself, your experience, and why you'd be a great fit..."
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: status === 'idle' ? 0.97 : 1 }}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 px-6 py-4 text-base font-semibold text-background shadow-lg shadow-purple-500/20 disabled:cursor-not-allowed overflow-hidden"
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
                    Submit Application
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
                    Application Sent!
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

              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>

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

            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-purple-300 text-center"
                >
                  Thanks for applying! We'll review your application and reach out soon.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
