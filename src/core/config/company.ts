import { CompanyConfig } from "../types";

export const COMPANY_CONFIG: CompanyConfig = {
  name: "ZETA STUDIOS",
  namePart1: "ZETA",
  namePart2: "STUDIOS",
  slogan: "Built for players, by players.",
  logo: "/assets/img/zetastudios.svg",
  foundedBy: "ZTorm",
  foundedYear: 2023,
  location: "Chile",
  email: "zetastudiosgames@gmail.com",
  socialLinks: {
    twitter: "https://x.com/zetastudios_dev",
    youtube: "https://www.youtube.com/@zetastudiosdev",
  },
  team: [
    {
      name: "ZTorm",
      role: "Founder & Lead Developer",
      bio: "Founder of the studio. He handles game design, art, writing, coding, and takes care of the website. A jack of all trades, master of fun.",
      socialLinks: {
        twitter: "https://x.com/zetastudios_dev",
      },
    },
  ],
  about: {
    description:
      "ZETA STUDIOS is an indie game studio originally founded by ZTorm from Chile. We are driven by a passion for creating unique and engaging gaming experiences. Our focus is on delivering high-quality games that resonate with players and foster a strong sense of community.",
    mission:
      "Creating immersive gaming experiences that bring players together.",
    vision:
      "To become a leading indie game studio known for innovative and engaging games.",
  },
  copyright: {
    statement: "©2024 ZETA STUDIOS. All rights reserved.",
    allowedUses: [
      "Make and monetize gameplay videos.",
      "Make and sell fan art.",
      "Make and sell covers of our game's songs.",
      "Add a cameo appearance of any of our game's characters inside your game.",
      "Probably any transformative work you do for free.",
    ],
  },
};

// Navigation for the main website
export const MAIN_NAVIGATION = [
  { label: "Home", path: "/" },
  { label: "Games", path: "/#games" },
  { label: "About Us", path: "/#about-us" },
  { label: "Contact", path: `mailto:${COMPANY_CONFIG.email}` },
];

// SEO defaults
export const DEFAULT_SEO = {
  title: "ZETA STUDIOS - Indie Game Development Studio",
  description:
    "We make games we want to play. Discover our latest indie games and join our gaming community.",
  keywords: [
    "indie games",
    "game development",
    "video games",
    "gaming",
    "ZetaStudios",
  ],
  ogImage: "/assets/img/logozeta.png",
};
