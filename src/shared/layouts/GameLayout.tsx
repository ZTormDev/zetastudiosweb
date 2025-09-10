import React from "react";
import { BaseLayout } from "./BaseLayout";
import { Game } from "../../core/types";

interface GameLayoutProps {
  children: React.ReactNode;
  game: Game;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children, game }) => {
  const themeVars = {
    "--game-primary-color": game.metadata.theme.primaryColor,
    "--game-secondary-color": game.metadata.theme.secondaryColor,
    "--game-accent-color": game.metadata.theme.accentColor,
  } as React.CSSProperties;

  return (
    <BaseLayout className={`game-layout game-layout--${game.slug}`}>
      <div className="game-layout__wrapper" style={themeVars}>
        {game.metadata.theme.backgroundPattern && (
          <div
            className="game-layout__background"
            style={{
              backgroundImage: `url(${game.metadata.theme.backgroundPattern})`,
            }}
          />
        )}
        <div className="game-layout__content">{children}</div>
      </div>
    </BaseLayout>
  );
};
