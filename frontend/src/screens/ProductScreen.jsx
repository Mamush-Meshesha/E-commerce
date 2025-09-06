import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaStar,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import Rating from "../components/Rating";
import Meta from "../components/Meta";
import Message from "../components/message";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Container fluid className="px-3 px-md-4">
        <motion.div variants={itemVariants} className="mb-4">
          <Link
            to="/"
            className="btn btn-light d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              fontWeight: "600",
            }}
          >
            <FaArrowLeft />
            Go Back
          </Link>
        </motion.div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta title={product.name} />

            {/* Product Details Section */}
            <motion.div variants={itemVariants}>
              <Row className="g-4">
                {/* Product Image */}
                <Col xs={12} lg={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <div
                      className="position-relative overflow-hidden"
                      style={{ aspectRatio: "1/1" }}
                    >
                      <Image
                        src={
                          product.image ||
                          "https://picsum.photos/600/600?random=50"
                        }
                        alt={product.name}
                        fluid
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src =
                            "https://picsum.photos/600/600?random=50";
                        }}
                      />
                      {/* Action Buttons Overlay */}
                      <div className="position-absolute top-0 end-0 p-3">
                        <div className="d-flex flex-column gap-2">
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                          >
                            <FaHeart />
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                          >
                            <FaShare />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                {/* Product Info */}
                <Col xs={12} lg={6}>
                  <div className="h-100 d-flex flex-column">
                    <motion.div variants={itemVariants}>
                      <h1
                        className="mb-3 fw-bold"
                        style={{
                          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {product.name}
                      </h1>

                      <div className="mb-3">
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      </div>

                      <div className="mb-4">
                        <h2
                          className="text-primary fw-bold mb-0"
                          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                        >
                          ${product.price}
                        </h2>
                      </div>

                      <div className="mb-4">
                        <p
                          className="text-muted lh-lg"
                          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
                        >
                          {product.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Purchase Card */}
                    <motion.div variants={itemVariants} className="mt-auto">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-semibold">Status:</span>
                            <span
                              className={`badge ${
                                product.countInStock > 0
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                              style={{
                                background:
                                  product.countInStock > 0
                                    ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
                                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                              }}
                            >
                              {product.countInStock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </div>

                          {product.countInStock > 0 && (
                            <div className="mb-4">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-semibold">Quantity:</span>
                                <Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) =>
                                    setQty(Number(e.target.value))
                                  }
                                  style={{ maxWidth: "100px" }}
                                >
                                  {Array.from(
                                    { length: product.countInStock },
                                    (_, index) => (
                                      <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          )}

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              className="w-100 py-3 rounded-pill fw-bold"
                              type="button"
                              disabled={product.countInStock === 0}
                              onClick={addToCartHandler}
                              style={{
                                background:
                                  product.countInStock === 0
                                    ? "linear-gradient(135deg, #6c757d 0%, #495057 100%)"
                                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                border: "none",
                                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                              }}
                            >
                              <FaShoppingCart className="me-2" />
                              {product.countInStock === 0
                                ? "Out of Stock"
                                : "Add To Cart"}
                            </Button>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </div>
                </Col>
              </Row>
            </motion.div>

            {/* Reviews Section */}
            <motion.div variants={itemVariants} className="mt-5">
              <Row>
                <Col xs={12} lg={8}>
                  <Card className="border-0 shadow-sm">
                    <Card.Header
                      className="bg-transparent border-0 py-4"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      }}
                    >
                      <h2 className="mb-0 fw-bold d-flex align-items-center gap-2">
                        <FaStar className="text-warning" />
                        Reviews
                      </h2>
                    </Card.Header>
                    <Card.Body className="p-4">
                      {product.reviews.length === 0 ? (
                        <Message>No Reviews</Message>
                      ) : (
                        <div className="space-y-3">
                          {product.reviews.map((review) => (
                            <div
                              key={review._id}
                              className="border-bottom pb-3 mb-3"
                            >
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <strong className="fw-semibold">
                                  {review.name}
                                </strong>
                                <small className="text-muted">
                                  {review.createdAt.substring(0, 10)}
                                </small>
                              </div>
                              <Rating value={review.rating} />
                              <p className="mt-2 mb-0">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Write Review Form */}
                      <div className="mt-4 pt-4 border-top">
                        <h3 className="mb-4 fw-bold">Write a Review</h3>
                        {loadingProductReview && <Loader />}

                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Row>
                              <Col xs={12} md={6}>
                                <Form.Group controlId="rating" className="mb-3">
                                  <Form.Label className="fw-semibold">
                                    Rating
                                  </Form.Label>
                                  <Form.Control
                                    as="select"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="rounded-pill"
                                  >
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                  </Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="mb-4" controlId="comment">
                              <Form.Label className="fw-semibold">
                                Comment
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows="4"
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="rounded-3"
                                placeholder="Share your thoughts about this product..."
                              />
                            </Form.Group>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                disabled={loadingProductReview}
                                type="submit"
                                className="px-4 py-2 rounded-pill fw-bold"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  border: "none",
                                }}
                              >
                                Submit Review
                              </Button>
                            </motion.div>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to="/login">Login</Link> to Write a
                            review
                          </Message>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </motion.div>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default ProductScreen;
