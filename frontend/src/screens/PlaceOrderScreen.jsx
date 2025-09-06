import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCreditCard, FaPaypal, FaShieldAlt, FaSpinner } from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";
import StripePayment from "../components/StripePayment";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  useCreateOrderMutation,
  usePayOrderMutation,
} from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Message from "../components/message";
const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeholderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleStripeSuccess = async (paymentIntent) => {
    setIsProcessingPayment(true);
    try {
      // First create the order
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: "stripe",
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        stripePaymentIntentId: paymentIntent.id,
      }).unwrap();

      // Then update the order to paid status using the same API as PayPal
      await payOrder({
        orderId: res._id,
        details: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: cart.shippingAddress.email || "customer@example.com",
        },
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
      toast.success("Payment successful!");
    } catch (err) {
      console.error("Stripe payment error:", err);
      toast.error(
        "Payment successful but order update failed. Please contact support."
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleStripeError = (error) => {
    toast.error(error);
    setIsProcessingPayment(false);
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
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <motion.div variants={itemVariants}>
            <Card
              className="mb-4"
              style={{
                border: "none",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "1.5rem",
                  color: "white",
                }}
              >
                <h2 className="mb-0 fw-bold">
                  <FaShieldAlt className="me-3" />
                  Order Review
                </h2>
                <p className="mb-0 mt-2 text-white-50">
                  Review your order details before payment
                </p>
              </div>

              <Card.Body className="p-4">
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0 pb-4">
                    <h5 className="fw-bold text-dark mb-3">
                      <FaShieldAlt className="me-2 text-primary" />
                      Shipping Address
                    </h5>
                    <div
                      className="p-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="mb-0">
                        <strong>Address:</strong> {cart.shippingAddress.address}
                        , {cart.shippingAddress.city},{" "}
                        {cart.shippingAddress.postalCode},{" "}
                        {cart.shippingAddress.country}
                      </p>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0 pb-4">
                    <h5 className="fw-bold text-dark mb-3">
                      {cart.paymentMethod === "stripe" ? (
                        <FaCreditCard className="me-2 text-primary" />
                      ) : (
                        <FaPaypal className="me-2 text-primary" />
                      )}
                      Payment Method
                    </h5>
                    <div
                      className="p-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="mb-0">
                        <strong>Method:</strong>{" "}
                        {cart.paymentMethod === "stripe"
                          ? "Stripe (Credit/Debit Card)"
                          : "PayPal"}
                      </p>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="fw-bold text-dark mb-3">Order Items</h5>
                    {cart.cartItems.length === 0 ? (
                      <Message>Your cart is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {cart.cartItems.map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            className="border-0 mb-3"
                            style={{
                              background:
                                "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                              borderRadius: "10px",
                              border: "1px solid #e9ecef",
                            }}
                          >
                            <Row className="align-items-center">
                              <Col md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                  style={{
                                    maxHeight: "80px",
                                    objectFit: "cover",
                                  }}
                                />
                              </Col>
                              <Col md={6}>
                                <Link
                                  to={`/product/${item.product}`}
                                  className="text-decoration-none"
                                >
                                  <h6 className="mb-1 fw-bold text-dark">
                                    {item.name}
                                  </h6>
                                </Link>
                                <small className="text-muted">
                                  Qty: {item.qty}
                                </small>
                              </Col>
                              <Col md={4} className="text-end">
                                <h6 className="mb-0 fw-bold text-primary">
                                  ${(item.qty * item.price).toFixed(2)}
                                </h6>
                                <small className="text-muted">
                                  ${item.price} each
                                </small>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={4}>
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
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "1.5rem",
                  color: "white",
                }}
              >
                <h4 className="mb-0 fw-bold">Order Summary</h4>
              </div>

              <Card.Body className="p-4">
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                    <span>Items:</span>
                    <span className="fw-bold">${cart.itemsPrice}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                    <span>Shipping:</span>
                    <span className="fw-bold">${cart.shippingPrice}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                    <span>Tax:</span>
                    <span className="fw-bold">${cart.taxPrice}</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="border-0 d-flex justify-content-between py-3"
                    style={{
                      borderTop: "2px solid #e9ecef !important",
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "10px",
                      margin: "1rem 0",
                    }}
                  >
                    <span className="fw-bold fs-5">Total:</span>
                    <span className="fw-bold fs-5 text-primary">
                      ${cart.totalPrice}
                    </span>
                  </ListGroup.Item>

                  {error && (
                    <ListGroup.Item className="border-0">
                      <Message variant="danger">{error.data.message}</Message>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="border-0">
                    {cart.paymentMethod === "stripe" ? (
                      <StripePayment
                        amount={parseFloat(cart.totalPrice)}
                        onSuccess={handleStripeSuccess}
                        onError={handleStripeError}
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          className="w-100 py-3 rounded-pill fw-bold"
                          disabled={
                            cart.cartItems.length === 0 ||
                            isLoading ||
                            isProcessingPayment
                          }
                          onClick={placeholderHandler}
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                          }}
                        >
                          {isLoading || isProcessingPayment ? (
                            <>
                              <FaSpinner
                                className="me-2"
                                style={{ animation: "spin 1s linear infinite" }}
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              <FaPaypal className="me-2" />
                              Place Order with PayPal
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PlaceOrderScreen;
