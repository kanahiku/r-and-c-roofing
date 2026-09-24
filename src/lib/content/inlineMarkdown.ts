export function inlineMarkdownHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function inlineLinkClass(isDark: boolean) {
  return isDark
    ? '[&_a]:text-accent [&_a]:font-medium [&_a]:hover:underline'
    : '[&_a]:text-heading [&_a]:font-medium [&_a]:hover:underline';
}
