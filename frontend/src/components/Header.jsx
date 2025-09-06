import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import {
  FaShoppingCart,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
  FaUsers,
  FaBox,
  FaClipboardList,
} from "react-icons/fa";
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
    <>
      {/* Custom CSS for mobile dropdowns only */}
      <style jsx>{`
        /* Professional mobile menu - slide from left */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            background: linear-gradient(
              135deg,
              rgba(102, 126, 234, 0.98) 0%,
              rgba(118, 75, 162, 0.98) 100%
            );
            backdrop-filter: blur(20px);
            z-index: 9999;
            padding: 2rem 0;
            box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
          }

          .navbar-collapse.show {
            transform: translateX(0);
          }

          .navbar-nav {
            flex-direction: column !important;
            align-items: stretch;
            width: 100%;
            padding: 0 1.5rem;
            text-align: left;
          }

          .nav-link {
            color: white !important;
            font-weight: 500;
            padding: 1rem 1.5rem !important;
            margin: 0.25rem 0;
            border-radius: 12px;
            transition: all 0.3s ease;
            text-decoration: none !important;
            border: none !important;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            overflow: hidden;
            font-size: 1rem;
            text-align: left;
          }

          .nav-link:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            transform: translateX(8px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }

          .nav-link:active {
            background: rgba(255, 255, 255, 0.3) !important;
            color: white !important;
          }

          .nav-link::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }

          .nav-link:hover::before {
            left: 100%;
          }

          .nav-dropdown-modern .dropdown-menu {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            padding: 0.5rem 0;
            margin: 0.5rem 0;
            position: static !important;
            width: 100%;
            animation: slideInFromLeft 0.3s ease-out;
          }

          .dropdown-item-modern {
            color: white !important;
            font-weight: 500;
            transition: all 0.3s ease;
            border-radius: 8px;
            margin: 0.25rem 0.75rem;
            padding: 0.75rem 1rem !important;
            text-decoration: none !important;
            border: none !important;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
          }

          .dropdown-item-modern:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            transform: translateX(5px);
          }

          .dropdown-item-modern:active {
            background: rgba(255, 255, 255, 0.3) !important;
            color: white !important;
          }

          .nav-dropdown-modern .dropdown-toggle::after {
            margin-left: auto;
            transition: transform 0.3s ease;
            order: 2;
          }

          .nav-dropdown-modern .dropdown-toggle[aria-expanded="true"]::after {
            transform: rotate(180deg);
          }

          /* Overlay for mobile menu */
          .navbar-collapse::before {
            content: "";
            position: fixed;
            top: 0;
            left: 280px;
            width: calc(100vw - 280px);
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }
        }
      `}</style>

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
            minHeight: "70px",
          }}
        >
          <Container className="">
            {/* Brand Section */}
            <LinkContainer to="/">
              <motion.div variants={logoVariants} whileHover="hover">
                <Navbar.Brand className="d-flex align-items-center">
                  <motion.img
                    src={logo}
                    alt="E-logo"
                    className="me-2"
                    style={{
                      height: "clamp(32px, 5vw, 40px)",
                      width: "clamp(32px, 5vw, 40px)",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  />
                  <span
                    className="fw-bold text-white d-none d-sm-inline"
                    style={{
                      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    Ecommerce
                  </span>
                  <span
                    className="fw-bold text-white d-sm-none"
                    style={{
                      fontSize: "1.1rem",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    E
                  </span>
                </Navbar.Brand>
              </motion.div>
            </LinkContainer>

            {/* Mobile Toggle Button */}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="border-0 p-2"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                minWidth: "44px",
                minHeight: "44px",
              }}
            />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex gap-3">
                {/* Search Box */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="me-3"
                >
                  <SearchBox />
                </motion.div>

                {/* Cart */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/cart")}
                  style={{ cursor: "pointer" }}
                >
                  <Nav.Link className="position-relative">
                    <FaShoppingCart className="me-2" />
                    Cart
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

                {/* User Menu */}
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
                          <FaUserCircle className="me-2" />
                          Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                        onClick={logoutHandler}
                        className="dropdown-item-modern"
                      >
                        <FaSignOutAlt className="me-2" />
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

                {/* Admin Menu */}
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
                          <FaBox className="me-2" />
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item className="dropdown-item-modern">
                          <FaUsers className="me-2" />
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item className="dropdown-item-modern">
                          <FaClipboardList className="me-2" />
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
    </>
  );
};
export default Header;
