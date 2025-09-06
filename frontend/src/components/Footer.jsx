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

      <Container className="position-relative">
        {/* Main Footer Content */}
        <Row className="py-5">
          <Col lg={4} md={6} className="mb-4">
            <motion.div variants={itemVariants}>
              <div className="d-flex align-items-center mb-3">
                <FaShoppingCart
                  className="me-2"
                  style={{
                    fontSize: "2rem",
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
                  }}
                >
                  E-Commerce
                </h4>
              </div>
              <p className="text-light mb-4" style={{ lineHeight: "1.6" }}>
                Your one-stop destination for quality products at unbeatable
                prices. We're committed to providing exceptional shopping
                experiences with fast delivery and excellent customer service.
              </p>
              <div className="d-flex gap-3">
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
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      background: social.color,
                      boxShadow: `0 0 20px ${social.color}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <motion.div variants={itemVariants}>
              <h5 className="fw-bold mb-3" style={{ color: "#667eea" }}>
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
                      className="text-light text-decoration-none"
                      style={{
                        transition: "all 0.3s ease",
                        display: "inline-block",
                        padding: "0.25rem 0",
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

          <Col lg={2} md={6} className="mb-4">
            <motion.div variants={itemVariants}>
              <h5 className="fw-bold mb-3" style={{ color: "#667eea" }}>
                Categories
              </h5>
              <ul className="list-unstyled">
                {[
                  "Electronics",
                  "Clothing",
                  "Home & Garden",
                  "Sports",
                  "Books",
                  "Beauty",
                ].map((category, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href="#"
                      className="text-light text-decoration-none"
                      style={{
                        transition: "all 0.3s ease",
                        display: "inline-block",
                        padding: "0.25rem 0",
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
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <motion.div variants={itemVariants}>
              <h5 className="fw-bold mb-3" style={{ color: "#667eea" }}>
                Contact Info
              </h5>
              <div className="space-y-3">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                  >
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="mb-0 text-light">Email</p>
                    <a
                      href="mailto:info@ecommerce.com"
                      className="text-decoration-none"
                      style={{ color: "#667eea" }}
                    >
                      mam@ecommerce.com
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                  >
                    <FaPhone />
                  </div>
                  <div>
                    <p className="mb-0 text-light">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-decoration-none"
                      style={{ color: "#667eea" }}
                    >
                      (+251) 938301620
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                  >
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="mb-0 text-light">Address</p>
                    <span className="text-light">
                      Addis Ababa,
                      <br />
                      Ethiopia
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1.5rem 0",
          }}
        >
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0 text-light">
                &copy; {currentYear} E-Commerce. All rights reserved. Made by
                Mamush
                <FaHeart
                  className="text-danger"
                  style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
                />{" "}
                for our customers.
              </p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-md-end gap-3">
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ fontSize: "0.9rem" }}
                >
                  Privacy Policy
                </a>
                <span className="text-light">|</span>
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ fontSize: "0.9rem" }}
                >
                  Terms of Service
                </a>
                <span className="text-light">|</span>
                <a
                  href="#"
                  className="text-light text-decoration-none"
                  style={{ fontSize: "0.9rem" }}
                >
                  Cookie Policy
                </a>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="position-fixed"
        style={{
          bottom: "2rem",
          right: "2rem",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          color: "white",
          fontSize: "1.2rem",
          boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
          zIndex: 1000,
          cursor: "pointer",
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FaArrowUp />
      </motion.button>

      {/* Add CSS for heartbeat animation */}
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
      `}</style>
    </motion.footer>
  );
};

export default Footer;
