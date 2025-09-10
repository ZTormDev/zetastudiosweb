import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../features/homepage/pages/HomePage";
import {
  VoxelandPage,
  GameInfoPage,
  NewsPage,
  SupportPage,
  BlogDetailPage,
} from "../features/games/voxeland/pages";

// Routes configuration
const appRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/voxeland",
    element: <VoxelandPage />,
  },
  {
    path: "/voxeland/gameinfo",
    element: <GameInfoPage />,
  },
  {
    path: "/voxeland/news",
    element: <NewsPage />,
  },
  {
    path: "/voxeland/news/:slug",
    element: <BlogDetailPage />,
  },
  {
    path: "/voxeland/support",
    element: <SupportPage />,
  },
];

const router = createBrowserRouter(appRoutes);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
