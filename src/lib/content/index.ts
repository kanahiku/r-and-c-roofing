import type {
  BlogPost,
  ContactPageContent,
  HomePageContent,
  NavigationContent,
  ReviewsPageContent,
  ServicePageContent,
} from './types';
import {
  getSanityBlogPost,
  getSanityBlogPosts,
  getSanityBlogPostSlugs,
  getSanityContactHelpOptions,
  getSanityContactPage,
  getSanityHomeContent,
  getSanityNavigationContent,
  getSanityReviewsPage,
  getSanityServicePage,
  getSanityServicePageSlugs,
} from './sanity';
import { blogPosts as localBlogPosts } from '../../data/pages/blogPosts';
import { contactHelpOptions as localContactHelpOptions } from '../../data/pages/contact';

export async function getHomeContent(): Promise<HomePageContent> {
  const page = await getSanityHomeContent();
  if (!page) {
    throw new Error('Sanity homePage document is missing (singleton-home).');
  }
  return page;
}

export async function getContactPage(): Promise<ContactPageContent> {
  return getSanityContactPage();
}

export async function getReviewsPage(): Promise<ReviewsPageContent> {
  return getSanityReviewsPage();
}

export async function getContactHelpOptions() {
  try {
    const options = await getSanityContactHelpOptions();
    if (options.length) return options;
  } catch (error) {
    console.warn('Sanity contact help options unavailable; using local fallback.', error);
  }
  return localContactHelpOptions;
}

export async function getNavigationContent(): Promise<NavigationContent> {
  const nav = await getSanityNavigationContent();
  if (!nav?.header || !nav?.footer) {
    throw new Error('Sanity navigation or footer document is missing.');
  }
  return stripHiddenNavLinks(ensureLegalFooterLinks(ensureBlogNav(nav)));
}

const LEGAL_FOOTER_LINKS = [
  { text: 'Privacy Policy', href: '/privacy-policy' },
  { text: 'Terms of Service', href: '/terms-of-service' },
  { text: 'Accessibility', href: '/accessibility' },
];

const HIDDEN_NAV_HREFS = new Set(['/about/gallery', '/gallery']);

function navHrefKey(href?: string) {
  if (!href) return '';
  const path = href.trim();
  if (!path) return '';
  return path.replace(/\/+$/, '') || '/';
}

function isHiddenNavHref(href?: string) {
  return HIDDEN_NAV_HREFS.has(navHrefKey(href));
}

function stripHiddenNavLinks(nav: NavigationContent): NavigationContent {
  const stripItems = <T extends { href?: string }>(items?: T[]) =>
    (items ?? []).filter((item) => !isHiddenNavHref(item.href));

  return {
    ...nav,
    header: {
      ...nav.header,
      links: stripItems(nav.header.links).map((link) => ({
        ...link,
        links: link.links ? stripItems(link.links) : undefined,
        columns: link.columns?.map((column) => ({
          ...column,
          links: stripItems(column.links),
        })),
      })),
    },
    footer: {
      ...nav.footer,
      links: nav.footer.links.map((column) => ({
        ...column,
        links: stripItems(column.links),
      })),
      secondaryLinks: stripItems(nav.footer.secondaryLinks),
    },
  };
}

function ensureLegalFooterLinks(nav: NavigationContent): NavigationContent {
  const existing = nav.footer.secondaryLinks ?? [];
  const byHref = new Map(existing.map((link) => [link.href, link]));
  const merged = LEGAL_FOOTER_LINKS.map((link) => byHref.get(link.href) ?? link);

  for (const link of existing) {
    if (!merged.some((item) => item.href === link.href)) merged.push(link);
  }

  return {
    ...nav,
    footer: { ...nav.footer, secondaryLinks: merged },
  };
}

function ensureBlogNav(nav: NavigationContent): NavigationContent {
  const blogLink = { text: 'Blog', href: '/blog' };

  const headerLinks = (() => {
    const withoutAboutBlog = nav.header.links.map((link) => {
      if (link.text !== 'About' || !link.links) return link;
      return { ...link, links: link.links.filter((item) => item.href !== '/blog') };
    });

    if (withoutAboutBlog.some((link) => link.href === '/blog' || link.text === 'Blog')) {
      return withoutAboutBlog;
    }

    const contactIndex = withoutAboutBlog.findIndex((item) => item.href === '/contact' || item.text === 'Contact');
    if (contactIndex >= 0) {
      return [...withoutAboutBlog.slice(0, contactIndex), blogLink, ...withoutAboutBlog.slice(contactIndex)];
    }
    return [...withoutAboutBlog, blogLink];
  })();

  const footerLinks = nav.footer.links.map((column) => {
    if (column.title !== 'Company') return column;
    if (column.links.some((item) => item.href === '/blog')) return column;
    const next = [...column.links];
    const contactIndex = next.findIndex((item) => item.href === '/contact');
    if (contactIndex >= 0) next.splice(contactIndex, 0, blogLink);
    else next.push(blogLink);
    return { ...column, links: next };
  });

  return {
    ...nav,
    header: { ...nav.header, links: headerLinks },
    footer: { ...nav.footer, links: footerLinks },
  };
}

export async function findServicePage(slug: string): Promise<ServicePageContent | null> {
  return getSanityServicePage(slug);
}

export async function getServicePage(slug: string): Promise<ServicePageContent> {
  const page = await findServicePage(slug);
  if (!page) {
    throw new Error(`Sanity servicePage document is missing for slug "${slug}".`);
  }
  return page;
}

export async function getServicePageSlugs(): Promise<string[]> {
  try {
    return await getSanityServicePageSlugs();
  } catch (error) {
    console.warn('Sanity service page slugs unavailable.', error);
    return [];
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const [sanitySlugs, localSlugs] = await Promise.all([
    getSanityBlogPostSlugs().catch(() => [] as string[]),
    Promise.resolve(localBlogPosts.map((post) => post.slug)),
  ]);
  return [...new Set([...localSlugs, ...sanitySlugs])];
}

const STATIC_PATHS = ['/', '/blog', '/contact', '/reviews', '/privacy-policy', '/terms-of-service', '/accessibility'];

export async function getPublicContentPaths(): Promise<string[]> {
  const [pageSlugs, postSlugs] = await Promise.all([getServicePageSlugs(), getBlogPostSlugs()]);
  return [
    ...STATIC_PATHS,
    ...pageSlugs.map((slug) => `/${slug.replace(/^\/+/, '')}`),
    ...postSlugs.map((slug) => `/blog/${slug.replace(/^\/+/, '')}`),
  ].filter((path) => !isHiddenNavHref(path));
}

export function getBlogPermalink(slug: string): string {
  return `/blog/${slug}`;
}

function overlayCmsFields(local: BlogPost, sanity: BlogPost): BlogPost {
  return {
    ...local,
    title: sanity.title || local.title,
    excerpt: sanity.excerpt || local.excerpt,
    publishDate: sanity.publishDate || local.publishDate,
    author: sanity.author || local.author,
    image: sanity.image?.src ? sanity.image : local.image,
    relatedPages: sanity.relatedPages.length ? sanity.relatedPages : local.relatedPages,
    contentBlocks: sanity.contentBlocks?.length ? sanity.contentBlocks : local.contentBlocks,
  };
}

function mergeBlogPosts(sanityPosts: BlogPost[], localPosts: BlogPost[]): BlogPost[] {
  const localBySlug = new Map(localPosts.map((post) => [post.slug, post]));
  const sanityBySlug = new Map(sanityPosts.map((post) => [post.slug, post]));
  const slugs = new Set([...localBySlug.keys(), ...sanityBySlug.keys()]);

  return [...slugs]
    .map((slug) => {
      const sanity = sanityBySlug.get(slug);
      const local = localBySlug.get(slug);
      if (sanity && local) return overlayCmsFields(local, sanity);
      return (sanity ?? local)!;
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getSanityBlogPosts();
    if (posts.length) return mergeBlogPosts(posts, localBlogPosts);
  } catch (error) {
    console.warn('Sanity blog posts unavailable; using local articles.', error);
  }
  return [...localBlogPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const local = localBlogPosts.find((post) => post.slug === slug);
  let sanity: BlogPost | undefined;
  try {
    sanity = (await getSanityBlogPost(slug)) ?? undefined;
  } catch (error) {
    console.warn(`Sanity blog post "${slug}" unavailable; checking local articles.`, error);
  }

  if (sanity && local) return overlayCmsFields(local, sanity);
  return sanity ?? local;
}

export async function getBlogPostsRelatedTo(pageSlug: string): Promise<BlogPost[]> {
  const key = pageSlug.replace(/^\/+/, '');
  const posts = await getBlogPosts();
  return posts.filter((post) => post.relatedPages.includes(key)).slice(0, 3);
}

export async function getRelatedBlogPosts(post: BlogPost, max = 3): Promise<BlogPost[]> {
  const keys = new Set(post.relatedPages);
  if (!keys.size) return [];

  const posts = await getBlogPosts();
  return posts
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      item,
      score: item.relatedPages.filter((key) => keys.has(key)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.item.publishDate.localeCompare(a.item.publishDate))
    .slice(0, max)
    .map(({ item }) => item);
}

export type {
  BlogPost,
  ContactPageContent,
  HomePageContent,
  NavigationContent,
  ReviewsPageContent,
  ServicePageContent,
};
