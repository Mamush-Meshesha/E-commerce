import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaSave,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";

import {
  useGetUserDetailsQuery,
  useUpdateUserMutationMutation,
} from "../../slices/userApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] =
    useUpdateUserMutationMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Card
          className="mb-4"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col>
                <h1 className="text-white mb-0 fw-bold">
                  <FaEdit className="me-3" />
                  Edit User
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Update user information and permissions
                </p>
              </Col>
              <Col className="text-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/admin/userlist"
                    className="btn btn-lg px-4 py-3 rounded-pill fw-bold"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(255,255,255,0.3)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      textDecoration: "none",
                    }}
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Users
                  </Link>
                </motion.div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message ||
            error?.message ||
            "Failed to load user details."}
        </Message>
      ) : (
        <motion.div variants={itemVariants}>
          <Card
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: "1.5rem",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <h5 className="mb-0 fw-bold text-dark">
                <FaUser className="me-2" />
                User Information
              </h5>
            </div>

            <Card.Body className="p-4">
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaUser className="me-2 text-primary" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "10px",
                            padding: "0.75rem 1rem",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.boxShadow =
                              "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e9ecef";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaEnvelope className="me-2 text-info" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "10px",
                            padding: "0.75rem 1rem",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.boxShadow =
                              "0 0 0 0.2rem rgba(102, 126, 234, 0.25)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e9ecef";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </Form.Group>
                    </motion.div>
                  </Col>
                </Row>

                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-4">
                    <Card
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "15px",
                        padding: "1.5rem",
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                      }}
                    >
                      <Row className="align-items-center">
                        <Col md={8}>
                          <div className="d-flex align-items-center">
                            {isAdmin ? (
                              <FaUserShield
                                className="me-3 text-success"
                                style={{ fontSize: "1.5rem" }}
                              />
                            ) : (
                              <FaUsers
                                className="me-3 text-secondary"
                                style={{ fontSize: "1.5rem" }}
                              />
                            )}
                            <div>
                              <h6 className="mb-1 fw-bold text-dark">
                                Administrator Privileges
                              </h6>
                              <small className="text-muted">
                                {isAdmin
                                  ? "User has admin access"
                                  : "User has standard access"}
                              </small>
                            </div>
                          </div>
                        </Col>
                        <Col md={4} className="text-end">
                          <Form.Check
                            type="switch"
                            id="admin-switch"
                            label={isAdmin ? "Admin" : "User"}
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Form.Group>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center mt-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="btn-lg px-5 py-3 rounded-pill fw-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <FaSave className="me-2" />
                      Update User
                    </Button>
                  </motion.div>
                </motion.div>
              </Form>
            </Card.Body>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserEditScreen;
