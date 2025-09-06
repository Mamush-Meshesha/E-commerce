import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Card, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaPaypal,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate("/shipping");
      }
    }, [navigate, shippingAddress]); 

    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
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
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

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
            <Card.Body className="p-4 text-center">
              <h1 className="text-white mb-0 fw-bold">
                <FaShieldAlt className="me-3" />
                Payment Method
              </h1>
              <p className="text-white-50 mb-0 mt-2">
                Choose your preferred payment method
              </p>
            </Card.Body>
          </Card>
        </motion.div>

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
                <FaCreditCard className="me-2" />
                Select Payment Method
              </h5>
            </div>

            <Card.Body className="p-4">
            <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`mb-3 payment-option ${
                          paymentMethod === "paypal" ? "selected" : ""
                        }`}
                        style={{
                          border:
                            paymentMethod === "paypal"
                              ? "2px solid #667eea"
                              : "2px solid #e9ecef",
                          borderRadius: "15px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          background:
                            paymentMethod === "paypal"
                              ? "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)"
                              : "white",
                        }}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-center">
                            <div
                              className="d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg, #0070ba 0%, #003087 100%)",
                                color: "white",
                              }}
                            >
                              <FaPaypal style={{ fontSize: "1.5rem" }} />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 fw-bold text-dark">PayPal</h6>
                              <small className="text-muted">
                                Pay with PayPal or Credit Card
                              </small>
                            </div>
                            {paymentMethod === "paypal" && (
                              <FaCheckCircle
                                className="text-success"
                                style={{ fontSize: "1.2rem" }}
                              />
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>

                  <Col md={6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`mb-3 payment-option ${
                          paymentMethod === "stripe" ? "selected" : ""
                        }`}
                        style={{
                          border:
                            paymentMethod === "stripe"
                              ? "2px solid #667eea"
                              : "2px solid #e9ecef",
                          borderRadius: "15px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          background:
                            paymentMethod === "stripe"
                              ? "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)"
                              : "white",
                        }}
                        onClick={() => setPaymentMethod("stripe")}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-center">
                            <div
                              className="d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg, #635bff 0%, #4f46e5 100%)",
                                color: "white",
                              }}
                            >
                              <FaCreditCard style={{ fontSize: "1.5rem" }} />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 fw-bold text-dark">Stripe</h6>
                              <small className="text-muted">
                                Pay with Credit/Debit Card
                              </small>
                            </div>
                            {paymentMethod === "stripe" && (
                              <FaCheckCircle
                                className="text-success"
                                style={{ fontSize: "1.2rem" }}
                              />
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                    </Col>
                </Row>

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
                      <FaShieldAlt className="me-2" />
                      Continue to Review Order
                </Button>
                  </motion.div>
                </motion.div>
            </Form>
            </Card.Body>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <Card
            style={{
              border: "1px solid #e9ecef",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
            }}
          >
            <Card.Body className="p-3">
              <div className="d-flex align-items-center">
                <FaShieldAlt className="me-2 text-success" />
                <small className="text-muted mb-0">
                  <strong>Secure Payment:</strong> Your payment information is
                  encrypted and secure. We never store your card details.
                </small>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
        </FormContainer>
    </motion.div>
  );
};

export default PaymentScreen;
