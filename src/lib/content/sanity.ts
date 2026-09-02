import { sanityClient } from '../sanity/client';
import type {
  BlogPost,
  ContentImage,
  HomePageContent,
  NavigationContent,
  ServicePageContent,
  ServiceSection,
  SplitContentSection,
} from './types';

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

const SERVICE_PAGE_QUERY = /* groq */ `
  *[_type == "servicePage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    meta,
    hero {
      title,
      subtitle,
      ctaText,
      ctaHref,
      phoneCtaText,
      phoneCtaHref,
      imagePlaceholder,
      "image": {
        "src": coalesce(image.asset->url, imageUrl, ""),
        "alt": coalesce(image.alt, imageAlt, "")
      }
    },
    "sections": sections[_type != "faqsSection"] {
      _type,
      heading,
      intro,
      layout,
      display,
      title,
      paragraphs,
      featureLabel,
      column1,
      column2,
      column3,
      ctaText,
      ctaHref,
      sources,
      imagePlaceholder,
      "image": {
        "src": coalesce(image.asset->url, imageUrl, ""),
        "alt": coalesce(image.alt, imageAlt, "")
      },
      "items": select(
        _type == "linkedCardsSection" => items[] { title, description, linkText, href },
        _type == "bulletCardsSection" => items[] { title, items },
        _type == "checklistSection" => items[] { text },
        _type == "yelpReviewsSection" => items[] { name, reviewId, userId },
        _type == "quoteCardsSection" => items[] { name, quote },
        items[] { title, description, icon }
      ),
      "steps": steps[] { title, description, icon },
      "rows": rows[] { feature, cell1, cell2, cell3 }
    },
    faqs {
      title,
      "items": items[] { "title": question, "description": answer }
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

export async function getSanityServicePage(slug: string): Promise<ServicePageContent | null> {
  const page = await sanityClient.fetch<ServicePageContent | null>(SERVICE_PAGE_QUERY, { slug });
  if (!page) return null;

  return {
    ...page,
    sections: ((page.sections ?? []) as ServiceSection[]).map((section) => {
      if (section._type !== 'splitContentSection') return section;
      const split = section as SplitContentSection;
      return { ...split, image: split.image?.src ? split.image : undefined };
    }),
    faqs: page.faqs?.items?.length ? page.faqs : undefined,
    hero: {
      ...page.hero,
      image: page.hero?.image?.src ? page.hero.image : undefined,
    },
  };
}

type SanityPortableBlock = {
  _type?: string;
  children?: Array<{ text?: string }>;
};

type SanityBlogPost = Omit<BlogPost, 'image' | 'relatedPages' | 'body'> & {
  image?: ContentImage;
  relatedPages?: string[] | null;
  body?: SanityPortableBlock[] | null;
};

function portableTextToParagraphs(body: SanityPortableBlock[] | null | undefined): string[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((block) => block?._type === 'block')
    .map((block) =>
      Array.isArray(block.children) ? block.children.map((child) => child.text ?? '').join('') : ''
    )
    .map((text) => text.trim())
    .filter(Boolean);
}

function normalizeBlogPost(post: SanityBlogPost): BlogPost {
  const body = portableTextToParagraphs(post.body);
  const excerpt = post.excerpt || body[0] || '';
  return {
    title: post.title,
    slug: post.slug,
    excerpt,
    publishDate: post.publishDate,
    author: post.author,
    image: post.image?.src ? post.image : undefined,
    relatedPages: (post.relatedPages ?? []).map((key) => key.replace(/^\/+/, '')).filter(Boolean),
    meta: {
      title: post.title,
      description: excerpt,
    },
    heroParagraphs: body.slice(0, 2),
    sections:
      body.length > 2
        ? [
            {
              _type: 'editorialSection',
              heading: post.title,
              paragraphs: body.slice(2),
            },
          ]
        : [],
    ctaBanner: {
      title: 'Need This Looked at on Your Roof?',
      subtitle:
        'R&C Roofing Contractors can inspect the roof, document what is going on, and help you decide what work should come next.',
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '/contact',
    },
    body,
  };
}

const BLOG_POST_PROJECTION = /* groq */ `
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  author,
  "image": {
    "src": coalesce(image.asset->url, imageUrl, ""),
    "alt": coalesce(image.alt, imageAlt, title)
  },
  relatedPages,
  body
`;

const BLOG_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(publishDate desc) {
    ${BLOG_POST_PROJECTION}
  }
`;

const BLOG_POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_POST_PROJECTION}
  }
`;

const BLOG_POSTS_RELATED_TO_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current) && $pageSlug in relatedPages] | order(publishDate desc) [0...3] {
    ${BLOG_POST_PROJECTION}
  }
`;

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY);
  return (posts ?? []).filter((post) => post?.slug && post?.title).map(normalizeBlogPost);
}

export async function getSanityBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await sanityClient.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
  if (!post?.slug || !post.title) return null;
  return normalizeBlogPost(post);
}

export async function getSanityBlogPostsRelatedTo(pageSlug: string): Promise<BlogPost[]> {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_RELATED_TO_QUERY, { pageSlug });
  return (posts ?? []).filter((post) => post?.slug && post?.title).map(normalizeBlogPost);
}

const SERVICE_PAGE_SLUGS_QUERY = /* groq */ `
  *[_type == "servicePage" && defined(slug.current)].slug.current
`;

const BLOG_POST_SLUGS_QUERY = /* groq */ `
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;

export async function getSanityServicePageSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(SERVICE_PAGE_SLUGS_QUERY);
  return (slugs ?? []).filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}

export async function getSanityBlogPostSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(BLOG_POST_SLUGS_QUERY);
  return (slugs ?? []).filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
}
