import React from "react";
import { motion } from "framer-motion";
import { GameLayout } from "../../../../shared/layouts";
import {
  SEOHead,
  Button,
  MediaGalleryModal,
} from "../../../../shared/components";
import { GameHeader } from "../../components/GameHeader";
import { getGameBySlug } from "../../../../core/config/games";
import { useMediaGallery } from "../../../../core/hooks";
import {
  isYouTubeUrl,
  getYouTubeVideoId,
  getYouTubeEmbedUrl,
} from "../../../../core/utils";
import "../styles/gameinfo.scss";

export const GameInfoPage: React.FC = () => {
  const game = getGameBySlug("voxeland");

  // Prepare separate media items for images and videos
  const imageItems = (game?.screenshots || []).map((screenshot) => ({
    type: "image" as const,
    src: screenshot,
    alt: `${game?.name} screenshot`,
  }));

  const videoItems = game?.trailerUrl
    ? [
        {
          type: "video" as const,
          src: game.trailerUrl,
          poster: game.screenshots?.[0] || "",
          alt: `${game?.name} trailer`,
          isYoutube: isYouTubeUrl(game.trailerUrl),
          youtubeId: isYouTubeUrl(game.trailerUrl)
            ? getYouTubeVideoId(game.trailerUrl)
            : null,
        },
      ]
    : [];

  // Image gallery hook
  const {
    isOpen: isImageGalleryOpen,
    currentIndex: currentImageIndex,
    openGallery: openImageGallery,
    closeGallery: closeImageGallery,
    navigateToItem: navigateToImage,
  } = useMediaGallery(imageItems);

  // Video gallery hook
  const {
    isOpen: isVideoGalleryOpen,
    currentIndex: currentVideoIndex,
    openGallery: openVideoGallery,
    closeGallery: closeVideoGallery,
    navigateToItem: navigateToVideo,
  } = useMediaGallery(videoItems);

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <GameLayout game={game}>
      <SEOHead
        title={`${game.name} - Game Information`}
        description={`Detailed information about ${game.name} including features, system requirements, and gameplay mechanics.`}
        keywords={[
          ...game.metadata.seo.keywords,
          "game info",
          "specifications",
          "requirements",
        ]}
        ogImage={game.metadata.seo.ogImage}
      />

      <GameHeader gameSlug="voxeland" />

      <main className="voxeland-gameinfo">
        {/* Hero Overview Section */}
        <section className="gameinfo-hero">
          <div className="container">
            <motion.div
              className="gameinfo-hero__content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="gameinfo-hero__text">
                <motion.h1
                  className="gameinfo-hero__title"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {game.name}
                </motion.h1>
                <motion.p
                  className="gameinfo-hero__subtitle"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {game.genre.join(" • ")}
                </motion.p>
                <motion.p
                  className="gameinfo-hero__description"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {game.description}
                </motion.p>
                <motion.div
                  className="gameinfo-hero__badges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span
                    className={`status-badge status-badge--${game.status.toLowerCase()}`}
                  >
                    {game.status}
                  </span>
                  {game.releaseDate && (
                    <span className="release-badge">
                      Expected Release: {game.releaseDate}
                    </span>
                  )}
                </motion.div>
              </div>
              <motion.div
                className="gameinfo-hero__media"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="gameinfo-hero__image-container">
                  <img
                    src={game.screenshots[0]}
                    alt={`${game.name} screenshot`}
                    className="gameinfo-hero__image"
                    loading="lazy"
                  />
                  <div className="gameinfo-hero__glow"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="gameinfo-features">
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Key Features
            </motion.h2>
            <div className="features-grid">
              {game.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="feature-card__icon">
                    <div className="feature-icon"></div>
                  </div>
                  <h3 className="feature-card__title">{feature}</h3>
                  <div className="feature-card__glow"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* System Requirements Section */}
        {game.systemRequirements && (
          <section className="gameinfo-requirements">
            <div className="container">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                System Requirements
              </motion.h2>
              <div className="requirements-grid">
                <motion.div
                  className="requirements-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="requirements-card__title">
                    <span className="requirements-card__badge">Minimum</span>
                    Minimum Requirements
                  </h3>
                  <ul className="requirements-list">
                    <li>
                      <span className="req-label">OS:</span>
                      <span className="req-value">
                        {game.systemRequirements.minimum.os}
                      </span>
                    </li>
                    <li>
                      <span className="req-label">Processor:</span>
                      <span className="req-value">
                        {game.systemRequirements.minimum.processor}
                      </span>
                    </li>
                    <li>
                      <span className="req-label">Memory:</span>
                      <span className="req-value">
                        {game.systemRequirements.minimum.memory}
                      </span>
                    </li>
                    <li>
                      <span className="req-label">Graphics:</span>
                      <span className="req-value">
                        {game.systemRequirements.minimum.graphics}
                      </span>
                    </li>
                    <li>
                      <span className="req-label">Storage:</span>
                      <span className="req-value">
                        {game.systemRequirements.minimum.storage}
                      </span>
                    </li>
                  </ul>
                </motion.div>
                {game.systemRequirements.recommended && (
                  <motion.div
                    className="requirements-card requirements-card--recommended"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="requirements-card__title">
                      <span className="requirements-card__badge requirements-card__badge--recommended">
                        Recommended
                      </span>
                      Recommended Requirements
                    </h3>
                    <ul className="requirements-list">
                      <li>
                        <span className="req-label">OS:</span>
                        <span className="req-value">
                          {game.systemRequirements.recommended.os}
                        </span>
                      </li>
                      <li>
                        <span className="req-label">Processor:</span>
                        <span className="req-value">
                          {game.systemRequirements.recommended.processor}
                        </span>
                      </li>
                      <li>
                        <span className="req-label">Memory:</span>
                        <span className="req-value">
                          {game.systemRequirements.recommended.memory}
                        </span>
                      </li>
                      <li>
                        <span className="req-label">Graphics:</span>
                        <span className="req-value">
                          {game.systemRequirements.recommended.graphics}
                        </span>
                      </li>
                      <li>
                        <span className="req-label">Storage:</span>
                        <span className="req-value">
                          {game.systemRequirements.recommended.storage}
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Screenshots Gallery */}
        <section className="gameinfo-gallery">
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Screenshots & Gallery
            </motion.h2>
            <div className="gallery-grid">
              {game.screenshots.map((screenshot: string, index: number) => (
                <motion.div
                  key={index}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => openImageGallery(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="gallery-item__container">
                    <img
                      src={screenshot}
                      alt={`${game.name} screenshot ${index + 1}`}
                      className="gallery-item__image"
                      loading="lazy"
                    />
                    <div className="gallery-item__overlay">
                      <div className="gallery-item__zoom">🔍</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Videos Section */}
        {game.trailerUrl && (
          <section className="gameinfo-videos">
            <div className="container">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Game Trailer & Videos
              </motion.h2>
              <div className="videos-grid">
                <motion.div
                  className="video-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  onClick={() => openVideoGallery(0)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="video-item__container">
                    {isYouTubeUrl(game.trailerUrl) ? (
                      // YouTube video
                      (() => {
                        const videoId = getYouTubeVideoId(game.trailerUrl);
                        return videoId ? (
                          <iframe
                            className="video-item__player youtube-iframe"
                            src={getYouTubeEmbedUrl(videoId)}
                            title={`${game.name} trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="video-error">Invalid YouTube URL</div>
                        );
                      })()
                    ) : (
                      // Local video file
                      <video
                        className="video-item__player"
                        poster={game.screenshots[0]}
                        controls
                        muted
                        preload="metadata"
                      >
                        <source src={game.trailerUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <div className="video-item__glow"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Download CTA Section */}
        <section className="gameinfo-download">
          <div className="container">
            <motion.div
              className="download-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="download-content__text">
                <h2 className="download-title">Ready to Enter the World?</h2>
                <p className="download-description">
                  Join thousands of players in the ultimate voxel survival
                  experience. Build, explore, and survive in infinite
                  procedurally generated worlds.
                </p>
                <div className="download-stats">
                  <div className="stat">
                    <span className="stat-number">2K+</span>
                    <span className="stat-label">Active Players</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">4.8★</span>
                    <span className="stat-label">User Rating</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">10k+</span>
                    <span className="stat-label">Downloads</span>
                  </div>
                </div>
              </div>
              <div className="download-buttons">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => (window.location.href = "/voxeland")}
                  >
                    Download Now - Free
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    size="large"
                    onClick={() => (window.location.href = "/voxeland/news")}
                  >
                    Latest Updates
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Image Gallery Modal */}
      <MediaGalleryModal
        isOpen={isImageGalleryOpen}
        onClose={closeImageGallery}
        items={imageItems}
        currentIndex={currentImageIndex}
        onNavigate={navigateToImage}
      />

      {/* Video Gallery Modal */}
      <MediaGalleryModal
        isOpen={isVideoGalleryOpen}
        onClose={closeVideoGallery}
        items={videoItems}
        currentIndex={currentVideoIndex}
        onNavigate={navigateToVideo}
      />
    </GameLayout>
  );
};
