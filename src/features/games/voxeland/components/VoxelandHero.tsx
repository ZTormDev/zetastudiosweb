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
  // Default to poster (no autoplay) to avoid forcing video decode on low-end devices
  const [videoVisible, setVideoVisible] = useState<boolean>(false);

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

  // Respect user/system reduced motion preference to avoid heavy animations
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const onChange = () => setPrefersReducedMotion(mq.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    } catch {
      // ignore (server-side or unsupported)
    }
  }, []);

  useEffect(() => {
    // Particle animation effect
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const hero = heroRef.current;

    if (!hero || !ctx) return;

    canvas.className = "voxeland-hero__particles";
    hero.appendChild(canvas);

    // Resize canvas to the hero element size and handle devicePixelRatio to avoid extra work
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = hero.clientWidth || window.innerWidth;
      const h = hero.clientHeight || window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      // reset transform and scale once
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Determine particle count based on viewport size and device memory
    const nav = navigator as unknown as {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const deviceMemory = nav.deviceMemory || 4;
    const vw = window.innerWidth;
    let particleCount = 60;
    if (vw < 768) particleCount = 18;
    else if (vw < 1280) particleCount = 36;
    else particleCount = 60;
    // reduce if low memory
    if (deviceMemory < 1.5)
      particleCount = Math.max(8, Math.floor(particleCount / 3));

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width || window.innerWidth),
        y: Math.random() * (canvas.height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    // Control animation with refs so we can pause when not visible
    const isRunningRef = { current: true } as { current: boolean };
    let rafId: number | null = null;

    const animate = () => {
      if (!isRunningRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = `rgba(74, 144, 226, ${particle.alpha})`;
        // draw small rectangle in CSS pixels (ctx is scaled by dpr above)
        ctx.fillRect(particle.x, particle.y, 2, 2);
      });

      rafId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause the animation when hero is offscreen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isRunningRef.current = entry.isIntersecting;
          if (isRunningRef.current && rafId === null) {
            // restart animation loop
            animate();
          }
          if (!isRunningRef.current && rafId !== null) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      },
      { threshold: 0.05 }
    );

    io.observe(hero);

    // Start animation loop
    animate();

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        isRunningRef.current = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      } else {
        if (!isRunningRef.current) {
          isRunningRef.current = true;
          animate();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (hero.contains(canvas)) {
        hero.removeChild(canvas);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="voxeland-hero">
      <div className="voxeland-hero__video-container">
        {videoVisible ? (
          <motion.video
            ref={videoRef}
            className="voxeland-hero__video"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ) : (
          <div className="voxeland-hero__video-poster">
            <img
              src={game.image || "/assets/img/voxeland/voxeland-screenshot.png"}
              alt={`${game.name} poster`}
              loading="lazy"
            />
            <button
              className="voxeland-hero__poster-play"
              onClick={() => setVideoVisible(true)}
              aria-label="Play trailer"
            >
              <FaPlay />
            </button>
          </div>
        )}
        <div className="voxeland-hero__overlay"></div>
      </div>

      <div className="voxeland-hero__content">
        <div className="container">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1, ease: "easeOut" }
            }
            className="voxeland-hero__text"
          >
            <motion.h1
              className="voxeland-hero__title"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.2 }
              }
            >
              <span className="voxeland-hero__title-main">{game.name}</span>
            </motion.h1>

            <motion.p
              className="voxeland-hero__subtitle"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.4 }
              }
            >
              {game.description}
            </motion.p>

            <motion.div
              className="voxeland-hero__features"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.6 }
              }
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
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1, delay: 0.8 }
            }
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
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 1 }
            }
          >
            <div className="voxeland-hero__stat">
              <span className="voxeland-hero__stat-number">2K+</span>
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
