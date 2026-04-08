# Design Brief

## Direction

YHWH Corner — Premium video platform where creators, viewers, and advertisers thrive together through bold, modern design that builds trust and energizes engagement.

## Tone

Confident and vibrant, not corporate: magenta-driven primary with electric cyan accents conveys trust + energy. Dark mode first eliminates eye strain for binge-watchers, befits premium media player UIs.

## Differentiation

Asymmetric color contrast zones: elevated card header, deep black content zones, and electric magenta/cyan accents on CTAs create unmistakable hierarchy and excitement without chaos.

## Color Palette

| Token      | Light OKLCH        | Dark OKLCH         | Role                      |
| ---------- | ------------------ | ------------------ | ------------------------- |
| background | 0.98 0.008 280     | 0.13 0.018 265     | Page canvas, minimal      |
| foreground | 0.18 0.015 280     | 0.92 0.01 260      | Primary text              |
| card       | 1.0 0.004 280      | 0.18 0.022 265     | Elevated surfaces         |
| primary    | 0.58 0.25 305      | 0.68 0.28 305      | Vivid magenta CTAs        |
| accent     | 0.7 0.22 185       | 0.78 0.26 185      | Bright cyan highlights    |
| muted      | 0.94 0.02 280      | 0.24 0.03 265      | Secondary text, disabled  |
| destructive| 0.55 0.22 25       | 0.55 0.22 25       | Errors, remove actions    |

## Typography

- Display: Space Grotesk — geometric, premium, confident headings; high-impact hero text
- Body: Bricolage Grotesque — modern sans, warm yet professional; UI labels and body copy
- Mono: JetBrains Mono — code/debug text, creator stats display
- Scale: hero `text-6xl bold tracking-tight`, h2 `text-4xl bold`, label `text-xs font-semibold tracking-widest`, body `text-base`

## Elevation & Depth

Hierarchical shadow system: `shadow-card` for info cards, `shadow-elevated` for modals/popovers. No heavy shadows on small UI elements—depth through color layering and border treatments.

## Structural Zones

| Zone    | Treatment                 | Border       | Notes                         |
| ------- | ------------------------- | ------------ | ----------------------------- |
| Header  | bg-card with cyan border  | border-b     | Navigation, branding, profile |
| Content | bg-background (deep dark) | —            | Alternating card/section rows |
| Footer  | bg-card/20 opacity        | border-t     | Links, copyright, secondary   |

## Spacing & Rhythm

Section gaps 2rem (md screens) / 3rem (lg), card padding 1.5rem. Micro-spacing 4px/8px for UI density. Alternating white-space creates visual rest between high-contrast magenta sections.

## Component Patterns

- Buttons: magenta primary with cyan active state; rounded-lg; uppercase labels on hero, sentence case on UI
- Cards: rounded-lg, shadow-card, bg-card with subtle border; video thumbnails span full width on mobile
- Badges: cyan bg with dark foreground; small rounded-full pill shape; used for creator tier/video tags

## Motion

- Entrance: fade-in 0.4s + slide-up 0.5s for modals/cards on load (easeOut)
- Hover: scale-105 + shadow-elevated on interactive cards; primary → primary-darker on buttons
- Decorative: pulse-accent on new creator badges; smooth color transitions on nav highlights

## Constraints

- Always use semantic color tokens (never raw hex/rgb)
- Magenta saturation capped at C: 0.28 dark / 0.25 light to avoid eye strain
- Cyan used sparingly (accents only, not filled buttons)
- No multi-color gradients—max 2-color, always magenta-to-cyan
- Rounded corners minimum rounded-lg (12px); card corners more aggressive (rounded-xl) for modern feel

## Signature Detail

Glowing magenta-to-cyan gradient border accent on featured video hero card — signals premium content and platform brand in a single visual flourish.
