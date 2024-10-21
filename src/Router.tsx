import { Route, Routes } from "react-router-dom";
import Voxeland from "./games-pages/Voxeland/Voxeland";
import ZetaStudios from "./ZetaStudios";
import BlogDetail from "./games-pages/Voxeland/Pages/blogs/BlogDetail";
import News from "./games-pages/Voxeland/Pages/News/News";
import GameInfo from "./games-pages/Voxeland/Pages/GameInfo/GameInfo";
import Support from "./games-pages/Voxeland/Pages/Support/Support";
import DynamicHead from "./DynamicHead"; // Importa tu componente

const Router: React.FC = () => {
  return (
    <>
      <DynamicHead />
      <Routes>
        <Route path="/voxeland" element={<Voxeland />} />
        <Route path="/voxeland/gameinfo" element={<GameInfo />} />
        <Route path="/voxeland/news" element={<News />} />
        <Route path="/voxeland/news/:id" element={<BlogDetail />} />
        <Route path="/voxeland/support" element={<Support />} />
        <Route path="/" element={<ZetaStudios />} />
      </Routes>
    </>
  );
};

export default Router;
