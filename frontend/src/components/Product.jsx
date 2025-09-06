import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import Rating from "./Rating";

const Product = ({ product, index = 0 }) => {
  // Safety check for product data
  if (!product || typeof product !== "object") {
    return null;
  }
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="product-card-wrapper"
    >
      <Card
        className="my-3 p-3 rounded h-100 position-relative overflow-hidden"
        style={{ height: "450px", background: "white" }}
      >
        {/* Product Image Container */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "220px", borderRadius: "8px" }}
        >
          <Link to={`/product/${product._id}`}>
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className="h-100"
            >
              <Card.Img
                src={product.image || "https://picsum.photos/400/300?random=50"}
                variant="top"
                className="w-100 h-100 object-cover"
                style={{
                  height: "220px",
                  objectFit: "cover",
                  transition: "all 0.3s ease",
                }}
                onError={(e) => {
                  e.target.src = "https://picsum.photos/400/300?random=50";
                }}
              />
            </motion.div>
          </Link>

          {/* Overlay with action buttons */}
          <motion.div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: "rgba(0,0,0,0.7)",
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="d-flex gap-2">
              <motion.button
                variants={buttonVariants}
                className="btn btn-light btn-sm rounded-circle"
                style={{ width: "40px", height: "40px" }}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaEye />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                className="btn btn-primary btn-sm rounded-circle"
                style={{ width: "40px", height: "40px" }}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaShoppingCart />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                className="btn btn-danger btn-sm rounded-circle"
                style={{ width: "40px", height: "40px" }}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart />
              </motion.button>
            </div>
          </motion.div>

          {/* Badge for featured products */}
          {product.rating && product.rating >= 4.5 && (
            <Badge
              bg="success"
              className="position-absolute top-0 end-0 m-2"
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                animation: "pulse 2s infinite",
              }}
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Card Body */}
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none"
            >
              <Card.Title as="div" className="product-title mb-2">
                <strong className="text-dark">
                  {product.name || "Unnamed Product"}
                </strong>
              </Card.Title>
            </Link>

            <div className="mb-2">
              <Rating
                value={product.rating || 0}
                text={`${product.numReviews || 0} reviews`}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Card.Text as="h4" className="mb-0 text-primary fw-bold">
              ${product.price || 0}
            </Card.Text>

            <motion.button
              className="btn btn-primary btn-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "20px",
                padding: "0.5rem 1rem",
              }}
            >
              Add to Cart
            </motion.button>
          </div>
        </Card.Body>

        {/* Gradient overlay on hover */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </Card>
    </motion.div>
  );
};

export default Product;
