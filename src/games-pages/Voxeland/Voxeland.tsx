import React, { useEffect } from "react";
import "./voxeland-styles.scss";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import BlogData from "./Pages/blogs/BlogData"; // Importamos los datos de los blogs
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

// Interfaz para los datos del blog
interface BlogPostData {
  id: string;
  title: string;
  shortContent: string;
  content: string;
  imageUrl: string;
  date: string;
}

interface BlogPostProps {
  id: string;
  title: string;
  shortContent: string;
  imageUrl: string;
  date: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  shortContent,
  imageUrl,
  date,
}) => (
  <Link to={`/voxeland/news/${id}`} className="blog-post">
    <div className="blog-image">
      <img src={imageUrl} alt={title} />
    </div>
    <div className="blog-text">
      <h3 className="blog-post-title">
        {title}
        <p className="date">{date}</p>
      </h3>
      <p>{shortContent}</p>
    </div>
  </Link>
);

const GameInfo: React.FC = () => (
  <section className="game-info">
    <h2 className="section-title">What is Voxeland?</h2>
    <p>
      Voxeland is an Open World Survival RPG based on Voxels, with Procedural
      World Generation (Terrain, Structures, NPCs, etc.). You can also play with
      friends to share unique experiences! Fight against monsters, engage in
      epic Boss Battles, and More!
    </p>
    <div className="game-screenshot">
      <img
        src="/src/assets/img/voxeland/voxeland.png"
        alt="Voxeland Gameplay"
      />
    </div>
  </section>
);

interface DownloadSectionProps {
  downloadLink: string; // Prop para el enlace de descarga
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ downloadLink }) => (
  <section id="download" className="download-section">
    <h2 className="section-title">Download Voxeland</h2>
    <p>Join the adventure now! Download Voxeland for Windows.</p>
    <a href={downloadLink} target="_blank">
      <button className="cta-button">Download</button>
    </a>
  </section>
);

// Función para convertir fechas de "dd/mm/yyyy" a "yyyy-mm-dd"
const convertDateToISO = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Voxeland: React.FC = () => {
  const gameDownloadLink =
    "https://drive.google.com/file/d/1Q30IMyfw1bbIwel6axFutqDPP812oqKi/view?usp=sharing";

  // Tipar los blogs como BlogPostData[]
  const sortedBlogs: BlogPostData[] = BlogData.sort((a, b) => {
    // Convertimos las fechas antes de compararlas
    const dateA = new Date(convertDateToISO(a.date)).getTime();
    const dateB = new Date(convertDateToISO(b.date)).getTime();
    return dateB - dateA; // Orden descendente (más reciente primero)
  }).slice(0, 3); // Tomamos solo los últimos 3

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="voxeland-page page">
      <Header />

      <main className="main-content">
        <section className="hero">
          <video
            className="hero-video"
            src="/src/assets/video/voxeland/cubeworldpresentation.mp4"
            autoPlay
            loop
            muted
          ></video>
          <div className="hero-content">
            <h1 className="hero-title">VOXELAND</h1>
            <p className="hero-subtitle">
              An Open World Voxel-Based Survival RPG
            </p>
            <button className="cta-button">PLAY</button>
          </div>
        </section>

        <GameInfo />

        <DownloadSection downloadLink={gameDownloadLink} />

        <section className="blog-posts">
          <div className="blogs">
            <h2 className="section-title">LATEST NEWS</h2>
            {sortedBlogs.map((blog: BlogPostData) => (
              <BlogPost
                key={blog.id}
                id={blog.id}
                date={blog.date}
                title={blog.title}
                shortContent={blog.shortContent} // Mostramos el shortContent
                imageUrl={blog.imageUrl}
              />
            ))}
          </div>
          <Link to={"/voxeland/news"} className="see-more">
            <p>
              See more <MoreHorizRoundedIcon></MoreHorizRoundedIcon>
            </p>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Voxeland;
