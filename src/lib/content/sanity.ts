import { sanityClient } from '../sanity/client';
import type { HomePageContent, NavigationContent } from './types';

const HOME_QUERY = /* groq */ `
  *[_type == "homePage" && _id == "singleton-home"][0] {
    meta,
    hero {
      titleLine1,
      titleLine2,
      subtitleParagraph1,
      ctaText,
      ctaHref,
      phoneCtaText,
      phoneCtaHref,
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
      "image": {
        "src": coalesce(image.asset->url, imageUrl, ""),
        "alt": coalesce(image.alt, imageAlt, "")
      }
    },
    servicesSection {
      title,
      subtitle,
      "services": services[] { title, description, linkText, linkHref }
    },
    oahuConditions {
      title,
      paragraph1,
      "cards": cards[] { title, description, icon },
      ctaText,
      ctaHref
    },
    roofDamageProcess {
      heading,
      disclaimer,
      "steps": steps[] { title, description, icon }
    },
    faqs {
      title,
      "items": items[] { question, answer }
    },
    ctaBanner {
      title,
      subtitle,
      ctaText,
      ctaHref,
      showAfterHoursNote
    }
  }
`;

export async function getSanityHomeContent(): Promise<HomePageContent> {
  return sanityClient.fetch<HomePageContent>(HOME_QUERY);
}

const NAVIGATION_QUERY = /* groq */ `
  {
    "header": *[_type == "siteNavigation" && _id == "singleton-navigation"][0] {
      "links": links[] {
        text,
        href,
        "links": subLinks[] { text, href },
        "columns": columns[] {
          title,
          "links": links[] { text, href }
        }
      },
      "actions": actions[] { variant, text, href },
      phone
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
