import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "white",
        marginTop: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.03"/><circle cx="10" cy="50" r="0.5" fill="%23ffffff" opacity="0.03"/><circle cx="90" cy="50" r="0.5" fill="%23ffffff" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
          opacity: 0.3,
        }}
      />

      <Container fluid className="position-relative px-3 px-md-4">
        {/* Main Footer Content */}
        <Row className="py-4 py-md-5 footer-mobile-optimized footer-tablet-optimized">
          {/* Company Info - Full width on mobile, 1/2 on tablet, 1/3 on desktop */}
          <Col xs={12} md={6} lg={4} className="mb-4 mb-md-5">
            <motion.div variants={itemVariants}>
              <div className="d-flex align-items-center mb-3">
                <FaShoppingCart
                  className="me-2"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    color: "#667eea",
                    filter: "drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))",
                  }}
                />
                <h4
                  className="mb-0 fw-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  }}
                >
                  E-Commerce
                </h4>
              </div>
              <p
                className="text-light mb-4"
                style={{
                  lineHeight: "1.6",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                }}
              >
                Your one-stop destination for quality products at unbeatable
                prices. We're committed to providing exceptional shopping
                experiences with fast delivery and excellent customer service.
              </p>
              <div className="d-flex gap-2 gap-md-3 flex-wrap">
                {[
                  { icon: FaFacebook, color: "#3b5998", href: "#" },
                  { icon: FaTwitter, color: "#1da1f2", href: "#" },
                  { icon: FaInstagram, color: "#e1306c", href: "#" },
                  { icon: FaLinkedin, color: "#0077b5", href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "clamp(36px, 8vw, 40px)",
                      height: "clamp(36px, 8vw, 40px)",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      minWidth: "44px",
                      minHeight: "44px",
                    }}
                    whileHover={{
                      scale: 1.1,
                      background: social.color,
                      boxShadow: `0 0 20px ${social.color}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon
                      style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Quick Links - 1/2 width on mobile, 1/2 on tablet, 1/4 on desktop */}
          <Col xs={6} sm={6} md={6} lg={3} className="mb-4 mb-md-5">
            <motion.div variants={itemVariants}>
              <h5
                className="fw-bold mb-3"
                style={{
                  color: "#667eea",
                  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                }}
              >
                Quick Links
              </h5>
              <ul className="list-unstyled">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                ].map((link, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={link.href}
                      className="text-light text-decoration-none d-block py-1"
                      style={{
                        transition: "all 0.3s ease",
                        fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#667eea";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#bdc3c7";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Contact Info - 1/2 width on mobile, 1/2 on tablet, 1/2 on desktop */}
          <Col xs={6} sm={6} md={6} lg={5} className="mb-4">
            <motion.div variants={itemVariants}>
              <h5
                className="fw-bold mb-3"
                style={{
                  color: "#667eea",
                  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                }}
              >
                Contact Info
              </h5>
              <div className="space-y-3">
                <div className="d-flex align-items-center mb-3 contact-item">
                  <div
                    className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{
                      width: "clamp(36px, 8vw, 40px)",
                      height: "clamp(36px, 8vw, 40px)",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      minWidth: "44px",
                      minHeight: "44px",
                    }}
                  >
                    <FaEnvelope
                      style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 text-light small">Email</p>
                    <a
                      href="mailto:info@ecommerce.com"
                      className="text-decoration-none d-block"
                      style={{
                        color: "#667eea",
                        fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                        wordBreak: "break-all",
                      }}
                    >
                      mam@ecommerce.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{
                      width: "clamp(36px, 8vw, 40px)",
                      height: "clamp(36px, 8vw, 40px)",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      minWidth: "44px",
                      minHeight: "44px",
                    }}
                  >
                    <FaPhone style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 text-light small">Phone</p>
                    <a
                      href="tel:+251938301620"
                      className="text-decoration-none d-block"
                      style={{
                        color: "#667eea",
                        fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                      }}
                    >
                      (+251) 938301620
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{
                      width: "clamp(36px, 8vw, 40px)",
                      height: "clamp(36px, 8vw, 40px)",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      minWidth: "44px",
                      minHeight: "44px",
                    }}
                  >
                    <FaMapMarkerAlt
                      style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 text-light small">Address</p>
                    <p
                      className="mb-0 text-light small"
                      style={{ fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)" }}
                    >
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-top border-secondary py-4"
          style={{ borderColor: "rgba(255,255,255,0.1) !important" }}
        >
          <Row className="align-items-center">
            <Col
              xs={12}
              md={6}
              className="text-center text-md-start mb-3 mb-md-0"
            >
              <p
                className="mb-0 text-light"
                style={{ fontSize: "clamp(0.8rem, 2vw, 0.9rem)" }}
              >
                © {currentYear} E-Commerce. All rights reserved. Made with{" "}
                <FaHeart
                  className="text-danger"
                  style={{
                    animation: "heartbeat 1.5s ease-in-out infinite",
                    fontSize: "clamp(0.8rem, 2vw, 1rem)",
                  }}
                />{" "}
                by Mamush
              </p>
            </Col>
            <Col xs={12} md={6} className="text-center text-md-end">
              <motion.button
                onClick={scrollToTop}
                className="btn btn-outline-light btn-sm rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                  minHeight: "44px",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowUp />
                <span className="d-none d-sm-inline">Back to Top</span>
                <span className="d-sm-none">Top</span>
              </motion.button>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* CSS Animations and Mobile Optimizations */}
      <style jsx>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }

        /* Mobile Footer Optimizations */
        @media (max-width: 575.98px) {
          .footer-mobile-optimized {
            padding: 1.5rem 0 !important;
          }
          
          .footer-mobile-optimized .col-6 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          .footer-mobile-optimized .col-6:first-child {
            padding-left: 0;
            padding-right: 0.25rem;
          }
          
          .footer-mobile-optimized .col-6:last-child {
            padding-right: 0;
            padding-left: 0.25rem;
          }
          
          .footer-mobile-optimized h5 {
            font-size: 0.9rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .footer-mobile-optimized ul li {
            margin-bottom: 0.25rem !important;
          }
          
          .footer-mobile-optimized ul li a {
            font-size: 0.75rem !important;
            min-height: 32px !important;
            padding: 0.2rem 0 !important;
          }
          
          /* Contact info mobile optimization */
          .footer-mobile-optimized .contact-item {
            margin-bottom: 0.5rem !important;
          }
          
          .footer-mobile-optimized .contact-item .d-flex {
            align-items: flex-start !important;
          }
          
          .footer-mobile-optimized .contact-item .d-flex > div:first-child {
            width: 28px !important;
            height: 28px !important;
            min-width: 28px !important;
            min-height: 28px !important;
            margin-right: 0.5rem !important;
          }
          
          .footer-mobile-optimized .contact-item .d-flex > div:first-child svg {
            font-size: 0.7rem !important;
          }
          
          .footer-mobile-optimized .contact-item .flex-grow-1 p {
            font-size: 0.7rem !important;
            margin-bottom: 0.1rem !important;
          }
          
          .footer-mobile-optimized .contact-item .flex-grow-1 a {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
          }
        }

        /* Tablet Footer Optimizations */
        @media (min-width: 576px) and (max-width: 991.98px) {
          .footer-tablet-optimized {
            padding: 2rem 0 !important;
          }
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
