import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGameBySlug } from "../../../core/config/games";
import { COMPANY_CONFIG } from "../../../core/config/company";
import { NavigationItem } from "../../../core/types";

interface GameHeaderProps {
  gameSlug: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameSlug }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const game = getGameBySlug(gameSlug);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!game) return null;

  return (
    <header
      className={`game-header ${isScrolled ? "game-header--scrolled" : ""}`}
    >
      <div className="container">
        <div className="game-header__logos">
          <Link to="/" className="game-header__logo-link">
            <img
              src="/assets/img/logos/zetastudios.png"
              alt={`${COMPANY_CONFIG.name} Logo`}
              className="game-header__studio-logo"
            />
          </Link>
          <Link to={`/${game.slug}`} className="game-header__logo-link">
            <img
              src={game.logo || game.image}
              alt={`${game.name} Logo`}
              className="game-header__game-logo"
            />
          </Link>
        </div>

        <nav className="game-header__nav">
          {game.metadata.navigation.map(
            (navItem: NavigationItem, index: number) => {
              if (navItem.external) {
                return (
                  <a
                    key={index}
                    href={navItem.path}
                    className="game-header__nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {navItem.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                );
              }

              return navItem.path.startsWith("#") ? (
                <a
                  key={index}
                  href={navItem.path}
                  className="game-header__nav-link"
                >
                  {navItem.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={navItem.path}
                  className="game-header__nav-link"
                >
                  {navItem.label}
                </Link>
              );
            }
          )}

          {/* Social Media Dropdown */}
          <div className="game-header__social">
            <button className="game-header__social-toggle">
              <span>Social Media</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>
            <div className="game-header__social-menu">
              {COMPANY_CONFIG.socialLinks.youtube && (
                <a
                  href={COMPANY_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-header__social-link"
                >
                  YouTube
                </a>
              )}
              {COMPANY_CONFIG.socialLinks.twitter && (
                <a
                  href={COMPANY_CONFIG.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-header__social-link"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
