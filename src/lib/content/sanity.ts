import { sanityClient } from '../sanity/client';
import type { HomePageContent, NavigationContent } from './types';

// ─── Homepage ─────────────────────────────────────────────────────────────────

const HOME_QUERY = /* groq */ `
  *[_type == "homePage" && _id == "singleton-home"][0] {
    meta,
    hero {
      titleLine1,
      titleLine2,
      subtitleParagraph1,
      subtitleParagraph2,
      ctaText,
      ctaHref,
      "heroImage": {
        "src": coalesce(heroImage.asset->url, heroImageUrl, ""),
        "alt": coalesce(heroImage.alt, "")
      }
    },
    "statsBar": statsBar[] { stat, label },
    whyInspect {
      heading,
      paragraph1,
      paragraph2,
      ctaText,
      ctaHref,
      "infoCards": infoCards[] { title, description }
    },
    servicesSection {
      title,
      subtitle,
      "services": services[] { title, description, linkText, linkHref }
    },
    oahuConditions {
      title,
      paragraph1,
      paragraph2,
      paragraph3,
      ctaText,
      ctaHref,
      "image": {
        "src": coalesce(image.asset->url, imageUrl, ""),
        "alt": coalesce(image.alt, "")
      }
    },
    whyRC {
      heading,
      "benefits": benefits[] { title, description }
    },
    insuranceClaims {
      heading,
      ctaText,
      ctaHref,
      paragraph1,
      paragraph2,
      disclaimer,
      "image": {
        "src": coalesce(image.asset->url, imageUrl, ""),
        "alt": coalesce(image.alt, "")
      },
      "timelineSteps": timelineSteps[] { title, description, icon }
    },
    recentProjects {
      title,
      subtitle,
      "projects": projects[] { title, description },
      ctaText,
      ctaHref
    },
    testimonials {
      title,
      subtitle,
      "items": items[] { testimonial, name, job },
      ctaText,
      ctaHref
    },
    serviceAreas {
      heading,
      subheading,
      "areas": areas[] { title, description },
      ctaText,
      ctaHref
    },
    faqs {
      title,
      "items": items[] { question, answer }
    },
    ctaBanner {
      title,
      subtitle,
      showAfterHoursNote
    }
  }
`;

export async function getSanityHomeContent(): Promise<HomePageContent> {
  return sanityClient.fetch<HomePageContent>(HOME_QUERY);
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAVIGATION_QUERY = /* groq */ `
  {
    "header": *[_type == "siteNavigation" && _id == "singleton-navigation"][0] {
      "links": links[] {
        text,
        href,
        "links": subLinks[] { text, href }
      },
      "actions": actions[] { variant, text, href }
    },
    "footer": *[_type == "siteFooter" && _id == "singleton-footer"][0] {
      "links": columns[] {
        title,
        "links": links[] { text, href }
      },
      "secondaryLinks": secondaryLinks[] { text, href },
      "socialLinks": socialLinks[] { ariaLabel, icon, href },
      footNote
    }
  }
`;

export async function getSanityNavigationContent(): Promise<NavigationContent> {
  return sanityClient.fetch<NavigationContent>(NAVIGATION_QUERY);
}
