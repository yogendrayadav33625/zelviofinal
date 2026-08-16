'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Users, RefreshCw, LogOut, Inbox, Briefcase } from 'lucide-react';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  service_type: string | null;
  message: string | null;
  created_at: string;
};

type JobApplication = {
  id: string;
  name: string;
  email: string;
  position: string;
  message: string | null;
  created_at: string;
};

type AdminData = {
  contacts: ContactSubmission[];
  jobs: JobApplication[];
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'contacts' | 'jobs'>('contacts');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  const fetchData = useCallback(async () => {
  setLoading(true);

  try {
    const resp = await fetch(`/api/admin-data?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${keyInput}`,
      },
    });

    if (!resp.ok) {
      throw new Error('Unauthorized');
    }

    const json = await resp.json();
    setData(json);
  } catch {
    setAuthError('Invalid admin key');
    setAuthed(false);
  } finally {
    setLoading(false);
  }
}, [keyInput]); 

      

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setAuthError('');
    setAuthed(true);
  };

  const handleLogout = () => {
    setAuthed(false);
    setKeyInput('');
    setData(null);
  };

  useEffect(() => {
    if (authed) {
      fetchData();
    }
  }, [authed, fetchData]);

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="gradient-border glow-cyan rounded-3xl p-8 w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500">
              <Lock className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Zelvio Submissions</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Admin Key
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter your admin key"
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            <AnimatePresence>
              {authError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-red-400"
                >
                  {authError}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-cyan-500/20"
            >
              <Lock className="h-4 w-4" />
              Unlock Dashboard
            </motion.button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground/60 text-center">
   
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  const contacts = data?.contacts ?? [];
  const jobs = data?.jobs ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500">
              <Inbox className="h-5 w-5 text-background" />
            </div>
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-sm text-foreground hover:border-cyan-500/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-sm text-foreground hover:border-red-500/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              <span className="text-sm text-muted-foreground">Contact Leads</span>
            </div>
            <div className="text-3xl font-bold gradient-text">{contacts.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gradient-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-5 w-5 text-fuchsia-400" />
              <span className="text-sm text-muted-foreground">Job Applications</span>
            </div>
            <div className="text-3xl font-bold gradient-text">{jobs.length}</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                : 'border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mail className="h-4 w-4" />
            Contact Leads ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300'
                : 'border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="h-4 w-4" />
            Job Applications ({jobs.length})
          </button>
        </div>

        {/* Data table */}
        <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : activeTab === 'contacts' ? (
            contacts.length === 0 ? (
              <EmptyState icon={Mail} message="No contact leads yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60 bg-secondary/30">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground">{c.name}</td>
                        <td className="px-6 py-4 text-sm text-cyan-300">{c.email}</td>
                        <td className="px-6 py-4 text-sm text-purple-300">{c.service_type || '—'}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(c.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : jobs.length === 0 ? (
            <EmptyState icon={Briefcase} message="No job applications yet" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{j.name}</td>
                      <td className="px-6 py-4 text-sm text-fuchsia-300">{j.email}</td>
                      <td className="px-6 py-4 text-sm text-foreground/80">{j.position}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(j.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Icon className="h-12 w-12 text-muted-foreground/30 mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
