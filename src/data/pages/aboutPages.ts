import type { ServicePageSeed } from './servicePages';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

export const aboutPages: ServicePageSeed[] = [
  {
    _id: 'service-page-about-our-story',
    title: 'Our Story',
    slug: 'about/our-story',
    meta: {
      title: 'Our Story | R&C Roofing Contractors Hawaii',
      description:
        'Learn the story behind R&C Roofing Contractors, the experience that shaped our inspection-first approach, and the roofing expertise behind our work on Oahu.',
    },
    hero: {
      title: 'Our Story: A Different Way of Looking at Roofing',
      subtitle:
        'Most people do not spend much time thinking about their roof until something changes. By the time someone calls a roofing contractor, they are often already wondering whether they need a complete roof replacement. That uncertainty has shaped the way R&C Roofing Contractors approaches the work. We do not start with the assumption that every roofing problem needs a major construction project. The first step is understanding what is actually happening.',
      ctaText: 'Schedule a Roof Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Our story photo placeholder',
    },
    sections: [
      {
        _type: 'splitContentSection',
        heading: 'Experience Has Shaped How We Make Decisions',
        paragraphs: [
          'R&C Roofing is a locally owned company bringing more than 50 years of combined crew experience to Oahu. We have seen firsthand how different problems produce similar symptoms.',
          'A ceiling stain may point to a localized issue, while leaks in different areas tell a different story. The right answer is not always the biggest answer. Our team walks you through different materials to find the exact solution that fits your property, delivering quality workmanship in a safe environment.',
        ],
        imagePlaceholder: 'R&C Roofing crew standing in front of branded company truck',
      },
      {
        _type: 'splitContentSection',
        heading: 'Why Inspection Drives Our Work',
        paragraphs: [
          'The purpose of an inspection is not to create a reason for construction, but to create a clearer basis for making a roofing decision.',
          'Because we operate under Hawaii contractor license C-33642, we move seamlessly from evaluating a condition into construction when work is appropriate. R&C Roofing brings specialized damage assessment expertise through Robert Pilato, HAAG Certified Inspector (#201408313). We connect our findings to practical options: repair, replacement, additional evaluation, or continued monitoring.',
        ],
        ctaText: 'Explore HAAG Certified Roof Inspections',
        ctaHref: '/roof-inspections/haag-certified-inspection',
        imagePlaceholder: 'HAAG inspection photo placeholder',
      },
      {
        _type: 'iconPointsSection',
        heading: 'Local Expertise for Oahu Roofs',
        intro:
          'Conditions change considerably from one part of Oahu to another. We avoid relying on generic lifespan rules because the physical condition of the roof matters more. Oahu properties face distinct local challenges:',
        items: [
          {
            title: 'Coastal Exposure',
            description: 'High exposure to salt in the air for properties near the water.',
            icon: 'tabler:ripple',
          },
          {
            title: 'Moisture Variations',
            description: 'Windward and leeward areas experience drastically different rainfall patterns.',
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'Weather Extremes',
            description: 'Strong sun, heavy rain, and high wind events all accelerate wear.',
            icon: 'tabler:sun',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'The Credentials Behind the Approach',
        intro:
          "The philosophy behind R&C Roofing's work is supported by qualifications that our customers can verify. Each of these credentials serves a different purpose, but they all support the same mission: understand the condition carefully, explain what is found, and connect the findings to the roofing work that actually makes sense.",
        items: [
          {
            title: 'Hawaii Contractor License',
            description: 'C-33642',
            icon: 'tabler:certificate',
          },
          {
            title: 'Specialized Certification',
            description: 'HAAG Certified Inspector (Robert Pilato, #201408313)',
            icon: 'tabler:badge',
          },
          {
            title: 'Industry Experience',
            description: '50+ Years of Combined Crew Experience',
            icon: 'tabler:clock',
          },
          {
            title: 'Professional Affiliation',
            description: 'Building Industry Association of Hawaii (BIA) Member',
            icon: 'tabler:building',
          },
        ],
      },
      {
        _type: 'yelpReviewsSection',
        heading: 'What Our Oahu Clients Say',
        intro:
          'Our commitment to honest assessments and quality workmanship is reflected in the feedback we receive from the local community.',
        items: [
          { name: 'Ronald C.', reviewId: 'wfK95mJOJuhlnDWT6027ow', userId: 'RiSfA-nw1ngEY_q6tzwoQA' },
          { name: 'Nancy M.', reviewId: 'FB6iD9eGHe6Z2DRhu3Szgw', userId: 'jKtqiGp_z46RAmwxolPp7Q' },
          { name: 'Herman Y.', reviewId: 'cuFBoA_QIJoI59bmAyuDrg', userId: 'SW5560TYBu1fHCisx3wHWA' },
        ],
      },
    ],
    ctaBanner: {
      title: 'Where R&C Roofing Is Today',
      subtitle:
        'We provide roof inspections, roof repairs, roof replacements, and related roofing services across Oahu. Whether something has already gone wrong, or you want to understand your roof before a problem becomes serious, we understand the roof first. Then, we help you decide what comes next.',
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '/contact',
    },
  },
];
