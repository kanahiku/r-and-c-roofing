import type { NavigationContent } from '~/lib/content/types';

export const navigationData: NavigationContent = {
  header: {
    links: [
      {
        text: 'Roof Inspections',
        href: '/roof-inspections',
        links: [
          { text: 'HAAG Certified Inspection', href: '/roof-inspections/haag-certified-inspection' },
          { text: 'Pre-Purchase Roof Inspection', href: '/roof-inspections/pre-purchase-roof-inspection' },
          { text: 'Pre-Listing / Seller\u2019s Roof Inspection', href: '/roof-inspections/pre-listing-roof-inspection' },
          { text: 'Storm & Wind Damage Inspection', href: '/roof-inspections/storm-and-wind-damage-inspection' },
          { text: 'Annual Maintenance Inspection', href: '/roof-inspections/annual-maintenance-inspection' },
        ],
      },
      {
        text: 'Services',
        href: '/services',
        columns: [
          {
            title: 'Roofing',
            links: [
              { text: 'Roof Repair', href: '/services/roof-repair' },
              { text: 'Roof Replacement & New Installation', href: '/services/roof-replacement-and-new-installation' },
              { text: 'Residential Roofing', href: '/services/residential-roofing' },
              { text: 'Commercial Roofing', href: '/services/commercial-roofing' },
              { text: 'Gutter Installation & Repair', href: '/services/gutter-installation-and-repair' },
            ],
          },
          {
            title: 'Materials',
            links: [
              { text: 'Roofing Materials', href: '/services/roofing-materials' },
              { text: 'Metal Roofing', href: '/services/roofing-materials/metal-roofing' },
              { text: 'Asphalt Shingle Roofing', href: '/services/roofing-materials/asphalt-shingle-roofing' },
              { text: 'Stone-Coated Steel Roofing', href: '/services/roofing-materials/stone-coated-steel-roofing' },
              { text: 'Tile Roofing (Clay & Concrete)', href: '/services/roofing-materials/tile-roofing' },
              { text: 'Slate & Rubber Slate Roofing', href: '/services/roofing-materials/slate-roofing' },
            ],
          },
        ],
      },
      {
        text: 'Claims',
        href: '/claims',
        links: [
          { text: 'How the Claim Process Works', href: '/claims/how-the-claim-process-works' },
          { text: 'Denied or Underpaid Claims', href: '/claims/denied-or-underpaid-claims' },
        ],
      },
      {
        text: 'Common Problems',
        links: [
          { text: 'My Roof Is Leaking', href: '/roof-problems/my-roof-is-leaking' },
          { text: 'Storm Damage on My Roof', href: '/roof-problems/storm-damage-on-my-roof' },
          { text: 'My Roof Is at End of Life', href: '/roof-problems/my-roof-is-at-end-of-life' },
          { text: 'My Insurance Claim Was Denied', href: '/roof-problems/my-insurance-claim-was-denied' },
          { text: 'Buying or Selling a Home', href: '/roof-problems/buying-or-selling-a-home' },
          { text: 'Preparing for Hurricane Season', href: '/roof-problems/preparing-for-hurricane-season' },
        ],
      },
      {
        text: 'Who We Serve',
        links: [
          { text: 'Homeowners', href: '/who-we-serve/homeowners' },
          { text: 'Property Managers & AOAO / HOA Boards', href: '/who-we-serve/property-managers-aoao-hoa-boards' },
          { text: 'General Contractors', href: '/who-we-serve/general-contractors' },
          { text: 'Architects & Specifiers', href: '/who-we-serve/architects-and-specifiers' },
          { text: 'Trustees & Estate Managers', href: '/who-we-serve/trustees-and-estate-managers' },
        ],
      },
      {
        text: 'About',
        links: [
          { text: 'Our Story & Credentials', href: '/about/our-story' },
          { text: 'Project Gallery', href: '/about/gallery' },
          { text: 'Reviews', href: '/reviews' },
        ],
      },
      { text: 'Contact', href: '/contact' },
    ],
    actions: [] as NavigationContent['header']['actions'],
    phone: {
      text: '(808) 888-2524',
      href: 'tel:+18088882524',
    },
  },

  footer: {
    links: [
      {
        title: 'Services',
        links: [
          { text: 'Roof Repair', href: '/services/roof-repair' },
          { text: 'Roof Replacement', href: '/services/roof-replacement-and-new-installation' },
          { text: 'Residential Roofing', href: '/services/residential-roofing' },
          { text: 'Commercial Roofing', href: '/services/commercial-roofing' },
          { text: 'Gutter Installation', href: '/services/gutter-installation-and-repair' },
          { text: 'Roofing Materials', href: '/services/roofing-materials' },
        ],
      },
      {
        title: 'Inspections',
        links: [
          { text: 'HAAG Certified', href: '/roof-inspections/haag-certified-inspection' },
          { text: 'Pre-Purchase Inspection', href: '/roof-inspections/pre-purchase-roof-inspection' },
          { text: 'Pre-Listing Inspection', href: '/roof-inspections/pre-listing-roof-inspection' },
          { text: 'Storm Damage Inspection', href: '/roof-inspections/storm-and-wind-damage-inspection' },
          { text: 'Annual Maintenance', href: '/roof-inspections/annual-maintenance-inspection' },
        ],
      },
      {
        title: 'Who We Serve',
        links: [
          { text: 'Homeowners', href: '/who-we-serve/homeowners' },
          { text: 'Property Managers', href: '/who-we-serve/property-managers-aoao-hoa-boards' },
          { text: 'General Contractors', href: '/who-we-serve/general-contractors' },
          { text: 'Architects & Specifiers', href: '/who-we-serve/architects-and-specifiers' },
          { text: 'Trustees & Estate Managers', href: '/who-we-serve/trustees-and-estate-managers' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'Our Story', href: '/about/our-story' },
          { text: 'Project Gallery', href: '/about/gallery' },
          { text: 'Reviews', href: '/reviews' },
          { text: 'Claims', href: '/claims' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    ],
    secondaryLinks: [{ text: 'Privacy Policy', href: '/privacy-policy' }],
    socialLinks: [
      {
        ariaLabel: 'Facebook',
        icon: 'tabler:brand-facebook',
        href: 'https://www.facebook.com/RCEnterprises808/',
      },
      {
        ariaLabel: 'Yelp',
        icon: 'tabler:star',
        href: 'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu',
      },
    ],
    footNote: `&copy; ${new Date().getFullYear()} R&C Roofing. All rights reserved.`,
  },
};
