import type { StructureBuilder } from 'sanity/structure';

// Singletons: document types that have exactly one instance.
// The Studio sidebar skips the list view and opens the document directly.
const SINGLETONS: Record<string, string> = {
  siteNavigation: 'singleton-navigation',
  siteFooter: 'singleton-footer',
  homePage: 'singleton-home',
  contactPage: 'singleton-contact',
  reviewsPage: 'singleton-reviews',
};

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ── Global ─────────────────────────────────────────────────────────────
      S.listItem()
        .title('Navigation')
        .child(
          S.document()
            .schemaType('siteNavigation')
            .documentId('singleton-navigation')
            .title('Navigation')
        ),

      S.listItem()
        .title('Footer')
        .child(
          S.document()
            .schemaType('siteFooter')
            .documentId('singleton-footer')
            .title('Footer')
        ),

      S.divider(),

      S.listItem()
        .title('Leads')
        .child(S.documentTypeList('lead').title('Leads').defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])),

      S.divider(),

      S.listItem()
        .title('Blog')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog posts')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
        ),

      S.divider(),

      // ── Pages ───────────────────────────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('singleton-home')
                    .title('Home Page')
                ),
              S.listItem()
                .title('Contact')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('singleton-contact')
                    .title('Contact Page')
                ),
              S.listItem()
                .title('Reviews')
                .child(
                  S.document()
                    .schemaType('reviewsPage')
                    .documentId('singleton-reviews')
                    .title('Reviews Page')
                ),
              S.listItem()
                .title('Services')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Service pages')
                    .filter(
                      '_type == "servicePage" && slug.current match "services*" && !(slug.current match "services/roofing-materials*")'
                    )
                ),
              S.listItem()
                .title('Materials')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Material pages')
                    .filter('_type == "servicePage" && slug.current match "services/roofing-materials*"')
                ),
              S.listItem()
                .title('Claims')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Claim pages')
                    .filter('_type == "servicePage" && slug.current match "claims*"')
                ),
              S.listItem()
                .title('About')
                .child(
                  S.documentTypeList('servicePage')
                    .title('About pages')
                    .filter('_type == "servicePage" && slug.current match "about*"')
                ),
              S.listItem()
                .title('Who we serve')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Who we serve pages')
                    .filter('_type == "servicePage" && slug.current match "who-we-serve*"')
                ),
              S.listItem()
                .title('Roof inspections')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Roof inspection pages')
                    .filter('_type == "servicePage" && slug.current match "roof-inspections*"')
                ),
              S.listItem()
                .title('Common problems')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Common problem pages')
                    .filter('_type == "servicePage" && slug.current match "roof-problems*"')
                ),
              S.listItem()
                .title('Blog')
                .schemaType('blogPost')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blog posts')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
            ])
        ),
    ]);

// Tell Sanity which document types are singletons so they don't appear
// in the default "new document" picker or as filterable lists.
export const singletonTypes = new Set(Object.keys(SINGLETONS));
