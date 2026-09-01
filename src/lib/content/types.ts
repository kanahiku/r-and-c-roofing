// ─── Shared primitives ────────────────────────────────────────────────────────

export interface ContentImage {
  src: string;
  alt: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavSubLink {
  text: string;
  href: string;
}

export interface NavColumn {
  title: string;
  links: NavSubLink[];
}

export interface NavLink {
  text: string;
  href?: string;
  links?: NavSubLink[];
  columns?: NavColumn[];
}

export interface NavPhone {
  text: string;
  href: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  ariaLabel: string;
  icon: string;
  href: string;
}

export interface NavigationContent {
  header: {
    links: NavLink[];
    actions: { variant?: string; text?: string; href?: string }[];
    phone?: NavPhone;
  };
  footer: {
    links: FooterColumn[];
    secondaryLinks: FooterLink[];
    socialLinks: SocialLink[];
    footNote: string;
  };
}

// ─── Homepage section types ───────────────────────────────────────────────────

export interface StatItem {
  stat: string;
  label: string;
}

export interface InfoCardItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Full homepage content ─────────────────────────────────────────────────────

export interface HomePageContent {
  meta: {
    title: string;
    description: string;
  };

  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitleParagraph1: string;
    ctaText: string;
    ctaHref: string;
    phoneCtaText?: string;
    phoneCtaHref?: string;
    heroImage: ContentImage;
  };

  statsBar: StatItem[];

  whyInspect: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    ctaHref: string;
    image: ContentImage;
  };

  servicesSection: {
    title: string;
    subtitle: string;
    services: ServiceItem[];
  };

  oahuConditions: {
    title: string;
    paragraph1: string;
    cards: InfoCardItem[];
    ctaText: string;
    ctaHref: string;
  };

  roofDamageProcess: {
    heading: string;
    disclaimer: string;
    steps: TimelineStep[];
  };

  faqs: {
    title: string;
    items: FAQItem[];
  };

  ctaBanner: {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaHref?: string;
    showAfterHoursNote: boolean;
  };
}
