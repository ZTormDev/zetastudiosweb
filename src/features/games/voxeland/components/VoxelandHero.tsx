import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaDownload, FaSteam, FaGamepad } from "react-icons/fa";
import { Button, MediaGalleryModal } from "../../../../shared/components";
import { useMediaGallery } from "../../../../core/hooks";
import { isYouTubeUrl, getYouTubeVideoId } from "../../../../core/utils";
import { Game } from "../../../../core/types";

interface VoxelandHeroProps {
  game: Game;
  videoSrc?: string;
}

export const VoxelandHero: React.FC<VoxelandHeroProps> = ({
  game,
  videoSrc = "/assets/video/voxeland/cubeworldpresentation.mp4",
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Prepare video items for modal
  const videoItems = game?.trailerUrl
    ? [
        {
          type: "video" as const,
          src: game.trailerUrl,
          poster: game.image || "",
          alt: `${game.name} trailer`,
          isYoutube: isYouTubeUrl(game.trailerUrl),
          youtubeId: isYouTubeUrl(game.trailerUrl)
            ? getYouTubeVideoId(game.trailerUrl)
            : null,
        },
      ]
    : [];

  // Video modal hook
  const {
    isOpen: isVideoModalOpen,
    openGallery: openVideoModal,
    closeGallery: closeVideoModal,
    currentIndex,
    navigateToItem,
  } = useMediaGallery(videoItems);

  const handleWatchTrailer = () => {
    if (game.trailerUrl && videoItems.length > 0) {
      openVideoModal(0);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    // Particle animation effect
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const hero = heroRef.current;

    if (!hero || !ctx) return;

    canvas.className = "voxeland-hero__particles";
    hero.appendChild(canvas);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = `rgba(74, 144, 226, ${particle.alpha})`;
        ctx.fillRect(particle.x, particle.y, 2, 2);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (hero.contains(canvas)) {
        hero.removeChild(canvas);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="voxeland-hero">
      <div className="voxeland-hero__video-container">
        <motion.video
          ref={videoRef}
          className="voxeland-hero__video"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 5, ease: "easeOut" }}
        />
        <div className="voxeland-hero__overlay"></div>
      </div>

      <div className="voxeland-hero__content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="voxeland-hero__text"
          >
            <motion.h1
              className="voxeland-hero__title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="voxeland-hero__title-main">{game.name}</span>
            </motion.h1>

            <motion.p
              className="voxeland-hero__subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {game.description}
            </motion.p>

            <motion.div
              className="voxeland-hero__features"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="voxeland-hero__feature">
                <FaGamepad />
                <span>Infinite Adventure</span>
              </div>
              <div className="voxeland-hero__feature">
                <FaPlay />
                <span>3D Voxel World</span>
              </div>
              <div className="voxeland-hero__feature">
                <FaSteam />
                <span>Multiplayer</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="voxeland-hero__actions"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {game.downloadLink && (
              <>
                <Button
                  href={game.downloadLink}
                  variant="primary"
                  size="large"
                  className="voxeland-hero__cta-primary"
                >
                  <FaDownload />
                  Play Now
                </Button>
                {game.trailerUrl && (
                  <Button
                    onClick={handleWatchTrailer}
                    variant="secondary"
                    size="large"
                    className="voxeland-hero__cta-secondary"
                  >
                    <FaPlay />
                    Watch Trailer
                  </Button>
                )}
              </>
            )}
          </motion.div>

          <motion.div
            className="voxeland-hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="voxeland-hero__stat">
              <span className="voxeland-hero__stat-number">10K+</span>
              <span className="voxeland-hero__stat-label">Players</span>
            </div>
            <div className="voxeland-hero__stat">
              <span className="voxeland-hero__stat-number">4.8★</span>
              <span className="voxeland-hero__stat-label">Rating</span>
            </div>
            <div className="voxeland-hero__stat">
              <span className="voxeland-hero__stat-number">Free</span>
              <span className="voxeland-hero__stat-label">Price</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <MediaGalleryModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        items={videoItems}
        currentIndex={currentIndex}
        onNavigate={navigateToItem}
      />
    </section>
  );
};
