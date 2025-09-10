import React from "react";
import { motion } from "framer-motion";
import { getAllGames } from "../../../core/config/games";
import { GameCard } from "../../../shared/components";

export const GamesSection: React.FC = () => {
  const games = getAllGames();

  if (games.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.section
      id="games"
      className="homepage-games"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="homepage-games__header" variants={itemVariants}>
          <motion.h2 className="homepage-games__title" variants={itemVariants}>
            Our Games
          </motion.h2>
          <motion.p
            className="homepage-games__description"
            variants={itemVariants}
          >
            Discover our latest gaming experiences and join our growing
            community.
          </motion.p>
        </motion.div>

        <motion.div
          className="homepage-games__grid"
          variants={containerVariants}
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              className="homepage-games__card-container"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <GameCard game={game} className="homepage-games__card" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
