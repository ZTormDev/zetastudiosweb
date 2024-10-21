import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogData from "../blogs/BlogData"; // Importamos los datos del blog
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

// Interfaz para los datos del blog
interface BlogPostData {
  id: string;
  title: string;
  shortContent: string;
  imageUrl: string;
  date: string;
}

// Componente BlogPost para mostrar cada post
const BlogPost: React.FC<BlogPostData> = ({
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

const News: React.FC = () => {
  // Función para convertir el formato de la fecha de "DD/MM/YYYY" a "YYYY-MM-DD"
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Ordenamos los blogs por fecha, del más reciente al más antiguo
  const sortedBlogs: BlogPostData[] = BlogData.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="voxeland-page page">
      <Header></Header>
      <div className="news-page">
        <h2 className="section-title">All News</h2>
        <section className="blog-posts">
          <div className="blogs">
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
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default News;
