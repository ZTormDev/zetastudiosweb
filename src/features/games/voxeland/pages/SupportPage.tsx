import React, { useState } from "react";
import { motion } from "framer-motion";
import { GameLayout } from "../../../../shared/layouts";
import { SEOHead, Button } from "../../../../shared/components";
import { GameHeader } from "../../components/GameHeader";
import { getGameBySlug } from "../../../../core/config/games";
import "../styles/support.scss";

export const SupportPage: React.FC = () => {
  const game = getGameBySlug("voxeland");
  const [activeTab, setActiveTab] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  if (!game) {
    return <div>Game not found</div>;
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here the form submission would be implemented
    alert("Support request submitted successfully!");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      id: 1,
      question: "What are the system requirements for Voxeland?",
      answer:
        "Voxeland requires Windows 10 64-bit, 4GB RAM minimum (8GB recommended), and a DirectX 11 compatible graphics card. See the Game Info page for detailed specifications.",
    },
    {
      id: 2,
      question: "How do I report bugs or issues?",
      answer:
        "Use the contact form below to report bugs. Please include your system specifications and steps to reproduce the issue.",
    },
    {
      id: 3,
      question: "Is there multiplayer support?",
      answer:
        "Yes! Voxeland supports both single-player and multiplayer modes with up to 32 players per server.",
    },
    {
      id: 4,
      question: "How often are updates released?",
      answer:
        "We aim to release updates monthly with new features, bug fixes, and content additions. Check our News page for the latest updates.",
    },
    {
      id: 5,
      question: "Can I mod the game?",
      answer:
        "Yes, Voxeland supports modding through our official modding API. Documentation will be available after the initial release.",
    },
    {
      id: 6,
      question: "Where can I find save files?",
      answer:
        "Save files are located in %APPDATA%\\ZetaStudios\\Voxeland\\Saves on Windows.",
    },
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of Voxeland gameplay",
      link: "#",
    },
    {
      title: "Building & Crafting",
      description: "Master the art of construction and item creation",
      link: "#",
    },
    {
      title: "Multiplayer Setup",
      description: "How to play with friends online",
      link: "#",
    },
    {
      title: "Advanced Strategies",
      description: "Tips and tricks for experienced players",
      link: "#",
    },
  ];

  return (
    <GameLayout game={game}>
      <SEOHead
        title={`${game.name} - Support & Help`}
        description={`Get help and support for ${game.name}. Find answers to common questions, report bugs, and contact our support team.`}
        keywords={[
          ...game.metadata.seo.keywords,
          "support",
          "help",
          "FAQ",
          "contact",
          "bug report",
        ]}
        ogImage={game.metadata.seo.ogImage}
      />

      <GameHeader gameSlug="voxeland" />

      <main className="voxeland-support">
        {/* Hero Section */}
        <section className="support-hero">
          <div className="container">
            <motion.div
              className="support-hero__content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="support-hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Support & Help Center
              </motion.h1>
              <motion.p
                className="support-hero__description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Need help with {game.name}? Find answers to common questions,
                get troubleshooting tips, or contact our support team.
              </motion.p>
              <motion.div
                className="support-hero__stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support Available</span>
                </div>
                <div className="stat">
                  <span className="stat-number">&lt;2h</span>
                  <span className="stat-label">Average Response</span>
                </div>
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Issues Resolved</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Support Tabs */}
        <section className="support-content">
          <div className="container">
            <motion.div
              className="support-tabs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="support-tabs__nav">
                {[
                  { id: "faq", label: "FAQ", icon: "❓" },
                  { id: "contact", label: "Contact", icon: "📧" },
                  { id: "guides", label: "Guides", icon: "📚" },
                  { id: "community", label: "Community", icon: "👥" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    className={`support-tabs__button ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="support-tabs__content">
                {/* FAQ Tab */}
                {activeTab === "faq" && (
                  <motion.div
                    className="faq-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="section-title">
                      Frequently Asked Questions
                    </h2>
                    <div className="faq-list">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          className="faq-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <h3 className="faq-question">{faq.question}</h3>
                          <p className="faq-answer">{faq.answer}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Tab */}
                {activeTab === "contact" && (
                  <motion.div
                    className="contact-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="section-title">Contact Support</h2>
                    <div className="contact-grid">
                      <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <p>
                          Our support team is here to help you with any issues
                          or questions you might have about Voxeland.
                        </p>
                        <div className="contact-methods">
                          <div className="contact-method">
                            <span className="method-icon">📧</span>
                            <div className="method-info">
                              <span className="method-label">
                                Email Support
                              </span>
                              <span className="method-value">
                                support@zetastudios.com
                              </span>
                            </div>
                          </div>
                          <div className="contact-method">
                            <span className="method-icon">💬</span>
                            <div className="method-info">
                              <span className="method-label">Live Chat</span>
                              <span className="method-value">
                                Available 24/7
                              </span>
                            </div>
                          </div>
                          <div className="contact-method">
                            <span className="method-icon">🎮</span>
                            <div className="method-info">
                              <span className="method-label">
                                Discord Server
                              </span>
                              <span className="method-value">
                                Join our community
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form
                        className="contact-form"
                        onSubmit={handleContactSubmit}
                      >
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <select
                            id="subject"
                            value={contactForm.subject}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                subject: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                            <option value="account">Account Issues</option>
                            <option value="gameplay">Gameplay Help</option>
                            <option value="technical">Technical Support</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            rows={5}
                            value={contactForm.message}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                message: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button type="submit" variant="primary" size="large">
                            Send Message
                          </Button>
                        </motion.div>
                      </form>
                    </div>
                  </motion.div>
                )}

                {/* Guides Tab */}
                {activeTab === "guides" && (
                  <motion.div
                    className="guides-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="section-title">Player Guides</h2>
                    <div className="guides-grid">
                      {guides.map((guide, index) => (
                        <motion.div
                          key={index}
                          className="guide-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="guide-title">{guide.title}</h3>
                          <p className="guide-description">
                            {guide.description}
                          </p>
                          <Button variant="secondary" size="small">
                            Read Guide
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Community Tab */}
                {activeTab === "community" && (
                  <motion.div
                    className="community-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="section-title">Join Our Community</h2>
                    <div className="community-grid">
                      <motion.div
                        className="community-card"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="community-icon">🎮</div>
                        <h3>Discord Server</h3>
                        <p>
                          Join thousands of players in our active Discord
                          community
                        </p>
                        <Button variant="primary">Join Discord</Button>
                      </motion.div>
                      <motion.div
                        className="community-card"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="community-icon">📺</div>
                        <h3>YouTube Channel</h3>
                        <p>
                          Watch tutorials, devlogs, and community highlights
                        </p>
                        <Button variant="secondary">Subscribe</Button>
                      </motion.div>
                      <motion.div
                        className="community-card"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="community-icon">📱</div>
                        <h3>Reddit Community</h3>
                        <p>
                          Share screenshots, discuss strategies, and get help
                        </p>
                        <Button variant="secondary">Visit Reddit</Button>
                      </motion.div>
                      <motion.div
                        className="community-card"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="community-icon">🐦</div>
                        <h3>Twitter</h3>
                        <p>Follow us for the latest news and updates</p>
                        <Button variant="secondary">Follow Us</Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="quick-help">
          <div className="container">
            <motion.div
              className="quick-help__content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Need Immediate Help?</h2>
              <div className="quick-help__grid">
                <motion.div
                  className="help-option"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="help-icon">⚡</div>
                  <h3>Live Chat</h3>
                  <p>Get instant help from our support team</p>
                  <Button variant="primary">Start Chat</Button>
                </motion.div>
                <motion.div
                  className="help-option"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="help-icon">📖</div>
                  <h3>Knowledge Base</h3>
                  <p>Browse our comprehensive help articles</p>
                  <Button variant="secondary">Browse Articles</Button>
                </motion.div>
                <motion.div
                  className="help-option"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="help-icon">🔧</div>
                  <h3>Troubleshooting</h3>
                  <p>Fix common issues with our troubleshooting tool</p>
                  <Button variant="secondary">Start Tool</Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </GameLayout>
  );
};
