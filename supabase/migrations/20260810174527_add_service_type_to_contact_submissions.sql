/*
# Add service_type column to contact_submissions

1. Purpose
   Adds a `service_type` column so visitors can specify what kind of work
   they need (SEO, PPC, Web Development, E-Commerce, etc.) when submitting
   the contact form.

2. Modified Tables
   - `contact_submissions`
     - `service_type` (text, nullable) — the service the visitor is interested in

3. Security
   - No policy changes needed; the existing INSERT policy already allows
     anon inserts with WITH CHECK (true).
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS service_type text;
