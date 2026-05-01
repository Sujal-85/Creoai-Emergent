# plan.md — Creoai Marketing Site (React CRA, Frontend-only)

## 1) Objectives
- Build a premium, restrained marketing site for **Creoai** matching the provided design tokens (no gradients, noise overlay, dark-first).
- Implement **Home (all sections)** + **/contact** + **/consultancy** routes with world-class motion (GSAP + ScrollTrigger + Lenis) and two lightweight 3D moments (R3F).
- Deliver core interactive UX: loader (session-gated), custom cursor + magnetic CTAs, mobile nav overlay, theme toggle, scroll-driven section reveals, pinned horizontal process.
- Implement **waitlist + contact** submissions as **localStorage-only** with robust states + validation.

## 2) Implementation Steps

### Phase 1 — Core UX/Animation POC (isolation; fix until solid)
Goal: prove the “hard parts” won’t break (Lenis↔GSAP sync, cursor/magnetics, pinned horizontal scroll, 3D scenes, reduced-motion).

**Build POC route `/poc`** containing:
- Lenis smooth scroll + GSAP ticker sync (no jitter; correct RAF teardown).
- 1 Split headline reveal using **split-type + GSAP**.
- 1 pinned horizontal scroll section (4 panels) using ScrollTrigger.
- Custom cursor (dot+ring lerp) + hover growth + label preview.
- Magnetic button component.
- R3F hero icosahedron (wireframe) with cursor parallax + reduced-motion fallback.
- Waitlist mini-form storing email to localStorage.

**Phase 1 user stories**
1. As a user, I see smooth scrolling that stays in sync with scroll-triggered animations.
2. As a user, I see a headline reveal animation that doesn’t re-split or glitch on resize.
3. As a user, I can scroll through a pinned horizontal process without layout jumps.
4. As a user, my cursor feedback responds to interactive elements without lag.
5. As a user with reduced-motion enabled, 3D rotation and split animations are disabled.

Exit criteria:
- No console errors, no memory leaks on route change.
- ScrollTrigger refresh works on resize; mobile doesn’t get horizontal overflow.

---

### Phase 2 — V1 App Development (Home + Contact + Consultancy)

#### 2.1 Project setup + design system
- Add deps: `react-router-dom`, `tailwindcss`, `gsap`, `split-type`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `react-hook-form`.
- Tailwind theme tokens:
  - Colors: Ink Black `#0A0A0B`, Obsidian `#111113`, Graphite `#1C1C1F`, Bone White `#FAFAF7`, Fog `#A1A1AA`, Steel `#52525B`, Accent Lime `#C6F24E`.
  - Focus rings: 2px lime, offset 4px.
- Fonts: load **Geist Sans/Mono** (fallback Inter/JetBrains Mono).
- Global grain overlay (3% opacity) and strict “no gradients” lint-by-review.
- App shell: theme provider (dark-first), reduced-motion hook, route layout.

#### 2.2 Core components (shared)
- `Loader` (sessionStorage gated; 2.2s max): mono “CREOAI” stagger, 1px progress bar, 00→100 counter, mask-up exit.
- `Nav` (72px fixed): transparent→Obsidian on scroll + backdrop-blur; desktop links; mobile fullscreen overlay.
- `CustomCursor` (dot+ring): lerp motion, grow on interactive, project hover label.
- `MagneticButton` (GSAP-based) used for primary CTAs.
- `SectionHeading` (eyebrow + title + optional sub) to enforce consistency.

#### 2.3 Home page (all sections)
Implement sections in order, each with GSAP entrance patterns (y:40→0, fade, stagger 0.08) and SplitType for key headlines.
1. **Hero (100vh)**: eyebrow, 3-line headline reveal, sub, 2 CTAs, R3F wireframe icosahedron, bottom logo marquee.
2. **Services (8 cards)**: numbered 01–08 with Lucide icons; hover expand; “Free tier available” badge.
3. **Flagship Product (Creoai Studio)**: R3F floating UI panel rotates on scroll; 3 bullets; inline waitlist form.
4. **Process**: 4-step horizontal pinned scroll (Discover/Design/Build/Automate) with big numerals.
5. **Selected Work**: asym grid with 6 placeholder projects; cursor-follow “View case →”.
6. **Vision & Mission**: editorial 2-col + pull quote + vertical divider.
7. **Consultancy Tiers**: Free vs Pro (Gift/Crown); Pro accent line; CTAs route to `/consultancy`.
8. **Stats**: 4 stats with GSAP count-up on enter.
9. **FAQ**: accordion with Plus/Minus icons; single-open or multi-open (choose single-open for clarity).
10. **CTA/Contact block**: “Let’s build something inevitable.” with magnetic submit.
11. **Footer**: outlined CREOAI wordmark SVG; 4 columns; Lucide socials.

#### 2.4 Routes
- `/contact`: form (name, email, company, budget, message) via react-hook-form; save submission to localStorage; success + disabled state.
- `/consultancy`: tier comparison + anchored sections; CTA to `/contact` with query/anchor.
- Add deferred links (Services/Product/Work/About/Blog) as nav items that scroll-to-section on Home; for non-existent pages show “Coming soon” toast or route to `/#section`.

#### 2.5 Accessibility + performance
- Semantic landmarks, aria-labels for icon buttons, keyboard nav for mobile menu + accordion.
- `prefers-reduced-motion`: disable Lenis smoothing intensity, split animations, magnetic effects, and 3D rotation.
- Lazy-load R3F scenes via `React.lazy + Suspense`; keep canvases lightweight (no heavy postprocessing).

**Phase 2 user stories**
1. As a first-time visitor, I see the loader once; on refresh it is skipped.
2. As a user, I can smoothly scroll through all Home sections with animations triggering at the right time.
3. As a user, I can join the Creoai Studio waitlist and see a success state; my email is stored locally.
4. As a user, I can toggle dark/light theme and my preference persists.
5. As a mobile user, I can open the fullscreen nav overlay and navigate without losing scroll position.
6. As a keyboard user, I can tab through CTAs/accordion/forms with visible focus rings.

Phase 2 conclusion:
- Run 1 full end-to-end pass with testing agent against all Phase 2 user stories; fix all regressions.

---

### Phase 3 — Hardening + polish (v1.1)
- Animation QA: ScrollTrigger refresh strategy, resize handling, route transition cleanup.
- Motion tuning: consistent easing, durations, reduced-motion parity.
- Content polish: ensure copy matches brief; remove clichés; no stray gradients.
- Add small UX extras: “copied” states, form inline errors, better empty states.

**Phase 3 user stories**
1. As a user, I never experience stuck scroll or broken pinning after resizing/rotating my device.
2. As a user, all forms provide clear inline validation and error messaging.
3. As a user, the cursor/magnetic effects never interfere with clicking/tapping.
4. As a user, I don’t see layout shifts while 3D scenes load.
5. As a user, the site remains readable and high-contrast in both themes.

Phase 3 conclusion:
- Run another full end-to-end test pass; fix until green.

---

### Phase 4 (Future) — Deferred pages + real persistence
- Add `Services/[slug]`, `Work/[slug]`, `About`, `Blog` routes with the same system.
- Upgrade localStorage waitlist/contact to real backend when requested.

## 3) Next Actions
1. Create `/poc` and implement Lenis↔GSAP sync, SplitType reveal, pinned horizontal scroll, cursor/magnetics, minimal R3F.
2. Validate reduced-motion behavior across all POC elements.
3. Lock Tailwind tokens + fonts + grain overlay globally.
4. Build Home sections in order; wire up scroll triggers + navigation.
5. Implement `/contact` + `/consultancy` routes; localStorage persistence for submissions.
6. Run testing-agent pass; fix; then polish (Phase 3).

## 4) Success Criteria
- Visual fidelity: matches tokens, **no gradients**, accent lime used sparingly (≤5%).
- UX reliability: no scroll pin glitches, no horizontal overflow on mobile, no console errors.
- Performance: lazy-loaded 3D; stable FPS; minimal layout shift.
- Accessibility: WCAG AA contrast, keyboard operable, visible focus rings, aria labels.
- Functional: loader session-gated; waitlist/contact stored to localStorage with success states; theme persists.