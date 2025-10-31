import { Game } from "../types";

export const GAMES_CONFIG: Record<string, Game> = {
  voxeland: {
    id: "voxeland",
    name: "Voxeland",
    slug: "voxeland",
    description:
      "An Open World Voxel-Based Survival RPG where you can build, explore, and survive in a procedurally generated world.",
    shortDescription: "An Open World Voxel Survival RPG Game",
    image: "/assets/img/voxeland/voxeland-sunrise.png",
    logo: "/assets/img/logos/voxeland-letter.png",
    status: "development",
    platforms: ["windows"],
    genre: ["RPG", "Survival", "Open World", "Voxel"],
    downloadLink: "https://i.imgur.com/pKULtB1.png",
    trailerUrl: "https://i.imgur.com/pKULtB1.png",
    screenshots: [
      "/assets/img/voxeland/voxeland-day.png",
      "/assets/img/voxeland/voxeland-night.png",
      "/assets/img/voxeland/voxeland-sunrise.png",
    ],
    features: [
      "Procedurally generated infinite worlds",
      "Voxel-based building system",
      "Survival mechanics",
      "RPG progression system",
    ],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i3-4340 / AMD FX-6300",
        memory: "4 GB RAM",
        graphics: "NVIDIA GeForce GTX 660 / AMD Radeon HD 7850",
        storage: "2 GB available space",
      },
      recommended: {
        os: "Windows 11 64-bit",
        processor: "Intel Core i5-8400 / AMD Ryzen 5 2600",
        memory: "8 GB RAM",
        graphics: "NVIDIA GeForce GTX 1060 / AMD Radeon RX 580",
        storage: "4 GB available space",
      },
    },
    metadata: {
      theme: {
        primaryColor: "#2ecc71",
        secondaryColor: "#27ae60",
        accentColor: "#f39c12",
        backgroundPattern: "/assets/img/voxeland/backgroundpattern.png",
      },
      navigation: [
        { label: "Home", path: "/voxeland" },
        { label: "Game Info", path: "/voxeland/gameinfo" },
        { label: "News", path: "/voxeland/news" },
        { label: "Support", path: "/voxeland/support" },
      ],
      seo: {
        title: "Voxeland - Open World Voxel Survival RPG",
        description:
          "Experience the ultimate voxel survival adventure. Build, explore, and survive in procedurally generated worlds.",
        keywords: [
          "voxeland",
          "voxel game",
          "survival",
          "RPG",
          "open world",
          "indie game",
        ],
        ogImage: "/assets/img/voxeland/voxeland-screenshot.png",
      },
    },
  },
};

// Helper function to get all games as array
export const getAllGames = (): Game[] => Object.values(GAMES_CONFIG);

// Helper function to get game by slug
export const getGameBySlug = (slug: string): Game | undefined =>
  GAMES_CONFIG[slug];

// Helper function to get game routes
export const getGameRoutes = (gameSlug: string): string[] => {
  const game = getGameBySlug(gameSlug);
  return game ? game.metadata.navigation.map((nav) => nav.path) : [];
};
