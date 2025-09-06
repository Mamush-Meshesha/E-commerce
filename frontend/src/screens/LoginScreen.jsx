import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 0",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                <Card.Header
                  className="text-center py-4 border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <h1
                    className="mb-0 fw-bold"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Welcome Back
                  </h1>
                  <p className="text-muted mt-2 mb-0">
                    Sign in to your account
                  </p>
                </Card.Header>

                <Card.Body className="p-4 p-md-5">
                  <Form onSubmit={submitHandler}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="mb-4" controlId="email">
                        <Form.Label className="fw-semibold mb-2">
                          Email Address
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-pill ps-5"
                            style={{
                              border: "2px solid #e9ecef",
                              fontSize: "1rem",
                              padding: "0.75rem 1rem 0.75rem 3rem",
                            }}
                            required
                          />
                          <FaUser
                            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                            style={{ zIndex: 10 }}
                          />
                        </div>
                      </Form.Group>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Form.Group className="mb-4" controlId="password">
                        <Form.Label className="fw-semibold mb-2">
                          Password
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-pill ps-5 pe-5"
                            style={{
                              border: "2px solid #e9ecef",
                              fontSize: "1rem",
                              padding: "0.75rem 1rem 0.75rem 3rem",
                            }}
                            required
                          />
                          <FaLock
                            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                            style={{ zIndex: 10 }}
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y p-0 me-3"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 10, color: "#6c757d" }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                      </Form.Group>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          disabled={isLoading}
                          type="submit"
                          className="w-100 py-3 rounded-pill fw-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            fontSize: "1.1rem",
                          }}
                        >
                          {isLoading ? (
                            <>
                              <Loader />
                              <span className="ms-2">Signing In...</span>
                            </>
                          ) : (
                            <>
                              Sign In
                              <FaArrowRight className="ms-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </Form>

                  <motion.div
                    variants={itemVariants}
                    className="text-center mt-4"
                  >
                    <p className="text-muted mb-0">
                      New Customer?{" "}
                      <Link
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : "/register"
                        }
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#667eea" }}
                      >
                        Create an account
                      </Link>
                    </p>
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default LoginScreen;
