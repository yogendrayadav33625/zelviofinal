/*
# Create job_applications table (single-tenant, no auth)

1. Purpose
   Stores job applications submitted through the Zelvio Careers section.
   This is a single-tenant marketing site with no sign-in screen, so the
   anon-key frontend client must be able to insert rows directly.

2. New Tables
   - `job_applications`
     - `id` (uuid, primary key, auto-generated)
     - `name` (text, not null) — applicant's full name
     - `email` (text, not null) — applicant's email address
     - `position` (text, not null) — the role they are applying for
     - `message` (text, nullable) — optional cover letter / message
     - `created_at` (timestamptz, defaults to now())

3. Security
   - Enable RLS on `job_applications`.
   - INSERT policy for `anon, authenticated` — any site visitor can apply
     without signing in. This is intentionally public.
   - SELECT/UPDATE/DELETE are NOT granted to anon — only the server-side
     service role can read or manage applications, protecting applicant data.
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  position text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_job_applications" ON job_applications;
CREATE POLICY "anon_insert_job_applications"
  ON job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
