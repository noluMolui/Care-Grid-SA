# CareGrid SA setup

## Local development

1. Install Node.js 20 or newer and run `npm install`.
2. Copy `.env.example` to `.env`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project URL and publishable/anon key from Supabase.
4. Run `npm run dev`.

The `.env` file is local-only and must not be committed.

## Supabase database

Apply migrations in `supabase/migrations/` through the Supabase CLI or the SQL editor. The migrations create the profile, resource, check-in, post, bookmark, and report tables, triggers, account-deletion function, and RLS policies.

To populate the hosted project with demonstration content, run `supabase/seed_demo_data.sql` in the SQL editor after at least one user has registered. The seed is idempotent and inserts published South African clinician-support resources and sample peer posts.

## Authentication

In Supabase Authentication settings, add these redirect URLs:

- `http://localhost:5173/reset-password`
- `https://<production-host>/reset-password`

The production URL must use the exact deployed origin. Password recovery links are handled by `/reset-password`.

## Verification

```text
npm run check
npm run build
```

`npm run check` runs linting, TypeScript validation, secret scanning, and unit/component tests. Database policy tests require a running local Supabase stack.

## Deployment checklist

- Configure the two `VITE_SUPABASE_*` variables in the hosting provider.
- Apply all migrations in order.
- Configure the production password-reset redirect URL.
- Run the demo seed only for demo environments.
- Confirm RLS is enabled and verify that an authenticated user can only read or modify their own check-ins, bookmarks, profile, and reports.
