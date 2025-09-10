import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { COMPANY_CONFIG } from "../../../core/config/company";

interface HeaderProps {
  navigation?: Array<{
    label: string;
    path: string;
  }>;
}

export const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for compact navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  return (
    <header className="homepage-header">
      {/* Fixed/overlay navbar */}
      <motion.div
        className={`homepage-header__navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <div className="homepage-header__navbar-content">
            <motion.a
              href="/"
              className="homepage-header__logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                src={COMPANY_CONFIG.logo}
                alt={`${COMPANY_CONFIG.name} Logo`}
                className="homepage-header__logo-img"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <div className="homepage-header__brand-text">
                <motion.span
                  className="homepage-header__brand-mini"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {COMPANY_CONFIG.namePart1}
                </motion.span>
                <motion.span
                  className="homepage-header__brand-mini"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {COMPANY_CONFIG.namePart2}
                </motion.span>
              </div>
            </motion.a>

            {/* Mobile menu button */}
            <button
              className={`homepage-header__mobile-toggle ${
                mobileMenuOpen ? "active" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="homepage-header-nav"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {navigation && (
              <nav
                id="homepage-header-nav"
                className={`homepage-header__nav ${
                  mobileMenuOpen ? "open" : ""
                }`}
              >
                <ul className="homepage-header__nav-list">
                  {navigation.map((item, index) => (
                    <li key={index} className="homepage-header__nav-item">
                      <a
                        href={item.path}
                        className="homepage-header__nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="homepage-header__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="container">
          <motion.div
            className="homepage-header__hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="homepage-header__hero-title-group"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.img
                src={COMPANY_CONFIG.logo}
                alt={`${COMPANY_CONFIG.name} Logo`}
                className="homepage-header__hero-logo"
                loading="eager"
                initial={{ rotate: -180, scale: 0 }}
                animate={{
                  rotate: 0,
                  scale: 1,
                }}
                transition={{
                  rotate: {
                    duration: 1,
                    delay: 1,
                    type: "spring",
                    stiffness: 100,
                  },
                  scale: {
                    duration: 1,
                    delay: 1,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
              />
              <div className="homepage-header__hero-titles">
                <motion.h1
                  className="homepage-header__hero-title"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {COMPANY_CONFIG.namePart1}
                </motion.h1>
                <motion.h1
                  className="homepage-header__hero-title"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  {COMPANY_CONFIG.namePart2}
                </motion.h1>
              </div>
            </motion.div>
            <motion.div
              className="homepage-header__hero-slogan"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.span
                className="homepage-header__hero-slogan-part"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
              >
                Built
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-part"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.0 }}
              >
                for
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-highlight"
                data-text="players"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.2, type: "spring" }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(74, 144, 226, 0.8)",
                  transition: { duration: 0.2 },
                }}
              >
                players
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-part"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                ,
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-part"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.6 }}
              >
                by
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-highlight"
                data-text="players"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.8, type: "spring" }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(74, 144, 226, 0.8)",
                  transition: { duration: 0.2 },
                }}
              >
                players
              </motion.span>
              <motion.span
                className="homepage-header__hero-slogan-part"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 3.0 }}
              >
                .
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};
