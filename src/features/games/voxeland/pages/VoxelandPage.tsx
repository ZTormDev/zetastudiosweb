import React from "react";
import { GameLayout } from "../../../../shared/layouts";
import { SEOHead } from "../../../../shared/components";
import { GameHeader } from "../../components/GameHeader";
import { getGameBySlug } from "../../../../core/config/games";
import { getVoxelandBlogPosts } from "../config/blog-data";
import {
  VoxelandGameInfo,
  VoxelandHero,
  VoxelandLatestNews,
} from "../components";

export const VoxelandPage: React.FC = () => {
  const game = getGameBySlug("voxeland");
  const latestBlogs = getVoxelandBlogPosts(3);

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <GameLayout game={game}>
      <SEOHead
        title={game.metadata.seo.title}
        description={game.metadata.seo.description}
        keywords={game.metadata.seo.keywords}
        ogImage={game.metadata.seo.ogImage}
      />

      <GameHeader gameSlug="voxeland" />

      <main className="voxeland-page__main">
        {/* Hero Section */}
        <VoxelandHero game={game} />

        {/* Game Info Section */}
        <VoxelandGameInfo game={game} />

        {/* Latest News */}
        <VoxelandLatestNews posts={latestBlogs} />
      </main>
    </GameLayout>
  );
};

export default VoxelandPage;
