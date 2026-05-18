# v4 — Terminal Couture Redesign

**Date:** 2026-05-17
**Branch:** `v4-redesign`
**Goal:** Replace the existing Next 12 portfolio with a sharper, more distinctive experience that reflects Sajid Javed's identity as a senior solo full-stack engineer (AI · backend · web3).

The current portfolio is functional but generic. This rebuild is a clean-slate replacement — content survives, wrapper does not.

---

## Locked Decisions

| Dimension | Choice | Rationale |
|-----------|--------|-----------|
| **Vibe** | Terminal couture | Builder identity foregrounded; recruiter-distinctive without being gimmicky |
| **Literalness** | Editorial inside terminal frame | Case studies stay readable; wrapper carries the aesthetic |
| **Personality** | Builder swagger (medium motion) | Confident copy + tasteful interactions; never performative |
| **Theme** | Strict dark | Stronger identity; light mode deferred |
| **Stack** | Next 15 App Router · TypeScript · Tailwind v4 · framer-motion · cmdk · shiki · MDX | Modern, current, opinionated |
| **IA** | Multi-page with `⌘K` command palette as primary nav | Deep-linkable; keyboard-first reinforces builder identity |
| **Repo strategy** | Same repo (`portfolio-v3`), new branch (`v4-redesign`), bump app version to 4.0.0 | Preserves git history, same Vercel project, same domain |

---

## Architecture

### Routes (App Router)

| Route | Purpose |
|-------|---------|
| `/` | Hero + brief identity + 3 featured case studies |
| `/work` | All projects — featured grid + compact list view |
| `/work/[slug]` | Case study (Tenure, Pureland, Leaderboard, Darkblock, Shopsy, Dads Agree) |
| `/writing` | Blog index (existing MDX posts) |
| `/writing/[slug]` | Blog post |
| `/about` | Long-form bio + skills dump + résumé link |
| `/contact` | Email · LinkedIn · GitHub · Calendly (no form) |

### Content surviving from v3

- All TypeScript configs: `config/projects.ts`, `config/sideprojects.ts`, `config/stack.ts`, `config/colors.ts`
- All MDX blog posts in `data/blog/`
- All public assets in `public/static/`
- Authored case study copy and Pureland screenshots from the May 2026 content refresh

### Content NOT surviving

- All `pages/` (App Router replacement)
- All v3 `components/` (rebuilt from scratch)
- Email-list integrations: Mailchimp / Buttondown / ConvertKit / Klaviyo API routes — out
- `@geist-ui/core`, `react-rough-notation`, `react-indiana-drag-scroll` — removed
- Preact compat aliasing in webpack config — removed (Next 15 standard React 19)

---

## Visual System

### Typography (two faces)
- **Geist Sans** — body, headings, case study prose
- **JetBrains Mono Variable** — palette, nav, code, metadata, labels

### Color (dark only, no toggle in v4)

```
bg              #0a0a0a   page background
surface         #141414   cards
surface-elev    #1c1c1c   palette, hover
border          #262626   all borders
text            #fafafa   primary
text-muted      #a1a1aa   secondary
text-dim        #52525b   metadata, timestamps
accent          #06b6d4   primary accent (cyan)
accent-2        #a855f7   secondary accent (purple)
success         #10b981   sparingly, status indicators
```

### Motion
- Typed hero on first load (`$ whoami_`), ~600ms total, skipped on `prefers-reduced-motion`
- View Transitions API for route changes (Next 15 native)
- Card hover: 150ms lift (translateY -2px) + border accent fade + cursor `crosshair`
- Scroll reveals: section headers fade-up 400ms ease-out
- Command palette: scale 0.96 → 1, 150ms
- Persistent blinking cursor on hero + footer status line

### Layout signature
- Persistent thin top bar: `~/sajid.dev/<path>` left, `⌘K` chip right
- 1px dot-grid background at 4% opacity (graph-paper terminal feel)
- Flat 1px borders, zero drop-shadows
- Body content `max-w-5xl`, work index `max-w-7xl`

### Signature flourish
Project cards reveal an ASCII meta strip on hover: `[ solo ] [ shipped ] [ 11 weeks ]`. Telegraphs the work's character before visitors click.

---

## Component Primitives

**Shell**
- `<TerminalFrame>` — persistent layout shell (top bar + dot grid + footer status line + main slot)
- `<CommandPalette>` — cmdk-based, ⌘K trigger, groups: Pages · Projects · Writing · Actions
- `<Footer>` — terminal-prompt status line, blinking cursor

**Motion atoms**
- `<CursorBlink>` — inline blinking underscore
- `<TypedText>` — types content on mount, respects reduced motion

**Content**
- `<ProjectCard>` — featured card with hover MetaStrip
- `<WorkRow>` — compact one-line row (`[ 2026 ] tenure · ai knowledge engine · solo →`)
- `<StackBadge>` — terminal-styled tech chip using existing color mappings
- `<MetaStrip>` — `[ solo ] [ shipped ] [ 11 weeks ]` ASCII chip row

**Editorial**
- `<SectionHeader label="THE BET" subhead="..." />` — mono uppercase label over sans subhead
- `<PullQuote>` — display-weight Geist Sans block
- `<ScreenshotGallery>` — horizontal scroll, keyboard-navigable, local images supported
- `<CodeBlock>` — shiki syntax highlighting, mono, copy-on-hover

**Utility**
- `<KbdHint>` — styled `<kbd>` chip
- `<Cursor type="crosshair">` — wraps clickable surfaces to swap cursor

---

## Page Layouts (summary)

### `/` (Home)
1. Top: typed hero `$ whoami_` → identity statement (3 lines, the senior voice from `cv.md` opener) → CursorBlink
2. Middle: 3 featured ProjectCards (Tenure, Pureland, Darkblock) in responsive grid
3. Bottom strip: one-liner about + link to `/about` + link to `/work`

### `/work` (Index)
- "Featured" section: 3 large ProjectCards
- "All Work" section: WorkRow list (every project + every side project)

### `/work/[slug]` (Case Study)
- Breadcrumb `~/work/pureland` in top bar
- Mono metadata header (year · role · duration · status)
- Banner image
- `THE BRIEF` → description
- PullQuote (the architectural bet)
- `STACK` → StackBadge row
- ScreenshotGallery (if any)
- `SUB-MODULES` → sub-project cards
- Bottom: ← back to work · next/prev project

### `/about`
- Long-form bio (mono accents, sans body)
- Quick stats grid (years, projects shipped, real numbers)
- Skills dump (mono, terminal-formatted)
- Résumé PDF link

### `/writing` and `/writing/[slug]`
- Index: list of posts with date · title · tag · reading time
- Post: clean MDX-rendered article inside the frame

### `/contact`
- email (copy-to-clipboard) · LinkedIn · GitHub · optional Calendly
- No form

---

## Rollout Plan

1. Branch `v4-redesign` ← already created from `master`
2. Bump `package.json` to v4.0.0, update deps wholesale
3. `npm install` (background)
4. Delete `pages/`, `components/`, `layouts/`, `css/` (v3 leftovers)
5. Scaffold `app/` with App Router structure
6. Build TerminalFrame + CommandPalette + motion atoms first
7. Build Home page (the "wow" — what visitors see first)
8. Build /work index + /work/[slug]
9. Build /about + /writing + /contact
10. Smoke-test local dev server, walk through with user
11. Iterate based on feedback
12. Merge to master → Vercel deploys → live

---

## Out of Scope (v4)

- Light mode toggle (defer to v4.1)
- Internationalization
- Comment system on blog posts
- Newsletter signup
- Web3 wallet auth on contact page (cute but unnecessary)
- 3D / Three.js elements (gimmick risk too high)
- Custom audio feedback

---

## Success Criteria

- Recruiters who saw the v3 site say "this is a different person."
- Case studies for Tenure and Pureland are the strongest moments — readable, visually distinctive, copy is sharp.
- The site loads fast (Vercel + static), passes Lighthouse 90+ on performance/accessibility.
- Command palette works with keyboard only.
- The whole thing is built and shipped without dragging on for weeks.
