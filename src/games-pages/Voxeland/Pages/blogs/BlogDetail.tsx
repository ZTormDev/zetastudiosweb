import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogData from "./BlogData";
import "../../voxeland-styles.scss";
import "./blog-styles.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const blogData = BlogData;

const BlogDetail: React.FC = () => {
  const { id } = useParams();

  const blogPost = blogData.find((post) => post.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blogPost) {
    return <p>Blog post not found!</p>;
  }

  return (
    <div className="voxeland-page page">
      <Header />
      <div className="blog-detail">
        <img
          className="blog-img"
          src={blogPost.imageUrl}
          alt={blogPost.title}
        />
        <h2 className="blog-title">{blogPost.title}</h2>
        <p className="date">{blogPost.date}</p>
        <p className="blog-content">{blogPost.content}</p>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
