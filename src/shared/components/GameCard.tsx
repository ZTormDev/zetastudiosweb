import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../../core/types";

interface GameCardProps {
  game: Game;
  showDescription?: boolean;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  showDescription = true,
  className = "",
}) => {
  return (
    <div
      className={`game-card ${className}`}
      style={{ backgroundImage: `url(${game.image})` }}
    >
      <div className="game-card__overlay">
        <div className="game-card__content">
          <h2 className="game-card__title">{game.name}</h2>
          {showDescription && (
            <p className="game-card__description">{game.shortDescription}</p>
          )}
          <div className="game-card__actions">
            <Link to={`/${game.slug}`} className="game-card__link">
              <span>Visit Page</span>
              <svg
                width="20"
                height="20"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
