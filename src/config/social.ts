/**
 * Single source of truth for all social media and directory profile links.
 *
 * `nav` drives the footer social icons (needs ariaLabel + Tabler icon name).
 * `sameAs` drives the schema.org sameAs array on the business entity.
 *
 * Keep both lists in sync — when you add a new platform, add it to both.
 * When setting up a new site, replace every URL below.
 */
export const SOCIAL = {
  /**
   * Footer navigation social icons.
   * icon must be a valid Tabler icon name (tabler:*).
   */
  nav: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/RCEnterprises808/',
    },
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/rcroofinghawaii/',
    },
    {
      ariaLabel: 'YouTube',
      icon: 'tabler:brand-youtube',
      href: 'https://www.youtube.com/@roofinghawaii5031',
    },
    {
      ariaLabel: 'Yelp',
      icon: 'tabler:star',
      href: 'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu',
    },
  ],

  /**
   * schema.org sameAs array for the business entity.
   * Include all official profiles — social, directory, trade association.
   * Use canonical URLs (consistent trailing slash).
   */
  sameAs: [
    'https://www.facebook.com/RCEnterprises808/',
    'https://www.instagram.com/rcroofinghawaii/',
    'https://www.youtube.com/@roofinghawaii5031',
    'https://www.linkedin.com/company/hawaiiroofingcontractors',
    'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu',
    'https://members.biahawaii.org/list/member/r-c-roofing-contractors-42902548',
  ],
} as const;
