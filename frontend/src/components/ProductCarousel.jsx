import { Link } from "react-router-dom";
import { Carousel, Image, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaArrowRight } from "react-icons/fa";
import Message from "./message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";

const ProductCarousel = () => {
  const { data: products, error } = useGetTopProductsQuery();

  // Use API data directly
  const displayProducts = products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const captionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return error ? (
    <Message variant="danger">
      {error?.data?.message || error?.message || "An error occurred"}
    </Message>
  ) : (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-5"
    >
      <Carousel
        pause="hover"
        className="carousel-modern mb-4"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        {displayProducts &&
          Array.isArray(displayProducts) &&
          displayProducts.map((product, index) => (
          <Carousel.Item
            key={product._id}
              className="carousel-item-modern position-relative"
              style={{ height: "clamp(300px, 50vh, 500px)" }}
            >
              <div className="position-relative h-100">
                <Link
                  to={`/product/${product._id}`}
                  className="text-decoration-none"
                >
              <Image
                    src={
                      product.image || "https://picsum.photos/800/500?random=99"
                    }
                    alt={product.name || "Product"}
                fluid
                    className="w-100 h-100"
                    style={{
                      height: "clamp(300px, 50vh, 500px)",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/800/500?random=99";
                    }}
                  />
                </Link>

                {/* Gradient Overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 100%)",
                  }}
                />

                {/* Content Overlay */}
                <motion.div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                  variants={itemVariants}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-md-8 col-lg-6">
                        <motion.div variants={captionVariants}>
                          {/* Badge */}
                          <Badge
                            bg="success"
                            className="mb-3 px-3 py-2"
                            style={{
                              fontSize: "0.8rem",
                              background:
                                "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                              animation: "pulse 2s infinite",
                            }}
                          >
                            <FaStar className="me-1" />
                            Featured Product
                          </Badge>

                          {/* Title */}
                          <h1
                            className="text-white mb-3"
                            style={{
                              fontSize: "clamp(1.5rem, 4vw, 3rem)",
                              fontWeight: "700",
                              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                              lineHeight: "1.2",
                            }}
                          >
                            {product.name || "Product Name"}
                          </h1>

                          {/* Price */}
                          <h2
                            className="text-white mb-3"
                            style={{
                              fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                              fontWeight: "600",
                              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                            }}
                          >
                            ${product.price || 0}
                </h2>

                          {/* Description */}
                          <p
                            className="text-white mb-4 d-none d-md-block"
                            style={{
                              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                              maxWidth: "500px",
                              lineHeight: "1.6",
                            }}
                          >
                            {product.description ||
                              "Product description not available"}
                          </p>

                          {/* Action Buttons */}
                          <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
                            <motion.div variants={buttonVariants}>
                              <Button
                                as={Link}
                                to={`/product/${product._id}`}
                                variant="light"
                                size="lg"
                                className="px-3 px-md-4 py-2 py-md-3 rounded-pill fw-bold"
                                whileHover="hover"
                                style={{
                                  background: "white",
                                  color: "#667eea",
                                  border: "none",
                                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                  fontSize: "clamp(0.8rem, 2vw, 1rem)",
                                }}
                              >
                                <FaShoppingCart className="me-2" />
                                <span className="d-none d-sm-inline">
                                  Shop Now
                                </span>
                                <span className="d-sm-none">Shop</span>
                                <FaArrowRight className="ms-2" />
                              </Button>
                            </motion.div>

                            <motion.div variants={buttonVariants}>
                              <Button
                                as={Link}
                                to={`/product/${product._id}`}
                                variant="outline-light"
                                size="lg"
                                className="px-3 px-md-4 py-2 py-md-3 rounded-pill fw-bold"
                                whileHover="hover"
                                style={{
                                  border: "2px solid white",
                                  color: "white",
                                  background: "transparent",
                                  fontSize: "clamp(0.8rem, 2vw, 1rem)",
                                }}
                              >
                                <span className="d-none d-sm-inline">
                                  View Details
                                </span>
                                <span className="d-sm-none">View</span>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div
                  className="position-absolute"
                  style={{
                    top: "20px",
                    right: "20px",
                    width: "100px",
                    height: "100px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite",
                  }}
                />
                <div
                  className="position-absolute"
                  style={{
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite reverse",
                  }}
                />
              </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </motion.div>
  );
};

export default ProductCarousel;
