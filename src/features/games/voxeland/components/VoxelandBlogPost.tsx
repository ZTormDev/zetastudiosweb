import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../../../core/types";
import { formatDate } from "../../../../core/utils";

interface VoxelandBlogPostProps {
  post: BlogPost;
  variant?: "card" | "list";
}

export const VoxelandBlogPost: React.FC<VoxelandBlogPostProps> = ({
  post,
  variant = "card",
}) => {
  return (
    <article className={`voxeland-blog-post voxeland-blog-post--${variant}`}>
      <Link
        to={`/voxeland/news/${post.slug}`}
        className="voxeland-blog-post__link"
      >
        <div className="voxeland-blog-post__image">
          <img src={post.imageUrl} alt={post.title} loading="lazy" />
        </div>

        <div className="voxeland-blog-post__content">
          <header className="voxeland-blog-post__header">
            <h3 className="voxeland-blog-post__title">{post.title}</h3>
            <div className="voxeland-blog-post__meta">
              <time className="voxeland-blog-post__date">
                {formatDate(post.date)}
              </time>
              <span className="voxeland-blog-post__author">
                by {post.author}
              </span>
            </div>
          </header>

          <div className="voxeland-blog-post__excerpt">
            <p>{post.shortContent}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <footer className="voxeland-blog-post__footer">
              <div className="voxeland-blog-post__tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="voxeland-blog-post__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </Link>
    </article>
  );
};
