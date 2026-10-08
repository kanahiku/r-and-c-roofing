import type { JsonLdNode } from './types';
import customSchemasJson from './customOverrides.json';

const customMap = customSchemasJson as Record<string, JsonLdNode>;

/**
 * Returns the authored custom schema object (@graph or node) for a given pathname if available.
 * Normalizes trailing slashes to guarantee exact path matching.
 */
export function getCustomSchema(pathname: string): JsonLdNode | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return customMap[normalized] ?? null;
}

export { customSchemasJson as customPageSchemas };
