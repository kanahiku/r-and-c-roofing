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

export interface NavLink {
  text: string;
  href?: string;
  links?: NavSubLink[];
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
}

export interface ServiceItem {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  testimonial: string;
  name: string;
  job: string;
}

export interface ServiceArea {
  title: string;
  description: string;
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
    subtitleParagraph2: string;
    ctaText: string;
    ctaHref: string;
    heroImage: ContentImage;
  };

  statsBar: StatItem[];

  whyInspect: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    ctaHref: string;
    infoCards: InfoCardItem[];
  };

  servicesSection: {
    title: string;
    subtitle: string;
    services: ServiceItem[];
  };

  oahuConditions: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    ctaText: string;
    ctaHref: string;
    image: ContentImage;
  };

  whyRC: {
    heading: string;
    benefits: BenefitItem[];
  };

  insuranceClaims: {
    heading: string;
    ctaText: string;
    ctaHref: string;
    paragraph1: string;
    paragraph2: string;
    image: ContentImage;
    disclaimer: string;
    timelineSteps: TimelineStep[];
  };

  recentProjects: {
    title: string;
    subtitle: string;
    projects: ProjectItem[];
    ctaText: string;
    ctaHref: string;
  };

  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
    ctaText: string;
    ctaHref: string;
  };

  serviceAreas: {
    heading: string;
    subheading: string;
    areas: ServiceArea[];
    ctaText: string;
    ctaHref: string;
  };

  faqs: {
    title: string;
    items: FAQItem[];
  };

  ctaBanner: {
    title: string;
    subtitle: string;
    showAfterHoursNote: boolean;
  };
}
