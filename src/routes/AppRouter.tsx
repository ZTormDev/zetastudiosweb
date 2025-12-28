import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../features/homepage/pages/HomePage";

// Routes configuration
const appRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
];

const router = createBrowserRouter(appRoutes);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
