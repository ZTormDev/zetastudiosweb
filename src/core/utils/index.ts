/**
 * Date utilities
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(convertDateToISO(dateStr));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertDateToISO = (dateStr: string): string => {
  // Convert from "dd/mm/yyyy" to "yyyy-mm-dd"
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const sortByDate = <T extends { date: string }>(
  items: T[],
  descending = true
): T[] => {
  return items.sort((a, b) => {
    const dateA = new Date(convertDateToISO(a.date)).getTime();
    const dateB = new Date(convertDateToISO(b.date)).getTime();
    return descending ? dateB - dateA : dateA - dateB;
  });
};

/**
 * String utilities
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
};

/**
 * Array utilities
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[]): T[] => [...new Set(array)];

/**
 * SEO utilities
 */
export const generateMetaTags = (seo: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
}) => {
  return {
    title: seo.title,
    meta: [
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords?.join(", ") || "" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:image", content: seo.ogImage || "" },
      { property: "og:url", content: seo.url || "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: seo.ogImage || "" },
    ].filter((meta) => meta.content !== ""),
  };
};

/**
 * URL utilities
 */
export const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:")
  );
};

export const buildGameUrl = (gameSlug: string, path = ""): string => {
  return `/${gameSlug}${path}`;
};

/**
 * YouTube utilities
 */
export const isYouTubeUrl = (url: string): boolean => {
  return url.includes("youtube.com/watch") || url.includes("youtu.be/");
};

export const getYouTubeVideoId = (url: string): string | null => {
  const regexPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of regexPatterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
};

export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

export const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Export animation variants
export * from "./animations";

/**
 * Storage utilities
 */
export const localStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail
    }
  },
  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  },
};
