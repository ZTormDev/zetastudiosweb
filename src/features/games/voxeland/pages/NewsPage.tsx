import React from "react";
import { GameLayout } from "../../../../shared/layouts";
import { SEOHead, Button } from "../../../../shared/components";
import { GameHeader } from "../../components/GameHeader";
import { getGameBySlug } from "../../../../core/config/games";
import { getVoxelandBlogPosts } from "../config/blog-data";
import { VoxelandBlogPost } from "../components";

export const NewsPage: React.FC = () => {
  const game = getGameBySlug("voxeland");
  const allBlogs = getVoxelandBlogPosts();

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <GameLayout game={game}>
      <SEOHead
        title={`${game.name} - Latest News & Updates`}
        description={`Stay up to date with the latest news, updates, and development progress for ${game.name}.`}
        keywords={[
          ...game.metadata.seo.keywords,
          "news",
          "updates",
          "development",
          "blog",
        ]}
        ogImage={game.metadata.seo.ogImage}
      />

      <GameHeader gameSlug="voxeland" />

      <main className="news-page">
        <section className="news-hero">
          <div className="container">
            <h1 className="hero-title">Latest News & Updates</h1>
            <p className="hero-subtitle">
              Stay informed about the latest developments, features, and updates
              for {game.name}
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{allBlogs.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100K+</span>
                <span className="stat-label">Players</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </section>

        {allBlogs.length > 0 && (
          <section className="featured-article">
            <div className="container">
              <h2 className="section-title">Featured Article</h2>
              <div className="featured-card">
                <div className="featured-card__image">
                  <img src={allBlogs[0].imageUrl} alt={allBlogs[0].title} />
                </div>
                <div className="featured-card__content">
                  <div className="category">
                    {allBlogs[0].tags[0] || "News"}
                  </div>
                  <h3 className="title">{allBlogs[0].title}</h3>
                  <p className="excerpt">{allBlogs[0].shortContent}</p>
                  <div className="meta">
                    <span className="date">
                      {new Date(allBlogs[0].date).toLocaleDateString()}
                    </span>
                    <span className="author">by {allBlogs[0].author}</span>
                  </div>
                  <Button
                    variant="primary"
                    className="read-more-btn"
                    onClick={() =>
                      (window.location.href = `/voxeland/news/${allBlogs[0].slug}`)
                    }
                  >
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="news-grid">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">All Articles</h2>
              <p className="section-subtitle">
                Discover the latest updates and insights from our development
                team
              </p>
            </div>

            <div className="news-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Updates</button>
              <button className="filter-btn">Development</button>
              <button className="filter-btn">Community</button>
            </div>

            {allBlogs.length === 0 ? (
              <div className="news-empty">
                <div className="news-empty__content">
                  <h3 className="news-empty__title">No Articles Yet</h3>
                  <p className="news-empty__description">
                    We're working on bringing you the latest news and updates.
                    Check back soon!
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => (window.location.href = "/voxeland")}
                  >
                    Back to Game Page
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="articles-grid">
                  {allBlogs.slice(1).map((blog) => (
                    <VoxelandBlogPost
                      key={blog.id}
                      post={blog}
                      variant="card"
                    />
                  ))}
                </div>
                {allBlogs.length > 6 && (
                  <div className="load-more">
                    <button className="load-more-btn">
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="news-newsletter">
          <div className="container">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-description">
                Get the latest news and updates delivered directly to your inbox
              </p>
              <form className="newsletter-form">
                <div className="newsletter-form__group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="newsletter-form__input"
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="newsletter-form__button"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="newsletter-form__disclaimer">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="news-links">
          <div className="container">
            <div className="quick-links">
              <h3 className="quick-links__title">Quick Links</h3>
              <div className="quick-links__grid">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/voxeland")}
                >
                  Game Overview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/voxeland/gameinfo")}
                >
                  Game Information
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/voxeland/support")}
                >
                  Support
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/voxeland")}
                >
                  Download Game
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </GameLayout>
  );
};
