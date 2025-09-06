import { useGetProductsQuery } from "../slices/productApiSlice";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use API data directly
  const displayData = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <motion.div variants={titleVariants} className="mb-4">
          <Link
            to="/"
            className="btn btn-light my-3 px-4 py-2 rounded-pill"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              fontWeight: "600",
            }}
          >
            ← Go Back
          </Link>
        </motion.div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Meta title={"Welcome to E-Commerce"} />

          <motion.div variants={titleVariants} className="text-center mb-5">
            <h1
              className="display-4 fw-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Latest Products
            </h1>
            <p className="lead text-muted" style={{ fontSize: "1.2rem" }}>
              Discover amazing products with unbeatable quality and prices
            </p>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Row>
              {displayData &&
              Array.isArray(displayData.products) &&
              displayData.products.length > 0 ? (
                displayData.products.map((product, index) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} index={index} />
                  </Col>
                ))
              ) : (
                <Col>
                  <div className="text-center py-5">
                    <h3>No products found</h3>
                    <p>
                      Please try again later or check back soon for new
                      products.
                    </p>
                  </div>
                </Col>
              )}
            </Row>
          </motion.div>

          {displayData && displayData.pages > 1 && (
            <motion.div variants={sectionVariants} className="mt-5">
              <Paginate
                pages={displayData.pages}
                page={displayData.page}
                keyword={keyword ? keyword : ""}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
export default HomeScreen;
