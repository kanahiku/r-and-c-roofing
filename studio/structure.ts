import type { StructureBuilder } from 'sanity/structure';

// Singletons: document types that have exactly one instance.
// The Studio sidebar skips the list view and opens the document directly.
const SINGLETONS: Record<string, string> = {
  siteNavigation: 'singleton-navigation',
  siteFooter: 'singleton-footer',
  homePage: 'singleton-home',
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
            ])
        ),
    ]);

// Tell Sanity which document types are singletons so they don't appear
// in the default "new document" picker or as filterable lists.
export const singletonTypes = new Set(Object.keys(SINGLETONS));
