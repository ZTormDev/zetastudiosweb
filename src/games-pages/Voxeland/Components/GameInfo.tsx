import React from "react";
import "../voxeland-styles.scss";

const GameInfo: React.FC = () => {
  return (
    <section className="game-info">
      <h2 className="section-title">What is Voxeland?</h2>
      <p>
        Voxeland is an Open World Survival RPG based on Voxels, with Procedural
        World Generation (Terrain, Structures, NPCs, etc.). You can also play
        with friends to share unique experiences! Fight against monsters, engage
        in epic Boss Battles, and More!
      </p>

      <div className="game-trailer">
        <iframe
          src="https://www.youtube.com/embed/xXyBVbryR9M?si=szIOQ2PvQ4-G6kn4"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default GameInfo;
