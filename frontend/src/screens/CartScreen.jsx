import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
  Badge,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import { addToCart, removeFromCard } from "../slices/cartSlice";
const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeFromCardHandler = async (id) => {
    dispatch(removeFromCard(id));
  };

  const checkOutHnadler = () => {
    navigate("/login?redirect=/shipping");
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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Container fluid className="px-3 px-md-4">
        <motion.div variants={itemVariants} className="mb-4">
          <Link
            to="/"
            className="btn btn-light d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              fontWeight: "600",
            }}
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

          <div className="d-flex align-items-center gap-3 mb-4">
            <h1
              className="mb-0 fw-bold"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Shopping Cart
            </h1>
            <Badge
              bg="primary"
              className="px-3 py-2"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "1rem",
              }}
            >
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Badge>
          </div>
        </motion.div>

        <Row className="g-4">
          <Col xs={12} lg={8}>
            {cartItems.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm text-center py-5">
                  <Card.Body>
                    <FaShoppingCart
                      className="text-muted mb-3"
                      style={{ fontSize: "4rem" }}
                    />
                    <h3 className="text-muted mb-3">Your cart is empty</h3>
                    <p className="text-muted mb-4">
                      Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link
                      to="/"
                      className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                      }}
                    >
                      Start Shopping
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm">
                  <Card.Header
                    className="bg-transparent border-0 py-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                    }}
                  >
                    <h4 className="mb-0 fw-bold">Cart Items</h4>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="border-bottom p-4"
                      >
                        <Row className="align-items-center g-3">
                          {/* Product Image */}
                          <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="position-relative">
                              <Image
                                src={
                                  item.image ||
                                  "https://picsum.photos/200/200?random=50"
                                }
                                alt={item.name}
                                fluid
                                className="rounded-3"
                                style={{
                                  aspectRatio: "1/1",
                                  objectFit: "cover",
                                  maxHeight: "120px",
                                }}
                                onError={(e) => {
                                  e.target.src =
                                    "https://picsum.photos/200/200?random=50";
                                }}
                              />
                            </div>
                          </Col>

                          {/* Product Details */}
                          <Col xs={12} sm={6} md={8} lg={9}>
                            <Row className="align-items-center g-3">
                              <Col xs={12} md={6}>
                                <Link
                                  to={`/product/${item._id}`}
                                  className="text-decoration-none"
                                >
                                  <h5
                                    className="mb-2 fw-bold text-dark"
                                    style={{
                                      fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                                    }}
                                  >
                                    {item.name}
                                  </h5>
                                </Link>
                                <p className="text-muted mb-0 small">
                                  ${item.price} each
                                </p>
                              </Col>

                              {/* Quantity Controls */}
                              <Col xs={6} md={3}>
                                <div className="d-flex align-items-center gap-2">
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    onClick={() =>
                                      addToCartHandler(
                                        item,
                                        Math.max(1, item.qty - 1)
                                      )
                                    }
                                    disabled={item.qty <= 1}
                                  >
                                    <FaMinus />
                                  </Button>
                                  <Form.Control
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) =>
                                      addToCartHandler(
                                        item,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="text-center"
                                    style={{ maxWidth: "80px" }}
                                  >
                                    {[...Array(item.countInStock).keys()].map(
                                      (x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      )
                                    )}
                                  </Form.Control>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    onClick={() =>
                                      addToCartHandler(
                                        item,
                                        Math.min(
                                          item.countInStock,
                                          item.qty + 1
                                        )
                                      )
                                    }
                                    disabled={item.qty >= item.countInStock}
                                  >
                                    <FaPlus />
                                  </Button>
                                </div>
                              </Col>

                              {/* Price and Actions */}
                              <Col xs={6} md={3}>
                                <div className="text-end">
                                  <h5 className="text-primary fw-bold mb-2">
                                    ${(item.qty * item.price).toFixed(2)}
                                  </h5>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() =>
                                      removeFromCardHandler(item._id)
                                    }
                                    className="rounded-pill px-3"
                                  >
                                    <FaTrash className="me-1" />
                                    Remove
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </motion.div>
                    ))}
                  </Card.Body>
                </Card>
              </motion.div>
            )}
          </Col>

          {/* Order Summary */}
          <Col xs={12} lg={4}>
            <motion.div
              variants={itemVariants}
              className="sticky-top"
              style={{ top: "20px" }}
            >
              <Card className="border-0 shadow-sm">
                <Card.Header
                  className="bg-transparent border-0 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <h4 className="mb-0 fw-bold">Order Summary</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-semibold">Items ({totalItems}):</span>
                    <span className="fw-bold">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-semibold">Shipping:</span>
                    <span className="fw-bold text-success">Free</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                    <span className="fw-semibold">Tax:</span>
                    <span className="fw-bold">
                      ${(subtotal * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 fw-bold">Total:</h4>
                    <h4 className="mb-0 text-primary fw-bold">
                      ${(subtotal * 1.1).toFixed(2)}
                    </h4>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      className="w-100 py-3 rounded-pill fw-bold"
                      disabled={cartItems.length === 0}
                      onClick={checkOutHnadler}
                      style={{
                        background:
                          cartItems.length === 0
                            ? "linear-gradient(135deg, #6c757d 0%, #495057 100%)"
                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      <FaShoppingCart className="me-2" />
                      Proceed to Checkout
                    </Button>
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

export default CartScreen;
