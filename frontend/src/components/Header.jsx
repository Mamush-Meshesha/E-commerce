import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "../assets/logo.png";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="position-sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <Navbar
        expand="md"
        collapseOnSelect
        className={`navbar-modern ${isScrolled ? "navbar-scrolled" : ""}`}
        style={{
          background: isScrolled
            ? "rgba(102, 126, 234, 0.95)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0,0,0,0.1)"
            : "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Container>
          <LinkContainer to="/">
            <motion.div variants={logoVariants} whileHover="hover">
              <Navbar.Brand className="d-flex align-items-center">
                <motion.img
                  src={logo}
                  alt="E-logo"
                  className="me-2"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
                <span
                  className="fw-bold text-white"
                  style={{
                    fontSize: "1.5rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Ecommerce
                </span>
              </Navbar.Brand>
            </motion.div>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SearchBox />
              </motion.div>

              <LinkContainer to="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Nav.Link className="position-relative d-flex align-items-center">
                    <FaShoppingCart className="me-2" />
                    <span>Cart</span>
                    <AnimatePresence>
                      {cartItems.length > 0 && (
                        <motion.div
                          variants={cartBadgeVariants}
                          initial="initial"
                          animate="animate"
                          whileHover="hover"
                          className="position-absolute top-0 start-100 translate-middle"
                        >
                          <Badge
                            pill
                            bg="success"
                            className="px-2 py-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                              fontSize: "0.7rem",
                              minWidth: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Nav.Link>
                </motion.div>
              </LinkContainer>

              {userInfo ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <NavDropdown
                    title={
                      <span className="d-flex align-items-center">
                        <FaUser className="me-2" />
                        {userInfo.name}
                      </span>
                    }
                    id="username"
                    className="nav-dropdown-modern"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="dropdown-item-modern">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="dropdown-item-modern"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <LinkContainer to="/login">
                    <Nav.Link className="d-flex align-items-center">
                      <FaUser className="me-2" />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                </motion.div>
              )}

              {userInfo && userInfo.isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <NavDropdown
                    title="Admin"
                    id="adminmenu"
                    className="nav-dropdown-modern"
                  >
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item className="dropdown-item-modern">
                        Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item className="dropdown-item-modern">
                        Users
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item className="dropdown-item-modern">
                        Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </motion.div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  );
};
export default Header;
