/**
 * Barrel export for all site-level config.
 *
 * Import from '~/config' to get everything in one line:
 *
 *   import { CONTACT, SOCIAL, THEME, MOTIF, PRIMARY_CTA_LABEL } from '~/config';
 *
 * Each file is the single source of truth for its concern.
 * For schema.org data use '~/config/schema'.
 */
export { CONTACT } from './contact';
export { SOCIAL } from './social';
export { THEME, cardVariantForSection } from './theme';
export type { CardVariant, SectionVariant, HeroVariant } from './theme';
export { MOTIF, MOTIF_COLOR_VARS, MOTIF_OPACITY_VARS, motifFadeMask, parseMotifOpacity } from './motif';
export { PRIMARY_CTA_LABEL, PRIMARY_CTA_NOTE } from './cta';
export { business } from './schema/business';
