/*
# Create contact_submissions table (single-tenant, no auth)

1. Purpose
   Stores inquiries submitted through the Zelvio landing page contact form.
   This is a single-tenant marketing site with no sign-in screen, so the
   anon-key frontend client must be able to insert rows directly.

2. New Tables
   - `contact_submissions`
     - `id` (uuid, primary key, auto-generated)
     - `name` (text, not null) — the visitor's full name
     - `email` (text, not null) — the visitor's email address
     - `message` (text, nullable) — optional message body
     - `created_at` (timestamptz, defaults to now())

3. Security
   - Enable RLS on `contact_submissions`.
   - INSERT policy for `anon, authenticated` — any site visitor can submit
     the contact form without signing in. This is intentionally public.
   - SELECT/UPDATE/DELETE are NOT granted to anon — only the server-side
     service role can read or manage submissions, protecting visitor data.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
