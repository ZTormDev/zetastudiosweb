import React from "react";
import { motion } from "framer-motion";
import { COMPANY_CONFIG } from "../../../core/config/company";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.footer
      className="homepage-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container">
        <div className="homepage-footer__content">
          {/* Contact */}
          <div className="homepage-footer__col">
            <h4>Get In Touch</h4>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            <a href={`mailto:${COMPANY_CONFIG.email}`} className="footer-email">
              {COMPANY_CONFIG.email}
            </a>
            <div className="homepage-footer__social footer-social">
              {COMPANY_CONFIG.socialLinks.twitter && (
                <a
                  href={COMPANY_CONFIG.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="homepage-footer__social-link"
                  aria-label="Follow us on Twitter"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {COMPANY_CONFIG.socialLinks.youtube && (
                <a
                  href={COMPANY_CONFIG.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="homepage-footer__social-link"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="homepage-footer__bottom">
          <p className="homepage-footer__copyright">
            © {currentYear} {COMPANY_CONFIG.name}. All rights reserved.
          </p>

          <div className="homepage-footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
