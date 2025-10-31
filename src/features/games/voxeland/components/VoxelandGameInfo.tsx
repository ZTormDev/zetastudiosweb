import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaGamepad,
  FaCubes,
  FaUsers,
  FaRocket,
  FaDesktop,
  FaMemory,
  FaMicrochip,
  FaHdd,
  FaCheckCircle,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";
import { Game } from "../../../../core/types";

interface VoxelandGameInfoProps {
  game: Game;
}

export const VoxelandGameInfo: React.FC<VoxelandGameInfoProps> = ({ game }) => {
  const navigate = useNavigate();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const onChange = () => setPrefersReducedMotion(mq.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Initialize AOS when component mounts
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      });
    });
  }, []);

  const featureIcons = [FaGamepad, FaCubes, FaUsers, FaRocket];

  return (
    <section className="voxeland-game-info">
      <div className="container">
        {/* Hero Info Section */}
        <motion.div
          className="voxeland-game-info__hero"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          whileInView={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
          }
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }
          }
          viewport={{ once: true }}
        >
          <div className="voxeland-game-info__hero-content">
            <h2 className="voxeland-game-info__title">
              Discover the world of{" "}
              <span className="highlight">{game.name}</span>
            </h2>
            <p className="voxeland-game-info__description">
              {game.description}
            </p>
          </div>
          <div className="voxeland-game-info__hero-image">
            <img
              src="/assets/img/voxeland/voxeland-gameplay.png"
              alt="Voxeland Gameplay"
              className="hero-image"
              loading="lazy"
            />
            <div className="image-glow"></div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div
          className="voxeland-game-info__features-section"
          data-aos="fade-up"
        >
          <h3 className="section-title">Main Features</h3>
          <div className="voxeland-game-info__features-grid">
            {game.features.map((feature, index) => {
              const IconComponent = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={index}
                  className="voxeland-game-info__feature-card"
                >
                  <div className="feature-icon">
                    <IconComponent />
                  </div>
                  <h4 className="feature-title">{feature}</h4>
                  <div className="feature-glow"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* System Requirements */}
        {game.systemRequirements && (
          <div
            className="voxeland-game-info__requirements-section"
            data-aos="fade-up"
          >
            <h3 className="section-title">System Requirements</h3>
            <div className="voxeland-game-info__requirements">
              <div className="voxeland-game-info__req-card">
                <div className="req-header">
                  <FaCheckCircle className="req-icon" />
                  <h4>Minimum</h4>
                </div>
                <div className="req-content">
                  <div className="req-item">
                    <FaDesktop className="item-icon" />
                    <div className="item-details">
                      <span className="item-label">Operating System:</span>
                      <span className="item-value">
                        {game.systemRequirements.minimum.os}
                      </span>
                    </div>
                  </div>
                  <div className="req-item">
                    <FaMicrochip className="item-icon" />
                    <div className="item-details">
                      <span className="item-label">Processor:</span>
                      <span className="item-value">
                        {game.systemRequirements.minimum.processor}
                      </span>
                    </div>
                  </div>
                  <div className="req-item">
                    <FaMemory className="item-icon" />
                    <div className="item-details">
                      <span className="item-label">Memory:</span>
                      <span className="item-value">
                        {game.systemRequirements.minimum.memory}
                      </span>
                    </div>
                  </div>
                  <div className="req-item">
                    <FaHdd className="item-icon" />
                    <div className="item-details">
                      <span className="item-label">Storage:</span>
                      <span className="item-value">
                        {game.systemRequirements.minimum.storage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {game.systemRequirements.recommended && (
                <div className="voxeland-game-info__req-card req-card--recommended">
                  <div className="req-header">
                    <FaStar className="req-icon" />
                    <h4>Recommended</h4>
                  </div>
                  <div className="req-content">
                    <div className="req-item">
                      <FaDesktop className="item-icon" />
                      <div className="item-details">
                        <span className="item-label">Operating System:</span>
                        <span className="item-value">
                          {game.systemRequirements.recommended.os}
                        </span>
                      </div>
                    </div>
                    <div className="req-item">
                      <FaMicrochip className="item-icon" />
                      <div className="item-details">
                        <span className="item-label">Processor:</span>
                        <span className="item-value">
                          {game.systemRequirements.recommended.processor}
                        </span>
                      </div>
                    </div>
                    <div className="req-item">
                      <FaMemory className="item-icon" />
                      <div className="item-details">
                        <span className="item-label">Memory:</span>
                        <span className="item-value">
                          {game.systemRequirements.recommended.memory}
                        </span>
                      </div>
                    </div>
                    <div className="req-item">
                      <FaHdd className="item-icon" />
                      <div className="item-details">
                        <span className="item-label">Storage:</span>
                        <span className="item-value">
                          {game.systemRequirements.recommended.storage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* More Info Button */}
        <motion.div
          className="voxeland-game-info__more-info-section"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          whileInView={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
          }
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }
          }
          viewport={{ once: true }}
          data-aos="fade-up"
        >
          <motion.button
            className="voxeland-game-info__more-info-btn"
            onClick={() => navigate("gameinfo")}
          >
            <FaInfoCircle className="btn-icon" />
            <span>View Complete Information</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
