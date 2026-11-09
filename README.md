# CareGrid SA

**A privacy-first wellbeing and peer-support platform for South African healthcare workers.**

CareGrid SA supports community health workers, nurses, clinic support staff, and facilitators who face burnout, fatigue, difficult shifts, and limited access to confidential support.

## The problem

Frontline healthcare workers need practical support that is available during and after demanding shifts. Existing support is often fragmented across phone numbers, informal groups, and separate wellness tools. CareGrid SA brings those needs together in one accessible Progressive Web App:

- Private daily wellbeing check-ins
- Peer support and anonymous community discussion
- Curated South African support resources
- Crisis and emergency contact information
- Safety and mental-health escalation
- Offline-readiness information for low-connectivity environments

## Features

### Authentication and profiles

- Supabase email authentication
- Sign up with full name, facility, role, email, and password
- Password reset and password recovery completion flow
- Persisted profile, notification, and theme settings
- Account deletion workflow

### Wellbeing tracking

- Daily fatigue and mood check-ins
- Hours worked and shift type logging
- Private check-in history
- Edit and delete support
- Dashboard trends, averages, and streaks

### Peer support and community

- Peer support directory
- Community categories and filtering
- Anonymous post creation
- Post ownership controls
- Post reporting workflow

### Resources and crisis support

- Searchable support resources
- Category filters for Burnout, Legal Rights, Safety, and Mental Health
- Resource bookmarking
- SADAG and other emergency support contacts
- Click-to-call links
- De-escalation support tools

### Offline readiness

- Online/offline connection state
- Cached-resource presentation
- Pending synchronization status
- PWA service worker support

## Technology

- React
- TypeScript
- Vite
- React Router
- Supabase Authentication
- Supabase PostgreSQL
- Supabase Row Level Security
- Vitest and Testing Library
- Playwright configuration for end-to-end testing
- Vite PWA plugin
- Inter typography and custom design tokens
- Vercel deployment configuration

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Welcome screen |
| `/login` | Sign in |
| `/signup` | Create an account |
| `/forgot-password` | Request a password reset link |
| `/reset-password` | Set a new password |
| `/dashboard` | Personal dashboard and recent activity |
| `/peer-support` | Peer facilitator support |
| `/crisis-help` | Crisis contacts and de-escalation support |
| `/resources` | Search and bookmark resources |
| `/wellness-tracker` | Create and manage private check-ins |
| `/community` | Anonymous peer discussion |
| `/escalate` | Safety and mental-health incident escalation |
| `/profile` | Profile and application settings |
| `/offline-status` | Connection and sync status |

## Project structure

```text
Care-Grid-SA/
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ designs/                 # Stitch-aligned screen references
â”‚   â”œâ”€â”€ SETUP.md                 # Supabase and deployment setup
â”‚   â””â”€â”€ CareGrid-SA-PRD.pdf
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/              # Shared UI, shell, dialogs, and controls
â”‚   â”œâ”€â”€ context/                 # Authentication and application state
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”œâ”€â”€ repositories.ts      # Typed Supabase data access
â”‚   â”‚   â””â”€â”€ supabase.ts          # Supabase client and domain types
â”‚   â”œâ”€â”€ screens/                 # Application screens
â”‚   â””â”€â”€ theme/                   # Design tokens
â”œâ”€â”€ supabase/
â”‚   â”œâ”€â”€ migrations/              # Database schema and RLS migrations
â”‚   â”œâ”€â”€ seed_demo_data.sql       # Demo resources and peer posts
â”‚   â””â”€â”€ tests/database/          # Database policy assertions
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ component/               # React component tests
â”‚   â””â”€â”€ unit/                    # Unit tests
â”œâ”€â”€ scripts/                     # Project verification scripts
â”œâ”€â”€ .env.example                 # Required environment variable names
â””â”€â”€ vercel.json                  # SPA rewrite configuration
```

The implementation plan is maintained in the repository's `CareGrid-Implementation Plan.pdf`. The implementation was completed incrementally through foundation, screen and visual alignment, backend integration, data workflow, product improvement, accessibility, and deployment phases.

## Getting started

### Requirements

- Node.js 20 or newer
- npm
- A Supabase project

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the example file:

```bash
copy .env.example .env
```

Then set the values locally:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

Never commit `.env` or display its values in documentation, screenshots, recordings, or public repositories.

### Start the development server

```bash
npm run dev
```

The local application is normally available at `http://localhost:5173`.

## Supabase setup

Apply the migrations in `supabase/migrations/` using the Supabase CLI or the Supabase SQL Editor. They create:

- `profiles`
- `resources`
- `check_ins`
- `posts`
- `resource_bookmarks`
- `post_reports`

The migrations also create the new-user profile trigger, account deletion function, timestamp triggers, indexes, and Row Level Security policies.

For demonstration content, run `supabase/seed_demo_data.sql` after at least one user has registered. The seed script is idempotent and adds South African healthcare-worker resources and sample peer posts.

### Authentication redirect URLs

Add these URLs in Supabase under **Authentication â†’ URL Configuration**:

```text
http://localhost:5173/reset-password
https://your-production-domain/reset-password
```

Replace `your-production-domain` with the exact deployed Vercel domain or custom domain.

## Security and permissions

CareGrid SA uses Supabase Row Level Security instead of relying only on frontend checks.

- Users can read and update their own profile.
- Users can only read, create, update, and delete their own check-ins.
- Users can create posts as themselves and manage their own posts.
- Authenticated users can read published resources.
- Resource creation, editing, and deletion are restricted to administrators.
- Bookmarks are private to the owning user.
- Users can submit reports and view their own reports.
- Administrators can manage protected administrative data.
- Account deletion uses a protected Supabase function.

This means the database remains protected even if a user bypasses the interface and sends requests directly to Supabase.

## Testing and verification

Run the complete application check:

```bash
npm run check
```

This runs:

1. ESLint
2. TypeScript validation
3. Secret scanning
4. Unit and component tests

Run the production build:

```bash
npm run build
```

Additional commands:

```bash
npm run test:unit       # Unit and component tests
npm run test:integration # Integration tests
npm run test:e2e        # Playwright end-to-end tests
npm run test:db         # Database test information
```

Database policy tests require the Supabase CLI and a running local Supabase stack.

## Deployment with Vercel

The repository includes `vercel.json` for client-side route handling.

1. Push the repository to GitHub.
2. Import `noluMolui/Care-Grid-SA` into Vercel.
3. Select **Vite** as the framework preset.
4. Use:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Add these Vercel environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

6. Deploy the application.
7. Add the deployed `/reset-password` URL to Supabase Authentication settings.
8. Apply the Supabase migrations and run the demo seed if this is a demonstration environment.

See [docs/SETUP.md](docs/SETUP.md) for the full setup and deployment checklist.

## Current limitations and future improvements

- Database policy tests require a local Supabase stack or configured hosted test environment.
- Demo seed data must be run manually in Supabase for hosted environments.
- Offline mode currently communicates connection and synchronization readiness; full background synchronization can be expanded in a future iteration.
- Production monitoring, analytics, and formal moderation administration can be added as the platform grows.

## Project status

The application has completed its core implementation, visual alignment, Supabase integration, priority data workflows, authentication recovery, accessibility improvements, and Vercel deployment configuration.
