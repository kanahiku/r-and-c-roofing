/**
 * Site-level component theme.
 *
 * This is the single place to change the default visual variant for every
 * repeating component. Individual pages can always override with a prop —
 * these are the *defaults* that keep all pages consistent without
 * repeating the same prop on every section.
 *
 * R&C Roofing defaults: bold trade aesthetic — dark cards on grey,
 * tinted cards on white, split hero.
 *
 * ──────────────────────────────────────────────────────────────────────
 * HOW TO RESTYLE A NEW SITE
 * ──────────────────────────────────────────────────────────────────────
 * 1. Change the values below (e.g. card.onGrey: 'outlined').
 * 2. If needed, adjust the matching CSS tokens in CustomStyles.astro
 *    (--aw-color-bg-card-outlined, etc.) for the new variant's colors.
 * 3. Run `npm run build` to confirm no errors.
 *
 * Available CardVariant values
 * ────────────────────────────
 * 'dark'     — bg-[#222] + accent border + white text     (bold / trade)
 * 'light'    — yellow-tint bg + no border + dark text     (warm / approachable)
 * 'outlined' — white bg + accent/neutral border + dark text (clean / modern)
 * 'glass'    — semi-transparent + backdrop-blur + white text (frosted / editorial)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

/** Visual style of a card component. */
export type CardVariant = 'dark' | 'light' | 'outlined' | 'glass';

/** Page section background color. */
export type SectionVariant = 'white' | 'grey' | 'dark';

/** Hero layout variant. */
export type HeroVariant = 'split' | 'overlay';

// ─── Theme ────────────────────────────────────────────────────────────────────

export const THEME = {
  /**
   * Default card visual per section background.
   *
   * Used by InfoCard, ServiceCard, and any handmade card grid.
   * Import THEME and pass `variant={THEME.card.onGrey}` so all cards
   * on grey sections share one config-driven default.
   *
   * R&C Roofing: dark cards everywhere (bold contrast).
   */
  card: {
    /** Cards sitting on a grey (#FAFAFA) section. */
    onGrey: 'dark' as CardVariant,
    /** Cards sitting on a white section. */
    onWhite: 'light' as CardVariant,
    /** Cards sitting on a dark (black) section. */
    onDark: 'dark' as CardVariant,
  },

  /**
   * Section background color flow — the repeating White → Grey → Dark
   * sequence down every page (first non-hero section is index 0).
   *
   * Changing this order changes the visual rhythm of every page at once.
   */
  sectionFlow: ['white', 'grey', 'dark'] as SectionVariant[],

  /**
   * Hero section defaults.
   *
   * 'split'   — content left, full-height photo right (default)
   * 'overlay' — full-bleed artwork with text overlay
   */
  hero: {
    variant: 'split' as HeroVariant,
  },

  /**
   * Pre-configured widget prop bundles for the most common section shapes.
   *
   * Import the bundle and spread it: `<Features2 {...THEME.widgets.featuresOnGrey} />`
   * Override any individual prop after the spread for one-off sections.
   */
  widgets: {
    /** Card grid on a grey section — dark cards with accent border. */
    featuresOnGrey: {
      isDark: false,
      cardClass: 'border border-accent/60 bg-[#222]',
    },

    /** Card grid on a dark section — uses Features2 built-in dark defaults. */
    featuresOnDark: {
      isDark: true,
      cardClass: undefined as string | undefined,
    },

    /** Testimonials on a grey section — dark cards, white text, dark section title. */
    testimonialsOnGrey: {
      isDark: true,
      cardClass: 'border border-accent/60 bg-[#222]',
      // headline classes keep the section title dark on a grey background
      classes: {
        headline: {
          title: 'text-[26px] md:text-[40px] font-normal leading-[120%] text-[#111111]',
          subtitle: 'text-[16px] md:text-[17px] font-normal leading-[160%] text-[#444444]',
        },
      },
    },

    /** Testimonials on a dark section — standard dark widget. */
    testimonialsOnDark: {
      isDark: true,
      cardClass: undefined as string | undefined,
    },
  },
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the card variant for the nth section in the page's color flow.
 *
 * @example
 * // First non-hero section (index 0) → 'white' → THEME.card.onWhite
 * const variant = cardVariantForSection(0);
 */
export function cardVariantForSection(sectionIndex: number): CardVariant {
  const flow = THEME.sectionFlow;
  const bg = flow[sectionIndex % flow.length];
  if (bg === 'grey') return THEME.card.onGrey;
  if (bg === 'dark') return THEME.card.onDark;
  return THEME.card.onWhite;
}
