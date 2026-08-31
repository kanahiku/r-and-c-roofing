import type { NavigationContent } from '~/lib/content/types';

export const navigationData: NavigationContent = {
  header: {
    links: [
      {
        text: 'About Us',
        href: '/about/our-story',
        links: [
          { text: 'Our Story & Credentials', href: '/about/our-story' },
          { text: 'Project Gallery', href: '/about/gallery' },
          { text: 'Reviews', href: '/about/reviews' },
        ],
      },
      {
        text: 'Roof Inspections',
        href: '/roof-inspections',
        links: [
          { text: 'HAAG Certified Inspection', href: '/roof-inspections/haag-certified-inspection' },
          { text: 'Pre-Purchase Roof Inspection', href: '/roof-inspections/pre-purchase-roof-inspection' },
          { text: 'Pre-Listing / Seller\u2019s Roof Inspection', href: '/roof-inspections/pre-listing-sellers-roof-inspection' },
          { text: 'Storm & Wind Damage Inspection', href: '/roof-inspections/storm-and-wind-damage-inspection' },
          { text: 'Annual Maintenance Inspection', href: '/roof-inspections/annual-maintenance-inspection' },
        ],
      },
      {
        text: 'Insurance Claim Help',
        href: '/insurance-claim-help',
        links: [
          { text: 'How the Claim Process Works', href: '/insurance-claim-help/how-the-claim-process-works' },
          { text: 'Denied or Underpaid Claims', href: '/insurance-claim-help/denied-or-underpaid-claims' },
        ],
      },
      {
        text: 'Services',
        href: '/services',
        links: [
          { text: 'Roof Repair', href: '/services/roof-repair' },
          { text: 'Roof Replacement & New Installation', href: '/services/roof-replacement-and-new-installation' },
          { text: 'Residential Roofing', href: '/services/residential-roofing' },
          { text: 'Commercial Roofing', href: '/services/commercial-roofing' },
          { text: 'Gutter Installation & Repair', href: '/services/gutter-installation-and-repair' },
          { text: 'Flat Roofing & Silicone Coating', href: '/services/flat-roofing-and-silicone-coating' },
        ],
      },
      {
        text: 'Roof Problems We Solve',
        links: [
          { text: 'My Roof Is Leaking', href: '/my-roof-is-leaking' },
          { text: 'Storm Damage on My Roof', href: '/storm-damage-on-my-roof' },
          { text: 'My Roof Is at End of Life', href: '/my-roof-is-at-end-of-life' },
          { text: 'My Insurance Claim Was Denied', href: '/my-insurance-claim-was-denied' },
          { text: 'Buying or Selling a Home', href: '/buying-or-selling-a-home' },
          { text: 'Preparing for Hurricane Season', href: '/preparing-for-hurricane-season' },
        ],
      },
      {
        text: 'Who We Serve',
        href: '/who-we-serve',
        links: [
          { text: 'Homeowners', href: '/who-we-serve/homeowners' },
          { text: 'Property Managers & AOAO / HOA Boards', href: '/who-we-serve/property-managers-aoao-hoa-boards' },
          { text: 'General Contractors', href: '/who-we-serve/general-contractors' },
          { text: 'Architects & Specifiers', href: '/who-we-serve/architects-and-specifiers' },
          { text: 'Trustees & Estate Managers', href: '/who-we-serve/trustees-and-estate-managers' },
        ],
      },
      { text: 'Blog', href: '/blog' },
      { text: 'Contact', href: '/contact' },
    ],
    actions: [],
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
          { text: 'Flat Roofing & Silicone', href: '/services/flat-roofing-and-silicone-coating' },
        ],
      },
      {
        title: 'Inspections',
        links: [
          { text: 'HAAG Certified', href: '/roof-inspections/haag-certified-inspection' },
          { text: 'Pre-Purchase Inspection', href: '/roof-inspections/pre-purchase-roof-inspection' },
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
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About Us', href: '/about/our-story' },
          { text: 'Project Gallery', href: '/about/gallery' },
          { text: 'Reviews', href: '/about/reviews' },
          { text: 'Blog', href: '/blog' },
          { text: 'Contact', href: '/contact' },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Privacy Policy', href: '/privacy-policy' },
      { text: 'Terms of Service', href: '/terms-of-service' },
      { text: 'Accessibility', href: '/accessibility-statement' },
    ],
    socialLinks: [
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Google', icon: 'tabler:brand-google', href: '#' },
      { ariaLabel: 'Yelp', icon: 'tabler:star', href: '#' },
    ],
    footNote: `&copy; ${new Date().getFullYear()} R&C Roofing. All rights reserved.`,
  },
};
