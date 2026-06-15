import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

/** Lightweight SEO head manager — updates title and meta description per route. */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
  }, [title, description]);

  return null;
}
