import React from "react";
import { useParams, Link } from "react-router-dom";
import { GameLayout } from "../../../../shared/layouts";
import { SEOHead, Button } from "../../../../shared/components";
import { GameHeader } from "../../components/GameHeader";
import { getGameBySlug } from "../../../../core/config/games";
import { getVoxelandBlogPosts } from "../config/blog-data";
import { formatDate } from "../../../../core/utils";

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const game = getGameBySlug("voxeland");
  const allBlogs = getVoxelandBlogPosts();
  const blog = allBlogs.find((b) => b.slug === slug);

  if (!game) {
    return <div>Game not found</div>;
  }

  if (!blog) {
    return (
      <GameLayout game={game}>
        <div className="blog-not-found">
          <div className="container">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/voxeland/news">
              <Button variant="primary">Back to News</Button>
            </Link>
          </div>
        </div>
      </GameLayout>
    );
  }

  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <GameLayout game={game}>
      <SEOHead
        title={`${blog.title} - ${game.name} News`}
        description={blog.shortContent}
        keywords={[...game.metadata.seo.keywords, ...blog.tags]}
        ogImage={blog.imageUrl}
      />

      <GameHeader gameSlug="voxeland" />

      <main className="blog-detail">
        {/* Breadcrumb */}
        <section className="blog-breadcrumb">
          <div className="container">
            <nav className="breadcrumb">
              <Link to="/voxeland" className="breadcrumb__link">
                Voxeland
              </Link>
              <span className="breadcrumb__separator">{">"}</span>
              <Link to="/voxeland/news" className="breadcrumb__link">
                News
              </Link>
              <span className="breadcrumb__separator">{">"}</span>
              <span className="breadcrumb__current">{blog.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="blog-header">
          <div className="container">
            <div className="blog-header__content">
              <div className="blog-meta">
                <span className="blog-meta__date">{formatDate(blog.date)}</span>
                <span className="blog-meta__author">By {blog.author}</span>
                <div className="blog-meta__tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="blog-header__title">{blog.title}</h1>
              <p className="blog-header__excerpt">{blog.shortContent}</p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="blog-featured-image">
          <div className="container">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="blog-featured-image__img"
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="blog-content">
          <div className="container">
            <div className="blog-content__wrapper">
              <article className="blog-article">
                <div
                  className="blog-article__content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Article Sidebar */}
              <aside className="blog-sidebar">
                <div className="blog-sidebar__section">
                  <h3>Share Article</h3>
                  <div className="social-share">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => {
                        const url = window.location.href;
                        if (navigator.share) {
                          navigator.share({ title: blog.title, url });
                        } else {
                          navigator.clipboard.writeText(url);
                        }
                      }}
                    >
                      Share
                    </Button>
                  </div>
                </div>

                <div className="blog-sidebar__section">
                  <h3>Quick Navigation</h3>
                  <nav className="quick-nav">
                    <Link to="/voxeland" className="quick-nav__link">
                      Game Overview
                    </Link>
                    <Link to="/voxeland/gameinfo" className="quick-nav__link">
                      Game Information
                    </Link>
                    <Link to="/voxeland/news" className="quick-nav__link">
                      All News
                    </Link>
                    <Link to="/voxeland/support" className="quick-nav__link">
                      Support
                    </Link>
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {otherBlogs.length > 0 && (
          <section className="blog-related">
            <div className="container">
              <h2 className="section-title">Related Articles</h2>
              <div className="related-articles">
                {otherBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/voxeland/news/${relatedBlog.slug}`}
                    className="related-article"
                  >
                    <img
                      src={relatedBlog.imageUrl}
                      alt={relatedBlog.title}
                      className="related-article__image"
                    />
                    <div className="related-article__content">
                      <h3 className="related-article__title">
                        {relatedBlog.title}
                      </h3>
                      <p className="related-article__excerpt">
                        {relatedBlog.shortContent}
                      </p>
                      <span className="related-article__date">
                        {formatDate(relatedBlog.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to News */}
        <section className="blog-back">
          <div className="container">
            <div className="blog-back__content">
              <Link to="/voxeland/news">
                <Button variant="outline" size="large">
                  ← Back to All News
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </GameLayout>
  );
};
