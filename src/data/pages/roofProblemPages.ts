import type { ServicePageSeed } from './servicePages';
import {
  exploreFromBuy,
  exploreFromDenied,
  exploreFromEol,
  exploreFromHurricane,
  exploreFromLeak,
  exploreFromStorm,
} from './roofProblems';

const phone = {
  phoneCtaText: 'Call Now',
  phoneCtaHref: 'tel:+18088882524',
} as const;

const contactCta = { ctaHref: '/contact' as const };

export const roofProblemPages: ServicePageSeed[] = [
  {
    _id: 'service-page-roof-problems-leak',
    title: 'Common problem — My Roof Is Leaking',
    slug: 'roof-problems/my-roof-is-leaking',
    meta: {
      title: 'Roof Leaking on Oahu? Get It Checked | R&C Roofing',
      description:
        'Roof leaking during rain on Oahu? See what to do now, how urgent the leak may be, what could be causing it, and how R&C Roofing finds the source.',
    },
    hero: {
      title: 'My Roof Is Leaking. What Should I Do?',
      subtitle:
        'If water is entering your property, it rarely stops on its own and dry weather only hides the underlying issue. Get the roof checked promptly by licensed local professionals—backed by Hawaii License C-33642.',
      ctaText: 'Call About a Roof Leak',
      ctaHref: 'tel:+18088882524',
      phoneCtaText: 'Schedule an Inspection Online',
      phoneCtaHref: '/contact',
      imagePlaceholder: 'Roof leak photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'Immediate Checklist: What to Do Right Now',
        intro:
          'If water is entering your property, focus first on protecting your interior without putting yourself at physical risk:',
        layout: 'band',
        items: [
          {
            title: 'Protect Your Belongings',
            description:
              'Move furniture, electronics, and valuables away from active drips immediately. Place buckets or towels to catch water.',
            icon: 'tabler:sofa',
          },
          {
            title: 'Document the Damage',
            description:
              'Take clear photos of ceiling stains, active drips, and any visible water paths. Note the exact time the leak started.',
            icon: 'tabler:camera',
          },
          {
            title: 'Check the Attic (If Safe)',
            description:
              'If you have safe access to an attic space, look for damp insulation or framing to see where water is tracking.',
            icon: 'tabler:home',
          },
          {
            title: 'Stay Off the Roof',
            description:
              'Never climb onto a wet, slick roof during or right after a storm to investigate the leak yourself.',
            icon: 'tabler:alert-triangle',
          },
          {
            title: 'Schedule an Inspection',
            description:
              'Contact a professional promptly—even if the leak stops when the rain clears, dry weather only hides the underlying issue.',
            icon: 'tabler:calendar',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Why the Leak May Not Be Directly Above the Stain',
        intro:
          'Water does not always travel straight down. It often enters through a breach higher on the roof, then travels along underlayment, decking, or framing before pooling or showing up inside your living space:',
        layout: 'grid',
        items: [
          {
            title: 'Center of a Room',
            description: 'Water typically enters higher up the slope and migrates along structural components.',
            icon: 'tabler:layout',
          },
          {
            title: 'Near Exterior Walls',
            description: 'Often points to issues with roof edges, wall flashing, or transitions.',
            icon: 'tabler:wall',
          },
          {
            title: 'Around Vents or Skylights',
            description:
              'Usually indicates failing flashing, degraded rubber boots, or compromised penetration seals.',
            icon: 'tabler:stack-2',
          },
          {
            title: 'Wind-Driven Rain Only',
            description:
              'Highlights vulnerabilities where severe wind forces water upward beneath overlapping materials or compromised edges.',
            icon: 'tabler:wind',
          },
        ],
      },
      {
        _type: 'bulletCardsSection',
        heading: 'Repair vs. Replacement: What to Expect',
        intro:
          'A leak does not automatically mean you need a brand-new roof. We diagnose the root cause to recommend the most practical solution for your property:',
        items: [
          {
            title: 'When a Roof Repair Makes Sense',
            items: [
              'Isolated Scope — The leak is traced to a specific flashing failure, pipe boot, valley, or localized area.',
              'Sound Surroundings — The rest of your roofing system, underlayment, and decking remain in solid, serviceable condition.',
              'Cost-Effective Fix — A targeted repair resolves the issue completely without wasting money on an unnecessary replacement.',
            ],
          },
          {
            title: 'When a Roof Replacement is Recommended',
            items: [
              'Widespread Damage — There are multiple unrelated leak points, widespread material degradation, or sagging roof sections.',
              'End of Lifespan — The roof has aged past its useful service life and materials are failing across the board.',
              'Avoiding Recurring Costs — Continuing to patch an old, deteriorating roof will only lead to endless temporary fixes and higher long-term expenses.',
            ],
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If your leak is tied to a broader event or specific circumstance, explore our other dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromLeak,
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Call Us?',
        intro: "Getting a roof leak diagnosed and resolved shouldn't add to your stress:",
        layout: 'band',
        items: [
          {
            title: 'Report the Issue',
            description:
              "Call or schedule online to share what you're seeing (active drips, stains, or storm impacts).",
            icon: 'tabler:phone',
          },
          {
            title: 'Professional Diagnosis',
            description:
              'We perform a thorough inspection of your roof and attic space to trace the exact water entry point.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Recommendations',
            description:
              'We provide an honest, objective scope of work recommending a targeted repair or a replacement only if your roof requires it.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Stop Water Intrusion at the Source',
      subtitle:
        "Don't wait for the next storm to see if your roof holds up. Get professional, diagnostic answers today.",
      ctaText: 'Schedule an Inspection Online',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-problems-storm',
    title: 'Common problem — Storm Damage on My Roof',
    slug: 'roof-problems/storm-damage-on-my-roof',
    meta: {
      title: 'Storm Damage on Your Roof? What to Do | R&C Roofing',
      description:
        'Think a storm damaged your roof on Oahu? Learn what to check safely, what storm damage can look like, and how R&C Roofing determines whether repair, replacement, or insurance documentation may be needed.',
    },
    hero: {
      title: 'Storm Damage on My Roof. What Should I Do?',
      subtitle:
        'After strong wind or heavy rain, roof damage is not always obvious. You may find roofing material in the yard or notice a new ceiling stain, or the roof may look normal from the ground while you are left wondering what happened. Find out what the storm actually did to your roof with expert local evaluation, backed by Hawaii License C-33642.',
      ctaText: 'Schedule a Storm Damage Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Storm damage photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Call Us?',
        intro: "Getting your storm-damaged roof evaluated shouldn't add to your stress:",
        layout: 'band',
        items: [
          {
            title: 'Report the Storm Impact',
            description: 'Call or schedule online to share what you observed during or after the severe weather.',
            icon: 'tabler:phone',
          },
          {
            title: 'Professional Assessment',
            description:
              'We inspect your roof exterior, flashing, and attic space to document the full scope of storm-related wear.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Next Steps',
            description:
              'We provide an objective report and outline the most practical repair or restoration options for your property.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
      {
        _type: 'checklistSection',
        heading: 'Immediate Checklist: What to Do After a Storm',
        intro:
          'You do not need to climb onto the roof or diagnose the damage yourself. Start with what you can safely observe:',
        items: [
          'Stay Off the Roof: Wet or damaged roofing can be unsafe. Look from the ground and from inside the property instead.',
          'Photograph What Changed: Take photos of roofing material on the ground, visible exterior damage, new ceiling stains, or interior water. Note when the problem started.',
          'Protect the Interior: Move belongings away from active drips where safe. If water is entering the home, see My Roof Is Leaking.',
          'Have the Roof Evaluated: Schedule an inspection to determine whether the storm created a localized problem, affected several areas, or left the roof intact.',
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Does Storm Damage Look Like?',
        intro:
          'Some storm damage is easy to see, while other conditions require a professional eye. R&C evaluates issues such as missing or displaced materials, lifted flashing, impact and edge damage, and new interior moisture. HAAG Certified Inspection Expertise: R&C brings HAAG Certified inspection expertise through Robert Pilato, certification #201408313. This credential provides trusted third-party assessment when evaluating physical storm damage alongside normal wear.',
        layout: 'grid',
        items: [
          {
            title: 'Missing or Displaced Materials',
            description: 'Missing or displaced shingles, tiles, panels, or other roofing material.',
            icon: 'tabler:layers-off',
          },
          {
            title: 'Lifted Components and Flashing',
            description: 'Lifted or damaged roofing components and flashing around transitions.',
            icon: 'tabler:arrow-bar-up',
          },
          {
            title: 'Impact and Edge Damage',
            description: 'Debris impact marks and damage around roof edges.',
            icon: 'tabler:target',
          },
          {
            title: 'New Interior Moisture',
            description: 'New interior water intrusion or attic moisture.',
            icon: 'tabler:droplet',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If your storm concerns are tied to other property situations or specific challenges, explore our other dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromStorm,
      },
    ],
    ctaBanner: {
      title: 'Think the Storm Damaged Your Roof?',
      subtitle:
        'You do not have to decide from the driveway whether the roof is fine, repairable, or ready for replacement. Start by finding out what actually happened.',
      ctaText: 'Schedule a Storm Damage Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-problems-eol',
    title: 'Common problem — My Roof Is at End of Life',
    slug: 'roof-problems/my-roof-is-at-end-of-life',
    meta: {
      title: 'Is It Time to Replace Your Roof on Oahu? | R&C Roofing',
      description:
        'Wondering if your roof is at the end of its life? Learn the signs that may point to roof replacement, when repair may still make sense, and how R&C evaluates aging roofs on Oahu.',
    },
    hero: {
      title: 'Is My Roof at the End of Its Life?',
      subtitle:
        'Maybe your roof has started leaking more often, or repairs are becoming frequent. Your roofing material might look worn or damaged, or perhaps nothing dramatic has happened at all and you simply know the roof has been there a long time. Age matters, but age alone does not determine whether you need a new roof. Get expert local evaluation from licensed professionals backed by Hawaii License C-33642.',
      ctaText: 'Have R&C Evaluate Your Roof',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Aging roof photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'Is Your Roof Telling You It Is Time for a Closer Look?',
        intro:
          'No single symptom automatically means a roof has reached the end of its useful life. The pattern of problems matters:',
        items: [
          {
            title: 'Isolated Leaks or Damage',
            description: 'A targeted repair may still be enough if the rest of the roof remains serviceable.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Recurring Leaks in Different Areas',
            description: 'Multiple problems often point to broader deterioration rather than one isolated failure.',
            icon: 'tabler:repeat',
          },
          {
            title: 'Frequent Past Repairs',
            description:
              'It may be worth comparing the cumulative value of another repair with the condition of the roof as a whole.',
            icon: 'tabler:tool',
          },
          {
            title: 'Widespread Material Deterioration',
            description: 'General wear across several areas makes continued spot repairs less practical.',
            icon: 'tabler:layers-off',
          },
          {
            title: 'Underlying Decking Concerns',
            description:
              'Conditions beneath the exterior roofing material affect whether localized repair remains appropriate.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Older Roof with No Symptoms',
            description: 'Age by itself is not a reason to replace a roof that remains functional and serviceable.',
            icon: 'tabler:clock',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'Repair, Replace, or Keep Monitoring?',
        intro:
          'A roof inspection helps determine which path makes the most sense based on the actual condition of your property:',
        layout: 'grid',
        items: [
          {
            title: 'When Repair Makes Sense',
            description: 'One localized problem is present and the surrounding roof remains serviceable.',
            icon: 'tabler:tool',
          },
          {
            title: 'When to Monitor',
            description: 'Minor aging is visible, but the roof is still performing and protecting your home.',
            icon: 'tabler:eye',
          },
          {
            title: 'When to Evaluate Replacement',
            description:
              'Repairs are becoming frequent in different parts of the roof or deterioration affects large portions of the system.',
            icon: 'tabler:home-plus',
          },
          {
            title: 'When Storm Impact Occurs',
            description:
              'A recent storm on an older roof requires separating storm damage from long term wear before deciding on the proper scope of work.',
            icon: 'tabler:wind',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If your aging roof concerns are tied to other property situations or specific challenges, explore our other dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromEol,
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Call Us?',
        intro: "Getting an aging roof evaluated shouldn't add to your stress:",
        layout: 'band',
        items: [
          {
            title: 'Schedule an Assessment',
            description: 'Contact us to review your roof age, maintenance history, and current concerns.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Professional Condition Evaluation',
            description:
              'We inspect your roof exterior, flashing, and attic space to determine what is failing and what remains serviceable.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Recommendations',
            description:
              'We provide an objective scope of work, helping you decide whether targeted repairs or a full roof replacement is the practical long term choice.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Not Sure Whether to Repair or Replace?',
      subtitle:
        'You do not need to make that decision based only on the age of the roof. Start with its actual condition.',
      ctaText: 'Have R&C Evaluate Your Roof',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-problems-denied',
    title: 'Common problem — My Insurance Claim Was Denied',
    slug: 'roof-problems/my-insurance-claim-was-denied',
    meta: {
      title: 'Roof Insurance Claim Denied in Hawaii? | R&C Roofing',
      description:
        'Was your roof insurance claim denied in Hawaii? Learn what to review next and how R&C can document roof conditions from the contractor side.',
    },
    hero: {
      title: 'My Roof Insurance Claim Was Denied. What Should I Do?',
      subtitle:
        "Getting a denial after dealing with roof damage leaves you wondering what to do next. Do not start by assuming the carrier is wrong or that the claim will eventually be approved. Start with the denial letter, and get expert local evaluation from licensed professionals backed by Hawaii License C-33642.",
      ctaText: 'Have R&C Review the Roof Condition',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Denied claim photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'What Does Your Denial Letter Say?',
        intro: "Read the carrier's explanation carefully before deciding what to do next:",
        layout: 'grid',
        items: [
          {
            title: 'Questioning Storm Damage',
            description:
              'Review what physical roofing conditions were documented after the event. R&C can inspect the roof and document observable roofing conditions.',
            icon: 'tabler:cloud-storm',
          },
          {
            title: 'Age or Wear Concerns',
            description:
              'Determine whether the problem is localized, widespread, or consistent with longer-term wear. R&C evaluates current physical conditions.',
            icon: 'tabler:clock',
          },
          {
            title: 'Insufficient Documentation',
            description:
              'Look at what photographs, findings, or contractor information were included with the claim to see if additional details clarify the condition.',
            icon: 'tabler:file-alert',
          },
          {
            title: 'Unclear Denial Decisions',
            description:
              'Ask your carrier or insurance professional to explain the decision. R&C can answer questions about the roofing condition, but cannot interpret your policy.',
            icon: 'tabler:help',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'How R&C Roofing Helps After a Denial',
        intro:
          "When you need clarity on your roof's actual condition after a claim denial, our team provides professional contractor-side support:",
        layout: 'band',
        items: [
          {
            title: 'Thorough Roof Inspections',
            description:
              'We perform a complete physical assessment of your roof exterior, flashings, and vulnerable transition areas.',
            icon: 'tabler:search',
          },
          {
            title: 'Objective Condition Documentation',
            description:
              'We take clear, detailed photographs and record observable physical conditions to establish what is happening on your roof.',
            icon: 'tabler:camera',
          },
          {
            title: 'Actionable Project Scopes',
            description:
              'If repairs or replacement are necessary, we prepare clear contractor scopes of work and transparent project pricing to guide your next steps.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If your denied claim concerns are tied to other property situations or specific challenges, explore our other dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromDenied,
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens When You Call Us?',
        intro: "Getting clarity after a claim denial shouldn't add to your stress:",
        steps: [
          {
            title: 'Review the Situation',
            description: 'Contact us to discuss your denial letter and current roof concerns.',
            icon: 'tabler:file-text',
          },
          {
            title: 'Professional Condition Evaluation',
            description:
              'We inspect your roof exterior, flashing, and attic space to establish the actual physical condition of the system.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Recommendations',
            description:
              'We provide an objective report and contractor-side pricing, helping you decide on the right path forward regardless of insurance funding.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Your Claim Was Denied. Start With the Roof Facts.',
      subtitle:
        "A denial letter tells you the carrier's current position. A roof inspection tells you what is physically happening with the roof.",
      ctaText: 'Have R&C Review the Roof Condition',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-problems-buy',
    title: 'Common problem — Buying or Selling a Home',
    slug: 'roof-problems/buying-or-selling-a-home',
    meta: {
      title: 'Buying or Selling a Home on Oahu? Check the Roof | R&C',
      description:
        'Buying or selling a home on Oahu? Learn what roof problems to look into before closing and how a roof inspection can clarify repair or replacement needs.',
    },
    hero: {
      title: 'Buying or Selling a Home? Do Not Guess About the Roof',
      subtitle:
        'A roof can become a major question during a home purchase or sale, whether flagged by a home inspection, looking old, or showing signs of previous repairs. Get expert local evaluation from licensed professionals backed by Hawaii License C-33642.',
      ctaText: 'Schedule a Roof Inspection',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Real estate roof photo placeholder',
    },
    sections: [
      {
        _type: 'infoCardsSection',
        heading: 'Are You Buying or Selling?',
        intro: 'The roofing questions depend on which side of the transaction you are on:',
        items: [
          {
            title: 'If You Are Buying',
            description:
              'Understand the roof condition before taking ownership. Find out whether visible problems are localized or broad, and get contractor pricing if roofing work or repairs are recommended.',
            icon: 'tabler:key',
          },
          {
            title: 'If You Are Selling',
            description:
              'Identify potential roofing issues before they surprise you during closing. Address repairs beforehand or get clear information to keep the transaction moving smoothly.',
            icon: 'tabler:home-dollar',
          },
        ],
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Roofing Questions Should Be Answered Before Closing?',
        intro:
          'A roof does not have to be actively leaking to deserve a closer look during a real estate transaction. Consider these practical questions:',
        layout: 'grid',
        items: [
          {
            title: 'Visible Damage',
            description: 'Are there missing materials, compromised flashing, or visible wear?',
            icon: 'tabler:eye',
          },
          {
            title: 'Leak History',
            description: 'Are there signs of previous or recurring moisture intrusion?',
            icon: 'tabler:droplet',
          },
          {
            title: 'Scope of Wear',
            description: 'Does the roof show localized damage or broader, system-wide deterioration?',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Serviceability',
            description:
              'Does the surrounding material remain sound, or is replacement the more practical long-term choice?',
            icon: 'tabler:home-check',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If your real estate concerns involve other specific property situations, explore our other dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromBuy,
      },
      {
        _type: 'iconPointsSection',
        heading: 'What Happens When You Call Us?',
        intro: "Getting a roof evaluated during a home transaction shouldn't add to your stress:",
        layout: 'band',
        items: [
          {
            title: 'Schedule an Inspection',
            description: 'Contact us to discuss your timeline and the specific concerns flagged for the property.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Professional Condition Evaluation',
            description:
              'We perform a thorough inspection of the roof exterior, flashing, and attic space to assess its true condition.',
            icon: 'tabler:search',
          },
          {
            title: 'Clear Recommendations',
            description:
              'We provide an objective report and contractor-side pricing to help buyers and sellers make informed decisions before closing.',
            icon: 'tabler:clipboard-list',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Get the Roof Facts Before You Move Forward',
      subtitle:
        'Whether you are buying or selling, you do not want to make a roofing decision based on an assumption. Find out what condition the roof is in today.',
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '/contact',
    },
  },
  {
    _id: 'service-page-roof-problems-hurricane',
    title: 'Common problem — Preparing for Hurricane Season',
    slug: 'roof-problems/preparing-for-hurricane-season',
    meta: {
      title: 'Preparing Your Roof for Hurricane Season in Hawaii | R&C Roofing',
      description:
        'Prepare your Oahu roof for hurricane season. Learn what weather risks to expect, how to inspect for wind vulnerabilities, and how R&C Roofing helps protect your home.',
    },
    hero: {
      title: 'Preparing Your Roof for Hurricane Season on Oahu',
      subtitle:
        'Tropical weather brings the threat of heavy rainfall, severe wind gusts, and wind-driven moisture. A roof that holds up during normal island trade winds can still have hidden vulnerabilities when put to the test by severe storm conditions. Protect your property before severe tropical weather arrives with expert roof evaluations and wind mitigation guidance, backed by Hawaii License C-33642.',
      ctaText: 'Schedule a Hurricane Roof Check',
      ...contactCta,
      ...phone,
      imagePlaceholder: 'Hurricane prep photo placeholder',
    },
    sections: [
      {
        _type: 'iconPointsSection',
        heading: 'Hurricane Roof Preparation Checklist',
        intro:
          'Before storm season peaks, review these critical areas of your roofing system or schedule a professional inspection to check them:',
        layout: 'band',
        items: [
          {
            title: 'Check for Loose or Damaged Material',
            description:
              'Inspect sloped surfaces for missing shingles, cracked tiles, or loose metal panels that high winds can easily tear away.',
            icon: 'tabler:layers-off',
          },
          {
            title: 'Examine Flashing and Sealants',
            description:
              'Check metal flashing around chimneys, vents, valleys, and wall junctions where wind-driven rain frequently exploits gaps.',
            icon: 'tabler:layers-intersect',
          },
          {
            title: 'Clear Gutters and Drains',
            description:
              'Ensure roof drainage systems, scuppers, and downspouts are completely free of debris so heavy tropical downpours can escape safely.',
            icon: 'tabler:droplet',
          },
          {
            title: 'Inspect Soffits and Overhangs',
            description:
              'Check exterior soffits and roof overhangs for loose boards or gaps that allow wind uplift forces to push beneath the roof deck.',
            icon: 'tabler:home',
          },
          {
            title: 'Review Attic and Underlayment Conditions',
            description:
              'Look inside the attic for signs of past moisture intrusion, which often points to vulnerable spots that severe storms will worsen.',
            icon: 'tabler:eye',
          },
        ],
      },
      {
        _type: 'infoCardsSection',
        heading: "How Oahu's Tropical Climate Impacts Storm Readiness",
        intro: 'Island weather creates unique challenges for roofing assemblies during severe storm events:',
        items: [
          {
            title: 'Wind Uplift Pressures',
            description:
              'Hurricane-force winds create negative pressure above the roof, attempting to lift materials away from the structure. Proper fastening and anchoring are essential.',
            icon: 'tabler:arrow-bar-up',
          },
          {
            title: 'Wind-Driven Rain',
            description:
              'Severe storms push water horizontally. Even minor gaps in flashing or aged underlayment can allow water to bypass the exterior weather barrier.',
            icon: 'tabler:cloud-rain',
          },
          {
            title: 'Flying Debris',
            description:
              'High winds can carry branches and other debris across neighborhoods, increasing the risk of physical impact damage to your roof surface.',
            icon: 'tabler:tree',
          },
        ],
      },
      {
        _type: 'linkedCardsSection',
        heading: 'Explore Other Roof Problem Solutions',
        intro:
          'If you are dealing with other property concerns or post-storm issues, explore our dedicated problem-solving resources:',
        display: 'directory',
        items: exploreFromHurricane,
      },
      {
        _type: 'timelineSection',
        heading: 'What Happens When You Schedule a Hurricane Readiness Check?',
        intro: "Getting your roof evaluated before a storm doesn't have to be stressful:",
        steps: [
          {
            title: 'Schedule an Assessment',
            description: 'Contact us to review your roof condition and discuss your property exposure.',
            icon: 'tabler:calendar',
          },
          {
            title: 'Comprehensive Roof Inspection',
            description:
              'We inspect your exterior materials, flashing, valleys, and attic space for potential wind and water vulnerabilities.',
            icon: 'tabler:search',
          },
          {
            title: 'Actionable Recommendations',
            description:
              'We provide a clear report and complete any necessary preventative maintenance or repairs before severe weather strikes.',
            icon: 'tabler:clipboard-check',
          },
        ],
      },
    ],
    ctaBanner: {
      title: 'Strengthen Your Roof Before the Next Storm',
      subtitle:
        "Don't wait for a severe weather warning to find out if your roof is ready. Get professional guidance and proactive protection today.",
      ctaText: 'Schedule a Hurricane Roof Check',
      ctaHref: '/contact',
    },
  },
];
