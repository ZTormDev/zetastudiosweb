import React from "react";
import { motion } from "framer-motion";
import { COMPANY_CONFIG } from "../../../core/config/company";

export const AboutSection: React.FC = () => {
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
      id="about-us"
      className="homepage-about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="homepage-about__content" variants={itemVariants}>
          <motion.div
            className="homepage-about__header"
            variants={itemVariants}
          >
            <motion.div
              className="homepage-about__logo"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
            >
              <img
                src={COMPANY_CONFIG.logo}
                alt={`${COMPANY_CONFIG.name} Logo`}
              />
            </motion.div>
            <motion.h2
              className="homepage-about__title"
              variants={itemVariants}
            >
              About {COMPANY_CONFIG.name}
            </motion.h2>
          </motion.div>

          <motion.div className="homepage-about__info" variants={itemVariants}>
            <motion.div
              className="homepage-about__description"
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>
                {COMPANY_CONFIG.about.description}
              </motion.p>
              <motion.p variants={itemVariants}>
                Our current members are:
              </motion.p>

              <motion.div
                className="homepage-about__team"
                variants={containerVariants}
              >
                {COMPANY_CONFIG.team.map((member, index) => (
                  <motion.div
                    key={index}
                    className="homepage-about__team-member"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.h4 variants={itemVariants}>{member.name}</motion.h4>
                    <motion.p
                      className="homepage-about__team-role"
                      variants={itemVariants}
                    >
                      {member.role}
                    </motion.p>
                    <motion.p variants={itemVariants}>{member.bio}</motion.p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="homepage-about__contact"
                variants={itemVariants}
              >
                <motion.p variants={itemVariants}>
                  You can contact us via email at{" "}
                  <a href={`mailto:${COMPANY_CONFIG.email}`}>
                    {COMPANY_CONFIG.email}
                  </a>
                  {COMPANY_CONFIG.socialLinks.twitter && (
                    <>
                      {" "}
                      or through Twitter at{" "}
                      <a
                        href={COMPANY_CONFIG.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @zetastudios
                      </a>
                    </>
                  )}
                  {COMPANY_CONFIG.socialLinks.youtube && (
                    <>
                      . We also have a{" "}
                      <a
                        href={COMPANY_CONFIG.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Youtube channel
                      </a>
                    </>
                  )}
                  .
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className="homepage-about__copyright"
              variants={itemVariants}
            >
              <motion.h3 variants={itemVariants}>
                Our Stance on Copyright and Fan Works
              </motion.h3>
              <motion.p variants={itemVariants}>
                We cherish fan expression and participation, so as a general
                rule, we won't take action to protect our copyright unless we
                really feel the need to do so.
              </motion.p>

              <motion.ul
                className="homepage-about__copyright-list"
                variants={containerVariants}
              >
                {COMPANY_CONFIG.copyright.allowedUses.map((use, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    {use}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
