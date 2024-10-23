import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Función para manejar el scroll
  const handleScroll = () => {
    if (window.scrollY > 75) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Añadir el event listener para el scroll al montar el componente
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logos-container">
          <div className="logo-container">
            <Link to="/">
              <img
                src="/assets/img/logoSmallZETASTUDIOS.svg"
                alt="Zeta Studios Logo"
                className="logo zetastudios-logo"
              />
            </Link>
          </div>
          <div className="logo-container">
            <Link to="/voxeland">
              <img
                src="/assets/img/voxeland/VOXELANDLOGO.png"
                alt="Voxeland Logo"
                className="logo voxeland-logo"
              />
            </Link>
          </div>
        </div>
        <nav>
          <Link to="/voxeland/gameinfo" className="nav-link">
            GAME INFO
          </Link>
          <Link to="/voxeland/news" className="nav-link">
            NEWS
          </Link>
          <div className="social-media-container">
            <p className="nav-link">
              SOCIAL MEDIA <ShareRoundedIcon />
            </p>
            <div className="social-media-menu">
              <a
                href="https://www.youtube.com/@zetastudiosdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube <OpenInNewRoundedIcon />
              </a>
              <a
                href="https://x.com/zetastudios_dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter <OpenInNewRoundedIcon />
              </a>
              <a
                href="https://www.instagram.com/zeta.studios.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <OpenInNewRoundedIcon />
              </a>
              <a
                href="https://www.tiktok.com/@zeta.studios.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok <OpenInNewRoundedIcon />
              </a>
            </div>
          </div>
          <Link to="/voxeland/support" className="nav-link">
            SUPPORT
          </Link>
          <a href="/voxeland#download" className="nav-link">
            DOWNLOAD
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
