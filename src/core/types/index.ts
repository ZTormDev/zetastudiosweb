// ==========================================
// Core Type Definitions
// ==========================================

export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  backgroundImage?: string;
  logo?: string;
  status: GameStatus;
  releaseDate?: string;
  platforms: Platform[];
  genre: string[];
  downloadLink?: string;
  steamLink?: string;
  trailerUrl?: string;
  screenshots: string[];
  features: string[];
  systemRequirements?: SystemRequirements;
  socialLinks?: SocialLinks;
  metadata: GameMetadata;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  shortContent: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
  gameId?: string; // To associate posts with specific games
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  youtube?: string;
  discord?: string;
  steam?: string;
  itch?: string;
  github?: string;
}

export interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface GameMetadata {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundPattern?: string;
  };
  navigation: NavigationItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  external?: boolean;
}

export type GameStatus =
  | "development"
  | "alpha"
  | "beta"
  | "released"
  | "discontinued";
export type Platform =
  | "windows"
  | "mac"
  | "linux"
  | "steam"
  | "itch"
  | "mobile";

// Route types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  children?: RouteConfig[];
  requiresAuth?: boolean;
  gameId?: string;
}

// Company configuration
export interface CompanyConfig {
  name: string;
  namePart1: string;
  namePart2: string;
  slogan: string;
  logo: string;
  foundedBy: string;
  foundedYear: number;
  location: string;
  email: string;
  socialLinks: SocialLinks;
  team: TeamMember[];
  about: {
    description: string;
    mission: string;
    vision: string;
  };
  copyright: {
    statement: string;
    allowedUses: string[];
  };
}
