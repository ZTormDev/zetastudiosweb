import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import ZetaStudios from "./ZetaStudios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Voxeland from "./games-pages/Voxeland/Voxeland";
import GameInfo from "./games-pages/Voxeland/Pages/GameInfo/GameInfo";
import News from "./games-pages/Voxeland/Pages/News/News";
import BlogDetail from "./games-pages/Voxeland/Pages/blogs/BlogDetail";
import Support from "./games-pages/Voxeland/Pages/Support/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ZetaStudios />, // Página principal
  },
  {
    path: "/voxeland",
    element: <Voxeland />, // Página de Voxeland
  },
  {
    path: "/voxeland/gameinfo",
    element: <GameInfo />, // Página de GameInfo
  },
  {
    path: "/voxeland/news",
    element: <News />, // Página de Noticias
  },
  {
    path: "/voxeland/news/:id",
    element: <BlogDetail />, // Página de detalles del blog
  },
  {
    path: "/voxeland/support",
    element: <Support />, // Página de Soporte
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
