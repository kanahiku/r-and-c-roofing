import type { ServicePageSeed } from './servicePages';
import { inspectionProcessIcons, inspectionServices, otherInspectionServices } from './roofInspections';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

const inspectionHero = {
  ctaText: 'Schedule Inspection',
  ...contactCta,
  ...phone,
} as const;

const otherServicesIntro =
  'We offer specialized evaluations for different stages of property ownership.';

const processIntro = 'We follow a strict assessment protocol to give you clear answers.';

export const inspectionPages: ServicePageSeed[] = [
  {
    _id: 'service-page-roof-inspections',
    title: 'Roof inspections hub',
    slug: 'roof-inspections',
    meta: {
      title: 'Roof Inspections Oahu | HAAG Certified | R&C Roofing',
      description:
        'Get the facts before replacing your roof. R&C Roofing provides HAAG-certified inspections on Oahu to determine if you need a repair or a replacement.',
    },
    hero: {
      title: 'Oahu Roof Inspections',
      subtitle:
        "Get the facts before you pay for construction. We evaluate your roof's actual condition to determine if you need a repair or a full replacement.",
      ...inspectionHero,
      imagePlaceholder: 'Roof inspection photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'When to Call for an Inspection',
        intro:
          'You do not need to wait for water to pour into your living room. A professional evaluation clarifies your next steps across several situations:',
        items: [
          {
            title: 'Active Leaks',
            description: 'We trace interior ceiling stains to the exact exterior breach.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Post-Storm Checks',
            description: 'We identify hidden wind or debris damage after severe Oahu weather.',
            icon: 'tabler:wind',
          },
          {
            title: 'Real Estate Transactions',
            description: 'We evaluate structural conditions before you buy or sell a property.',
            icon: 'tabler:home',
          },
          {
            title: 'Aging Materials',
            description: 'We determine if an older roof needs replacement or targeted maintenance.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Insurance Claims',
            description: 'We document visible damage professionally for your carrier.',
            icon: 'tabler:file-text',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Specialized Inspection Services',
        intro:
          'Different situations require different diagnostic approaches. Choose the assessment that matches your current property needs from our core inspection services:',
        display: 'directory',
        items: inspectionServices,
      },
      {
        _type: 'iconPointsSection',
        heading: 'What You Get From an R&C Roofing Inspection',
        intro:
          'We provide structural clarity rather than a high-pressure sales pitch. Every inspection delivers concrete evidence so you can make an informed decision:',
        items: [
          {
            title: 'Visual Documentation',
            description:
              'Clear photographic proof of any damaged shingles, rusted flashing, or underlying wood rot we uncover.',
            icon: 'tabler:camera',
          },
          {
            title: 'Condition Analysis',
            description: "An evaluation of your materials' remaining lifespan based on local island weather exposure.",
            icon: 'tabler:search',
          },
          {
            title: 'Damage Mapping',
            description: 'Pinpointing exactly where the roof is failing and whether the issue is localized or widespread.',
            icon: 'tabler:map-pin',
          },
          {
            title: 'Actionable Recommendations',
            description: 'Clear guidance on the practical next steps required to secure your property.',
            icon: 'tabler:clipboard-check',
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'The HAAG Certification Advantage',
        paragraphs: [
          'Standard contractors often lack the training to properly identify complex damage. Robert Pilato (Cert #201408313) is a HAAG Certified roof inspector.',
          'This specialized credential provides a structured approach to evaluating wear, allowing us to distinguish between normal island weathering and sudden storm impacts so you get accurate data for your property decisions.',
        ],
        imagePlaceholder: 'HAAG certified roof inspection photo placeholder',
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Will you automatically recommend a new roof?',
          answer:
            'No. We recommend a repair if a localized fix can safely address the problem while the surrounding roof remains serviceable.',
        },
        {
          question: 'Do I need to be home during the inspection?',
          answer:
            'Only if we need to access the interior of your property. We require you to be present if your concern involves a ceiling leak or an attic condition.',
        },
        {
          question: 'Can an inspection help with my insurance claim?',
          answer:
            'Yes. We document visible roofing conditions and provide contractor side information. Please note that R&C Roofing is not a public adjuster. We do not negotiate settlements or guarantee claim outcomes.',
        },
        {
          question: 'Can R&C repair the roof after inspecting it?',
          answer:
            'Yes. We operate under Hawaii Contractor License C-33642. Our crews can execute the necessary repairs or a full replacement if we find damage.',
        },
        {
          question: 'How much does a roof inspection cost?',
          answer:
            'Pricing depends entirely on the property and the type of inspection requested. Contact us directly to confirm availability and pricing for your specific situation.',
        },
      ],
    },
    ctaBanner: {
      title: 'Stop Guessing About Your Roof',
      subtitle: 'Find out exactly what is happening before you commit to a construction contract.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-inspections-haag',
    title: 'HAAG Certified Inspection',
    slug: 'roof-inspections/haag-certified-inspection',
    meta: {
      title: 'HAAG Certified Roof Inspector Hawaii | R&C Roofing',
      description:
        'Schedule a HAAG Certified roof inspection with R&C Roofing Contractors. Get specialized roof damage assessment and documented findings for your Oahu property.',
    },
    hero: {
      title: 'HAAG Certified Roof Inspections on Oahu',
      subtitle: 'Find out exactly what happened to your roof with forensic damage assessment training.',
      ...inspectionHero,
      imagePlaceholder: 'HAAG certified inspection photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'The HAAG Certification Difference',
        intro:
          'Standard visual inspections often misdiagnose normal aging as storm damage or miss the root cause of a leak entirely. HAAG certification provides a structured, forensic method to evaluate your property accurately. Robert Pilato (Certification #201408313) brings this advanced diagnostic training directly to Oahu. We distinguish between conditions that look similar but have entirely different structural causes.',
        featureLabel: 'Feature',
        column1: 'Standard Roof Inspection',
        column2: 'HAAG Certified Assessment',
        rows: [
          {
            feature: 'Primary Focus',
            cell1: 'General condition and age estimation.',
            cell2: 'Forensic root cause of specific damage.',
          },
          {
            feature: 'Damage Evaluation',
            cell1: 'Visual guesses based on basic contractor experience.',
            cell2: 'Engineering-backed diagnostic standards.',
          },
          {
            feature: 'Insurance Utility',
            cell1: 'Provides a basic repair estimate.',
            cell2: 'Delivers objective, structured evidence for your carrier.',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'What We Evaluate During an Assessment',
        intro: 'A damaged component does not always tell the full story. We look deeper to find the root cause.',
        items: [
          {
            title: 'Visible Damage Patterns',
            description: 'We analyze where the damage appears and how it affects surrounding materials.',
            icon: 'tabler:eye',
          },
          {
            title: 'Material Deterioration',
            description: 'We evaluate existing wear alongside the structural condition of your specific roofing type.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Storm-Related Impacts',
            description: 'We identify physical evidence directly correlated to high winds and severe weather.',
            icon: 'tabler:wind',
          },
          {
            title: 'Hidden Failure Points',
            description: 'We investigate previous repairs and installation errors that contribute to current leaks.',
            icon: 'tabler:search',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'When a HAAG Inspection Makes Sense',
        intro: 'You need objective data when the cause or extent of your roof damage is unclear.',
        items: [
          {
            title: 'After Severe Weather',
            description: 'Document the exact condition of your materials after high winds impact your neighborhood.',
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'During Insurance Claims',
            description: 'Provide your insurance carrier with professional contractor documentation regarding visible damage.',
            icon: 'tabler:file-text',
          },
          {
            title: 'For Unexplained Leaks',
            description: 'Uncover the true source of water intrusion when the visual cause is not obvious.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Before Major Repairs',
            description: 'Get a definitive assessment before committing to a costly replacement project.',
            icon: 'tabler:home-check',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Works',
        intro: processIntro,
        steps: [
          {
            title: 'Listen',
            description: 'We start by understanding your specific concerns and observations.',
            icon: inspectionProcessIcons.listen,
          },
          {
            title: 'Evaluate',
            description: 'We safely access your roof to assess the visible materials and structural components.',
            icon: inspectionProcessIcons.evaluate,
          },
          {
            title: 'Document',
            description: 'We capture photographs and detailed notes to create a clear record of the damage.',
            icon: inspectionProcessIcons.document,
          },
          {
            title: 'Recommend',
            description: 'We explain our findings and advise you on the most practical repair or replacement options.',
            icon: inspectionProcessIcons.recommend,
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'How We Support Your Insurance Claim',
        paragraphs: [
          'A HAAG Certified inspection provides contractor-side evidence for your insurance file. It does not guarantee claim approval. Your insurance carrier makes all final coverage decisions based on your specific policy language.',
          'R&C Roofing Contractors is not a public adjuster. We do not negotiate settlements or represent policyholders in claim disputes.',
        ],
        imagePlaceholder: 'Insurance claim roof documentation photo placeholder',
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Inspection Services',
        intro: otherServicesIntro,
        display: 'directory',
        items: otherInspectionServices('/roof-inspections/haag-certified-inspection', true),
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is a HAAG Certified Inspector?',
          answer:
            "A HAAG Certified Inspector has completed specialized forensic damage assessment training. R&C's Robert Pilato holds HAAG Certification #201408313.",
        },
        {
          question: 'Is this different from a standard roof inspection?',
          answer:
            'Yes. The inspector applies advanced diagnostic training to distinguish between normal wear and actual structural damage.',
        },
        {
          question: 'Do I need this inspection after every storm?',
          answer:
            'No. You should request this evaluation if you notice new leaks, displaced materials, or visible changes after severe weather.',
        },
        {
          question: 'Will this report prove my insurance claim is covered?',
          answer:
            'No. We provide objective contractor documentation of the damage, but your insurance carrier dictates all final coverage decisions.',
        },
        {
          question: 'Can R&C repair the roof after the inspection?',
          answer: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute the necessary repairs or full replacement.',
        },
      ],
    },
    ctaBanner: {
      title: 'Get a Closer Look at Your Roof Damage',
      subtitle: 'Find out exactly what is happening before you commit to a construction contract.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-inspections-pre-purchase',
    title: 'Pre-Purchase Roof Inspection',
    slug: 'roof-inspections/pre-purchase-roof-inspection',
    meta: {
      title: 'Pre-Purchase Roof Inspections Oahu | R&C Roofing',
      description:
        'Schedule a pre-purchase roof inspection on Oahu with R&C Roofing Contractors. Get a closer look at roof condition before moving forward with a real estate transaction.',
    },
    hero: {
      title: 'Pre-Purchase Roof Inspections on Oahu',
      subtitle:
        'Understand the true condition of the roof before you close. We evaluate the structure to protect you from unexpected repair costs after you buy.',
      ...inspectionHero,
      imagePlaceholder: 'Pre-purchase inspection photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'Standard Home Inspection vs. Dedicated Roof Assessment',
        intro:
          'A general home inspection covers many parts of a property but often misses specific roofing failures. We provide a dedicated structural evaluation. Robert Pilato (Certification #201408313) brings advanced diagnostic training to assess the exact condition of the materials based on local island weather exposure.',
        featureLabel: 'Feature',
        column1: 'Standard Home Inspection',
        column2: 'Pre-Purchase Roof Assessment',
        rows: [
          {
            feature: 'Primary Focus',
            cell1: 'Broad overview of the entire property.',
            cell2: 'Deep structural evaluation of the roofing system.',
          },
          {
            feature: 'Damage Evaluation',
            cell1: 'Basic visual checks from the ground or ladder.',
            cell2: 'Comprehensive material and component analysis.',
          },
          {
            feature: 'Actionable Utility',
            cell1: 'Highlights general property concerns.',
            cell2: 'Delivers specific repair scopes and structural documentation.',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'What We Evaluate During an Assessment',
        intro: 'A damaged component does not always tell the full story. We look deeper to find the root cause.',
        items: [
          {
            title: 'Roofing Materials',
            description: 'We look for visible deterioration, shifted components, and previous patchwork.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Flashing and Penetrations',
            description: 'We inspect vents, pipes, and skylights for proper sealing and water-entry vulnerabilities.',
            icon: 'tabler:circle-dashed',
          },
          {
            title: 'Edges and Drainage',
            description: 'We review roof edges, valleys, and gutters to ensure water moves away from the structure.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Exposed Metal',
            description: 'We check fasteners and flashing for corrosion caused by coastal salt air exposure.',
            icon: 'tabler:sun',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'When a Pre-Purchase Inspection Makes Sense',
        intro: 'You need objective data when the cause or extent of your roof damage is unclear.',
        items: [
          {
            title: 'Older Materials',
            description: 'The roof is aging and its repair history is unclear.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Flagged Concerns',
            description: 'A general home inspector identified a potential roofing issue that needs expert review.',
            icon: 'tabler:flag',
          },
          {
            title: 'Visible Water Signs',
            description: 'You see evidence of interior ceiling stains or previous leak repairs.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Severe Exposure',
            description: 'The property sits in a high-wind or heavy-rain microclimate on Oahu.',
            icon: 'tabler:wind',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Works',
        intro: processIntro,
        steps: [
          {
            title: 'Listen',
            description: 'We review the property details and any known concerns from previous general inspections.',
            icon: inspectionProcessIcons.listen,
          },
          {
            title: 'Evaluate',
            description: 'We safely access the roof to inspect the materials, flashing, and drainage components.',
            icon: inspectionProcessIcons.evaluate,
          },
          {
            title: 'Document',
            description: 'We capture photographs and detailed notes to record the exact physical condition of the roof.',
            icon: inspectionProcessIcons.document,
          },
          {
            title: 'Recommend',
            description:
              'We explain our findings and advise if the property requires maintenance, repair, or a full replacement.',
            icon: inspectionProcessIcons.recommend,
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'Using Your Inspection Findings',
        paragraphs: [
          'A pre-purchase inspection provides structural facts to inform your buying decision. It does not predict an exact failure date or guarantee future performance.',
          'How you use these findings during real estate negotiations is up to you and your agent. R&C Roofing Contractors provides objective contractor documentation and repair estimates to support your due diligence.',
        ],
        imagePlaceholder: 'Pre-purchase inspection findings photo placeholder',
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Inspection Services',
        intro: otherServicesIntro,
        display: 'cards',
        items: otherInspectionServices('/roof-inspections/pre-purchase-roof-inspection'),
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is a roof inspection different from a general home inspection?',
          answer:
            'Yes. A dedicated roof inspection focuses strictly on the structural integrity of the roofing system rather than a broad property overview.',
        },
        {
          question: 'Can R&C tell me exactly how many years the roof has left?',
          answer:
            'No. We evaluate visible deterioration to determine if you need immediate repair or replacement rather than predicting an exact failure date.',
        },
        {
          question: 'Can the inspection findings be used during negotiations?',
          answer: 'Yes. You can use our objective documentation and repair estimates to inform your discussions with the seller.',
        },
        {
          question: 'Does R&C inspect the attic?',
          answer:
            'Yes. We review accessible interior attic areas when they are highly relevant to a specific leak or roofing concern.',
        },
        {
          question: 'Can R&C complete repairs after the inspection?',
          answer:
            'Yes. We operate under Hawaii Contractor License C-33642 and can execute any necessary repairs if you purchase the property.',
        },
      ],
    },
    ctaBanner: {
      title: 'Know More About the Roof Before You Close',
      subtitle: 'Find out exactly what is happening before you commit to a real estate transaction.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-inspections-pre-listing',
    title: 'Pre-Listing Roof Inspection',
    slug: 'roof-inspections/pre-listing-roof-inspection',
    meta: {
      title: 'Pre-Listing Roof Inspection Oahu | R&C Roofing',
      description:
        'Selling a home on Oahu? A pre-listing roof inspection from R&C helps you understand visible roof conditions before putting your property on the market.',
    },
    hero: {
      title: 'Pre-Listing Roof Inspections on Oahu',
      subtitle:
        'Know the exact condition of your roof before your home goes on the market. We provide the structural facts you need to make informed selling decisions.',
      ...inspectionHero,
      imagePlaceholder: 'Pre-listing inspection photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'Pre-Listing vs. Pre-Purchase Roof Inspections',
        intro:
          "Both inspections evaluate the roofing system, but they serve different sides of the real estate transaction. A pre-listing assessment helps you prepare before a buyer's inspector flags a potential problem.",
        featureLabel: 'Feature',
        column1: 'Pre-Listing Inspection',
        column2: 'Pre-Purchase Inspection',
        rows: [
          { feature: 'Primary User', cell1: 'The property seller.', cell2: 'The potential buyer.' },
          {
            feature: 'Timing',
            cell1: 'Before the property goes on the market.',
            cell2: "During the buyer's due diligence period.",
          },
          {
            feature: 'Primary Goal',
            cell1: 'Identify issues to address or disclose early.',
            cell2: 'Clarify structural concerns before finalizing a purchase.',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'What We Evaluate During an Assessment',
        intro: 'A damaged component does not always tell the full story. We look deeper to find the root cause.',
        items: [
          {
            title: 'Roofing Materials',
            description: 'We check for cracked, displaced, or significantly deteriorated shingles and tiles.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Flashing and Penetrations',
            description: 'We inspect the seals around vents, pipes, and transitions for water-entry vulnerabilities.',
            icon: 'tabler:circle-dashed',
          },
          {
            title: 'Previous Repair Areas',
            description: 'We evaluate older patchwork to ensure it remains structurally sound and localized.',
            icon: 'tabler:tool',
          },
          {
            title: 'Moisture Indicators',
            description: 'We look for visible evidence of previous leaks or poor drainage patterns.',
            icon: 'tabler:droplet',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'When a Pre-Listing Inspection Makes Sense',
        intro: "You need objective data before a buyer's inspector raises a red flag.",
        items: [
          {
            title: 'Aging Materials',
            description: 'You know the roof is older but lack clarity on its actual physical condition.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Undocumented Repairs',
            description: 'You or a previous owner completed patchwork without professional evaluation.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Past Storm Exposure',
            description: 'Your neighborhood experienced high winds and you want to rule out hidden damage.',
            icon: 'tabler:wind',
          },
          {
            title: 'Proactive Selling',
            description: 'You want a clear picture of your property to avoid surprises during buyer negotiations.',
            icon: 'tabler:home',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Works',
        intro: processIntro,
        steps: [
          {
            title: 'Listen',
            description: "We discuss the roof's history and any previous leaks you have already noticed.",
            icon: inspectionProcessIcons.listen,
          },
          {
            title: 'Evaluate',
            description: 'We safely access your roof to assess the visible materials and structural components.',
            icon: inspectionProcessIcons.evaluate,
          },
          {
            title: 'Document',
            description: 'We capture photographs and detailed notes to record the exact physical condition of the roof.',
            icon: inspectionProcessIcons.document,
          },
          {
            title: 'Recommend',
            description:
              'We explain our findings and advise if the property requires targeted maintenance or if monitoring is sufficient.',
            icon: inspectionProcessIcons.recommend,
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'Preparing Your Selling Strategy',
        paragraphs: [
          'A pre-listing inspection provides structural facts to inform your selling strategy. It does not prevent buyer objections or guarantee a flawless real estate transaction.',
          'How you use our documentation to satisfy seller disclosure requirements is entirely up to you and your real estate agent. R&C Roofing Contractors simply provides objective contractor documentation and potential repair scopes to support your preparation.',
        ],
        imagePlaceholder: 'Pre-listing roof inspection photo placeholder',
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Inspection Services',
        intro: otherServicesIntro,
        display: 'cards',
        items: otherInspectionServices('/roof-inspections/pre-listing-roof-inspection'),
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Do I have to repair everything R&C finds?',
          answer:
            'No. We outline the physical conditions we find, but you decide whether to repair, replace, or simply disclose the information to potential buyers.',
        },
        {
          question: 'Should I replace an older roof before listing my house?',
          answer:
            'Not automatically based on age alone. We evaluate the physical condition to determine if targeted repairs are sufficient or if a full replacement is structurally necessary.',
        },
        {
          question: "Is this different from the buyer's home inspection?",
          answer:
            "Yes. This is a dedicated roofing evaluation you order before listing, whereas a buyer's general inspection is a broad property overview ordered later in the transaction.",
        },
        {
          question: 'Can R&C tell me what I am legally required to disclose?',
          answer:
            'No. We provide technical roofing facts, but you must direct all questions about legal disclosure obligations to your real estate professional.',
        },
        {
          question: 'Can R&C complete repairs before I list the home?',
          answer: 'Yes. We operate under Hawaii Contractor License C-33642 and can execute any necessary roofing work prior to your sale.',
        },
      ],
    },
    ctaBanner: {
      title: 'Sell With a Clearer Understanding of the Roof',
      subtitle: 'Find out exactly what is happening before you put your home on the market.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-inspections-storm',
    title: 'Storm & Wind Damage Inspection',
    slug: 'roof-inspections/storm-and-wind-damage-inspection',
    meta: {
      title: 'Storm & Wind Damage Roof Inspections Oahu | R&C Roofing',
      description:
        'Schedule a storm damage roof inspection on Oahu with R&C Roofing Contractors. Get HAAG Certified assessment and documentation of visible wind and roof damage.',
    },
    hero: {
      title: 'Storm & Wind Damage Roof Inspections on Oahu',
      subtitle:
        'Find out what the storm actually did to your roof. We identify hidden structural impacts before they turn into major leaks.',
      ...inspectionHero,
      imagePlaceholder: 'Storm damage inspection photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'Hidden Wind Damage vs. Visible Storm Impacts',
        intro:
          'High winds can lift shingles and break seals without blowing the materials off your property entirely. When the storm passes, your roof may look normal from the driveway while remaining structurally compromised. Robert Pilato (Certification #201408313) applies specialized HAAG damage assessment training to find what a standard ground-level check misses.',
        featureLabel: 'Feature',
        column1: 'Standard Ground Check',
        column2: 'Professional Storm Assessment',
        rows: [
          {
            feature: 'Primary Focus',
            cell1: 'Missing shingles and obvious debris.',
            cell2: 'Hidden wind uplift and broken seals.',
          },
          {
            feature: 'Damage Evaluation',
            cell1: 'What you can safely see from the yard.',
            cell2: 'Hands-on inspection of fasteners and flashing.',
          },
          {
            feature: 'Actionable Utility',
            cell1: 'Confirms obvious exterior issues.',
            cell2: 'Provides structural documentation for insurance claims.',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'What We Evaluate After a Storm',
        intro:
          'A damaged component does not always tell the full story. We look deeper to find the root cause of storm-related failures.',
        items: [
          {
            title: 'Lifted Materials',
            description: 'We inspect shingles and metal components for broken adhesive seals and wind uplift.',
            icon: 'tabler:wind',
          },
          {
            title: 'Flashing Damage',
            description: 'We check the metal transitions around vents and pipes for bent or loosened materials.',
            icon: 'tabler:border-corners',
          },
          {
            title: 'Debris Impact',
            description: 'We identify structural bruising or punctures caused by airborne branches.',
            icon: 'tabler:tree',
          },
          {
            title: 'Drainage Blockages',
            description: 'We review valleys and gutters for storm debris that forces water under your roofing materials.',
            icon: 'tabler:droplet',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'When a Storm Inspection Makes Sense',
        intro: 'You do not need to diagnose the problem yourself. Call for an evaluation if you notice any of these physical changes.',
        items: [
          {
            title: 'Missing Materials',
            description: 'You see shingles, tiles, or metal components in your yard.',
            icon: 'tabler:home',
          },
          {
            title: 'New Interior Leaks',
            description: 'Water appears on your ceiling immediately following severe weather.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Visible Impact',
            description: 'Branches or heavy debris physically struck your property.',
            icon: 'tabler:alert-triangle',
          },
          {
            title: 'Displaced Metal',
            description: 'You notice bent fascia, soffits, or loosened roof edge materials.',
            icon: 'tabler:tools',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Works',
        intro: 'We follow a strict assessment protocol to give you clear answers safely.',
        steps: [
          {
            title: 'Listen',
            description: 'We discuss the specific weather event and what physical changes you noticed.',
            icon: inspectionProcessIcons.listen,
          },
          {
            title: 'Evaluate',
            description: 'We safely access the roof surface to inspect materials, fasteners, and impact zones.',
            icon: inspectionProcessIcons.evaluate,
          },
          {
            title: 'Document',
            description: 'We capture photographs and detailed notes to record the exact physical condition of the damage.',
            icon: inspectionProcessIcons.document,
          },
          {
            title: 'Recommend',
            description: 'We explain our findings and advise if you need a localized repair or a full replacement.',
            icon: inspectionProcessIcons.recommend,
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'Building Your Claim Documentation',
        paragraphs: [
          'A storm damage inspection provides contractor-side evidence for your insurance file. It does not guarantee claim approval. Your insurance carrier makes all final coverage decisions based on your specific policy language.',
          'R&C Roofing Contractors is not a public adjuster. We do not negotiate settlements or represent policyholders in claim disputes.',
        ],
        imagePlaceholder: 'Storm damage claim documentation photo placeholder',
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Inspection Services',
        intro: otherServicesIntro,
        display: 'cards',
        items: otherInspectionServices('/roof-inspections/storm-and-wind-damage-inspection'),
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'How do I know if my roof has wind damage?',
          answer:
            'Visible signs include missing materials, new leaks, or debris impact. Wind uplift often breaks seals without blowing shingles off entirely, which requires a professional inspection to identify.',
        },
        {
          question: 'Should I climb onto my roof after a storm?',
          answer: 'No. Wet or damaged roofs create severe safety risks.',
        },
        {
          question: 'Can R&C document storm damage for an insurance claim?',
          answer: 'Yes. We inspect accessible areas and provide objective contractor documentation of the visible damage.',
        },
        {
          question: 'Does homeowners insurance cover roof wind damage?',
          answer: 'Coverage depends entirely on the terms and exclusions of your individual policy.',
        },
        {
          question: 'Should I have my roof inspected after every storm?',
          answer:
            'No. You only need an inspection if you notice a new leak, displaced materials, or visible debris impact after severe weather.',
        },
      ],
    },
    ctaBanner: {
      title: 'Check Your Roof After Severe Weather',
      subtitle: 'Find out exactly what is happening before you commit to a construction contract.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-inspections-annual',
    title: 'Annual Maintenance Inspection',
    slug: 'roof-inspections/annual-maintenance-inspection',
    meta: {
      title: 'Annual Roof Maintenance Inspections Oahu | R&C Roofing',
      description:
        'Schedule an annual roof maintenance inspection on Oahu with R&C Roofing Contractors. Identify visible wear, document roof conditions, and address developing problems before they become larger repairs.',
    },
    hero: {
      title: 'Annual Roof Maintenance Inspections on Oahu',
      subtitle:
        'Keep a closer eye on your roof’s condition. We identify minor wear and structural vulnerabilities before they turn into expensive interior leaks.',
      ...inspectionHero,
      imagePlaceholder: 'Annual maintenance inspection photo placeholder',
    },
    sections: [
      {
        _type: 'comparisonTableSection',
        heading: 'Reactive Repairs vs. Preventative Maintenance',
        intro:
          'Roof problems do not always start with water pouring through your ceiling. Robert Pilato (Certification #201408313) brings advanced diagnostic training to catch structural deterioration early, saving you from emergency construction costs.',
        featureLabel: 'Feature',
        column1: 'Reactive Leak Repair',
        column2: 'Preventative Maintenance',
        rows: [
          {
            feature: 'Primary Focus',
            cell1: 'Stopping active water intrusion.',
            cell2: 'Tracking material lifespan and wear.',
          },
          {
            feature: 'Damage Evaluation',
            cell1: 'Emergency patching of a failed component.',
            cell2: 'Systematic review of all vulnerabilities.',
          },
          {
            feature: 'Actionable Utility',
            cell1: 'High-stress, immediate damage control.',
            cell2: 'Predictable budgeting and long-term planning.',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: 'What We Evaluate During an Assessment',
        intro: 'A damaged component does not always tell the full story. We look deeper to find the root cause of localized wear.',
        items: [
          {
            title: 'Roofing Materials',
            description: 'We check for UV degradation, cracking, and surface wear across your specific material type.',
            icon: 'tabler:sun',
          },
          {
            title: 'Flashing and Penetrations',
            description: 'We inspect the seals around vents, pipes, and skylights where water intrusion typically begins.',
            icon: 'tabler:circle-dashed',
          },
          {
            title: 'Edges and Drainage',
            description: 'We review valleys, gutters, and roof edges to ensure water moves cleanly off the structure.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Exposed Metal',
            description: 'We check fasteners and structural metal for corrosion accelerated by coastal salt air.',
            icon: 'tabler:anchor',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why Routine Roof Inspections Matter on Oahu',
        intro: "You need objective data to protect your property investment across Oahu's unique microclimates.",
        items: [
          {
            title: 'Coastal Exposure',
            description: 'Monitor salt air corrosion on exposed metal roofing components and fasteners.',
            icon: 'tabler:droplet',
          },
          {
            title: 'High UV and Heat',
            description: 'Track the aging and drying out of roofing materials and sealants under intense sun.',
            icon: 'tabler:sun',
          },
          {
            title: 'Heavy Moisture Areas',
            description: 'Identify debris buildup and drainage issues in wetter island regions before they cause rot.',
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'Complex Roof Systems',
            description: 'Stay ahead of wear on roofs with multiple valleys, skylights, and transition points.',
            icon: 'tabler:home',
          },
        ],
      },
      {
        _type: 'timelineSection',
        heading: 'How Our Inspection Process Works',
        intro: processIntro,
        steps: [
          {
            title: 'Listen',
            description: "We review the roof's history and any minor changes you have noticed since the last evaluation.",
            icon: inspectionProcessIcons.listen,
          },
          {
            title: 'Evaluate',
            description: 'We safely access your roof to assess visible materials, flashing, and drainage components.',
            icon: inspectionProcessIcons.evaluate,
          },
          {
            title: 'Document',
            description: 'We capture photographs and detailed notes to build a continuous historical record of your property.',
            icon: inspectionProcessIcons.document,
          },
          {
            title: 'Recommend',
            description: 'We explain our findings and advise if you need a targeted repair or simply continued monitoring.',
            icon: inspectionProcessIcons.recommend,
          },
        ],
      },
      {
        _type: 'splitContentSection',
        heading: 'Managing Your Long-Term Roof Health',
        paragraphs: [
          'An annual maintenance inspection provides structural facts to inform your property management strategy. It does not guarantee your roof will never leak, nor does it predict the exact day a material will fail.',
          'How you use our documentation to budget for AOAO, HOA, or commercial property reserves is up to you and your management board. R&C Roofing Contractors simply provides objective contractor documentation and targeted repair scopes to keep your property secure over time.',
        ],
        imagePlaceholder: 'Long-term roof health inspection photo placeholder',
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Our Other Inspection Services',
        intro: otherServicesIntro,
        display: 'cards',
        items: otherInspectionServices('/roof-inspections/annual-maintenance-inspection'),
      },
    ],
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Does every roof need an annual inspection?',
          answer:
            'Not every roof has the same maintenance needs. Age, location, and environmental exposure dictate your ideal schedule, but an annual check provides consistent tracking.',
        },
        {
          question: 'Is a maintenance inspection only for older roofs?',
          answer:
            'No. Newer roofs can still develop localized issues around flashing, penetrations, or drainage areas before the main materials age.',
        },
        {
          question: 'Can R&C inspect multiple buildings for an HOA or commercial property?',
          answer:
            'Yes. We work with property managers and boards to evaluate multi-unit properties and provide contractor-side recommendations.',
        },
        {
          question: 'Should I schedule another inspection after a storm?',
          answer:
            'Yes. If you notice missing materials or a new leak after severe weather, request a dedicated storm damage inspection even if your annual check is not due.',
        },
        {
          question: 'Can R&C repair the damage found during maintenance?',
          answer:
            "Yes. We operate under Hawaii Contractor License C-33642 and can execute any targeted repairs necessary to extend your roof's lifespan.",
        },
      ],
    },
    ctaBanner: {
      title: 'Keep Track of Your Roof Before a Problem Becomes Urgent',
      subtitle: 'Find out exactly what is happening before you commit to a major repair.',
      ctaText: 'Schedule Inspection',
      ctaHref: '/contact',
    },
  },
];
