import React, { useEffect, useState } from 'react';
import './zetastudios-styles.scss';
import { Link } from 'react-router-dom';

// Define the type for a game object
interface Game {
  name: string;
  description: string;
  image: string;
  link: string;
}

const ZetaStudios: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  // Fetch games data from JSON
  useEffect(() => {
    fetch('/games.json')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error loading games:', error));
  }, []);

  return (
    <div className='zetastudios-page page'>
      <header>
        <img src="/src/assets/img/logozeta.png" alt="Your Video Game Company Logo" className="logo" />
        <p className="slogan">We make games We want to play</p>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#games">Games</a></li>
            <li><a href="/#about-us">About Us</a></li>
            <li><a href="mailto:zetastudiosgames@gmail.com">Contact</a></li>
          </ul>
        </nav>
      </header>


      <section id="games">
        <div className="games-container">
          {/* Render games dynamically */}
          {games.map((game, index) => (
            <div 
              key={index} 
              className={`game ${game.name.toLowerCase().replace(' ', '')}`} 
              style={{ backgroundImage: `url(${game.image})` }}>
              <div className="hover-desc">
                <h2>{game.name}</h2>
                <p>{game.description}</p>
                <Link to={game.link} className="view-button">
                  <p>Webpage <i className="fa-solid fa-up-right-from-square"></i></p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    

      <section className="about-us" id="about-us">
        <div className="about-title">
          <img src="/src/assets/img/logozeta.png" alt="Zeta Studios Logo" />
        </div>
        <div className="about-content">
          <p><b>ZETA STUDIOS</b> is an indie game studio originally founded by <b>ZTorm</b> from Chile.</p>
          <p>Our current members are:</p>
          <ul>
            <li>
              <p><b>ZTorm</b> is the founder of the studio. He handles game design, art, writing, coding, and takes care of the website.</p>
            </li>
          </ul>
          <p>You can contact us via email at <a href="mailto:zetastudiosgames@gmail.com">zetastudiosgames@gmail.com</a> or through Twitter at <a href="">@zetastudios</a>. We also have a <a href="">Youtube channel</a>.</p>
        </div>
        <div className="copyright-content">
          <p><b>OUR STANCE ON COPYRIGHT AND FAN WORKS</b></p>
          <p>We cherish fan expression and participation, so as a general rule, we won't take action to protect our copyright unless we really feel the need to do so.</p>
          <ul>
            <li><p>Make and monetize gameplay videos.</p></li>
            <li><p>Make and sell fan art.</p></li>
            <li><p>Make and sell covers of our game's songs.</p></li>
            <li><p>Showcase our games at public events.</p></li>
            <li><p>Add a cameo appearance of any of our game's characters inside your game.</p></li>
            <li><p>Probably any transformative work you do for free.</p></li>
          </ul>
        </div>
      </section>

      <footer>
        <p>&copy;2024 ZETA STUDIOS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ZetaStudios;
