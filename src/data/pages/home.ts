import type { HomePageContent } from '~/lib/content/types';

export const homePageData: HomePageContent = {
  meta: {
    title: "R&C Roofing Contractors | Hawaii's Roof Inspection Specialists",
    description:
      'R&C Roofing Contractors provides HAAG Certified roof inspections, roof repair, replacement, commercial roofing, insurance claim documentation, and gutter services on Oahu.',
  },

  hero: {
    titleLine1: "Hawaii's Roof",
    titleLine2: 'Inspection Specialists',
    subtitleParagraph1:
      'Roof damage does not automatically mean you need a replacement. An inspection can help determine what is happening before you decide what work makes sense.',
    subtitleParagraph2:
      'R&C Roofing Contractors provides roof inspections and roofing services on Oahu. Our team includes HAAG Certified Inspector Robert Pilato, giving property owners access to specialized roof damage assessment from a licensed Hawaii roofing contractor.',
    ctaText: 'Schedule a Roof Inspection',
    ctaHref: '/contact',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2070&q=80',
      alt: 'Roof inspection on Oahu home',
    },
  },

  statsBar: [
    { stat: 'C-33642', label: 'License' },
    { stat: 'HAAG', label: 'Certified Inspector' },
    { stat: '50+', label: 'Years Combined Experience' },
    { stat: 'BIA', label: 'Hawaii Member' },
  ],

  whyInspect: {
    heading: 'Why Start With a Roof Inspection?',
    paragraph1:
      'Some roofing problems can be repaired. Others point to more extensive deterioration. Starting with an inspection gives you a clearer picture of the roof before you commit to the work.',
    paragraph2:
      'R&C takes an inspection-first approach. We evaluate the roofing system, document relevant findings, and explain what the condition of the roof means for your property.',
    ctaText: 'View Roof Inspection Services',
    ctaHref: '/roof-inspections',
    infoCards: [
      {
        title: 'HAAG Certified Roof Damage Assessment',
        description:
          'Robert Pilato is a HAAG Certified Inspector, Certification #201408313. HAAG certification includes specialized training and testing in roof damage assessment.',
      },
      {
        title: 'Roof Documentation',
        description:
          'When documentation is needed, R&C can record visible roof conditions and damage for repair planning or an insurance claim.',
      },
      {
        title: 'One Contractor From Inspection Through Roofing Work',
        description:
          'R&C is a licensed Hawaii roofing contractor. If an inspection identifies work that needs to be completed, our team can handle the repair or replacement.',
      },
    ],
  },

  servicesSection: {
    title: 'How Can We Help You Today?',
    subtitle: 'Choose the service that best matches your roofing needs.',
    services: [
      {
        title: 'Roof Inspections',
        description:
          'Understand the condition of your roof with a HAAG Certified inspection and documented findings.',
        linkText: 'View Roof Inspections →',
        linkHref: '/roof-inspections',
      },
      {
        title: 'Roof Repair',
        description:
          'Address leaks, damaged flashing, missing roofing materials, and other localized roof problems.',
        linkText: 'View Roof Repair →',
        linkHref: '/services/roof-repair',
      },
      {
        title: 'Insurance Claim Help',
        description:
          'Get roof damage documentation and contractor-side support during the insurance repair process.',
        linkText: 'Explore Insurance Claim Help →',
        linkHref: '/insurance-claim-help',
      },
      {
        title: 'Roof Replacement & Installation',
        description:
          'Replace an aging or extensively damaged roof with a system selected for your property and local conditions.',
        linkText: 'View Roof Replacement →',
        linkHref: '/services/roof-replacement-and-new-installation',
      },
      {
        title: 'Commercial Roofing',
        description:
          'Roofing services for commercial properties and the professionals responsible for managing roofing projects.',
        linkText: 'View Commercial Roofing →',
        linkHref: '/services/commercial-roofing',
      },
      {
        title: 'Gutter Installation',
        description:
          'Install gutter systems that help manage rainfall and direct water away from your property.',
        linkText: 'View Gutter Services →',
        linkHref: '/services/gutter-installation-and-repair',
      },
    ],
  },

  oahuConditions: {
    title: 'Oahu Roofing Conditions Vary by Location',
    paragraph1:
      'A roof in Kailua can face different conditions than one in Kapolei. Homes near the coast may have greater exposure to salt air. Wetter windward and valley areas can experience more frequent moisture.',
    paragraph2:
      'Strong UV exposure can also affect roofing materials over time. Wind-driven rain may reveal weak points around flashing and roof penetrations.',
    paragraph3:
      'R&C considers the condition of the existing roof and the property\'s exposure before recommending what should happen next.',
    ctaText: 'Explore Residential Roofing',
    ctaHref: '/services/residential-roofing',
    image: {
      src: 'https://images.unsplash.com/photo-1598901847919-b2713a39aab5?auto=format&fit=crop&w=1200&q=80',
      alt: 'Oahu coastal homes roofing',
    },
  },

  whyRC: {
    heading: 'Why Property Owners Choose R&C Roofing',
    benefits: [
      {
        title: 'HAAG Certified Inspection Expertise',
        description:
          'R&C brings specialized roof damage assessment training to residential and commercial inspections.',
      },
      {
        title: 'Licensed Hawaii Roofing Contractor',
        description:
          'R&C Roofing Contractors operates under Hawaii contractor license C-33642. If roofing work is needed after an inspection, you can continue with the same contractor.',
      },
      {
        title: '50+ Years of Combined Experience',
        description:
          'The R&C team brings more than 50 years of combined roofing experience to projects in Hawaii.',
      },
      {
        title: 'Recommendations Based on Roof Condition',
        description:
          'Not every roofing problem requires replacement. If a repair is appropriate, we will explain what needs attention. If the condition of the roof supports replacement, we will explain why.',
      },
      {
        title: 'BIA Hawaii Member',
        description:
          'R&C Roofing Contractors is a member of the Building Industry Association of Hawaii.',
      },
    ],
  },

  insuranceClaims: {
    heading: 'Roof Damage and Insurance Claims',
    ctaText: 'Learn About Insurance Claim Help',
    ctaHref: '/insurance-claim-help',
    paragraph1:
      'If you believe your roof has been damaged by a storm or another covered event, documenting the condition of the roof can be an important part of the insurance process.',
    paragraph2:
      'R&C can inspect the roof and document relevant damage. We can also provide contractor-side information related to the roofing scope.',
    image: {
      src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      alt: 'Insurance documentation process',
    },
    disclaimer:
      'R&C Roofing Contractors is not a public adjuster. We do not adjust claims, negotiate insurance settlements, represent policyholders in claim negotiations, or guarantee claim outcomes.',
    timelineSteps: [
      {
        title: 'Inspect the Roof',
        description:
          'We evaluate the roofing system and document visible conditions that may be relevant to the damage.',
        icon: 'tabler:search',
      },
      {
        title: 'Document the Findings',
        description: "Photos and inspection findings create a record of the roof's condition.",
        icon: 'tabler:camera',
      },
      {
        title: 'Submit Your Claim',
        description:
          'You file the claim directly with your insurance carrier. R&C can provide roofing documentation that may be requested during the process.',
        icon: 'tabler:file-upload',
      },
      {
        title: 'Provide Roofing Scope Information',
        description:
          'If your carrier requests contractor information or a roofing scope, R&C can provide information related to the proposed work.',
        icon: 'tabler:file-description',
      },
      {
        title: 'Complete the Roofing Work',
        description:
          'If the project moves forward, R&C can complete the repair or replacement based on the agreed scope.',
        icon: 'tabler:check',
      },
    ],
  },

  recentProjects: {
    title: 'Recent Roofing Projects on Oahu',
    subtitle: 'See examples of roofing work completed by R&C for properties on Oahu.',
    projects: [
      { title: 'Project 1', description: 'Roofing project details coming soon.' },
      { title: 'Project 2', description: 'Roofing project details coming soon.' },
      { title: 'Project 3', description: 'Roofing project details coming soon.' },
    ],
    ctaText: 'View Our Project Gallery',
    ctaHref: '/about/gallery',
  },

  testimonials: {
    title: 'What R&C Customers Say',
    subtitle: 'See what customers have shared about their experience working with R&C Roofing Contractors.',
    items: [
      {
        testimonial: 'Review content coming soon. This section will display verified Google/Yelp reviews.',
        name: 'Customer Name',
        job: 'Homeowner, Oahu',
      },
      {
        testimonial: 'Review content coming soon. This section will display verified Google/Yelp reviews.',
        name: 'Customer Name',
        job: 'Property Manager, Oahu',
      },
      {
        testimonial: 'Review content coming soon. This section will display verified Google/Yelp reviews.',
        name: 'Customer Name',
        job: 'Homeowner, Oahu',
      },
    ],
    ctaText: 'Read More Reviews',
    ctaHref: '/about/reviews',
  },

  serviceAreas: {
    heading: 'Roofing Services Across Oahu',
    subheading:
      'R&C Roofing Contractors is based in Honolulu and serves properties within its Oahu service area.',
    areas: [
      { title: 'South Shore', description: 'Honolulu, Waikiki, Kaimuki, Manoa, Hawaii Kai' },
      { title: 'Windward Oahu', description: 'Kailua, Kaneohe' },
      { title: 'Central Oahu', description: 'Aiea, Pearl City, Mililani, Waipahu' },
      { title: 'Leeward Oahu', description: 'Kapolei, Ewa Beach' },
    ],
    ctaText: 'Explore Areas We Serve',
    ctaHref: '/who-we-serve',
  },

  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How do I know if my roof needs repair or replacement?',
        answer:
          'Start with an inspection. R&C can evaluate the condition of the roof and explain whether the problem appears suitable for repair or whether replacement should be considered.',
      },
      {
        question: 'What is a HAAG Certified roof inspector?',
        answer:
          "HAAG certification includes specialized education and testing in roof damage assessment. R&C's Robert Pilato holds HAAG certification #201408313.",
      },
      {
        question: 'Can R&C inspect storm damage?',
        answer: 'Yes. R&C can inspect visible roof damage after a storm and document relevant findings.',
      },
      {
        question: 'Can R&C help with a roof insurance claim?',
        answer:
          'R&C can inspect and document roof damage and provide contractor-side information related to the roofing work. We do not act as public adjusters or negotiate insurance settlements.',
      },
      {
        question: 'What roofing services does R&C provide?',
        answer:
          'R&C provides roof inspections and roofing services for residential and commercial properties. Services include roof repair, roof replacement, new roof installation, insurance claim documentation, and gutter installation.',
      },
      {
        question: 'Where does R&C Roofing Contractors provide service?',
        answer:
          'R&C is based in Honolulu and serves properties within its Oahu service area. Contact the team with your property location to confirm service availability.',
      },
    ],
  },

  ctaBanner: {
    title: 'Find Out What Is Happening With Your Roof',
    subtitle:
      'If you have noticed a leak, storm damage, or another change in your roof, start with an inspection. R&C Roofing Contractors can evaluate the roof and explain what the findings mean for your property.',
    showAfterHoursNote: true,
  },
};
