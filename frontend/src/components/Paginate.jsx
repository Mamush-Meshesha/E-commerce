import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const paginationVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pages - 1) {
      rangeWithDots.push("...", pages);
    } else {
      rangeWithDots.push(pages);
    }

    return rangeWithDots;
  };

  return (
    pages > 1 && (
      <motion.div
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
        className="d-flex justify-content-center mt-5"
      >
        <Pagination
          className="pagination-modern"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "50px",
            padding: "0.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Previous Button */}
          {page > 1 && (
            <motion.div variants={itemVariants}>
              <LinkContainer
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${page - 1}`
                      : `/page/${page - 1}`
                    : `/admin/productlist/${page - 1}`
                }
              >
                <Pagination.Prev
                  className="pagination-item-modern"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary-color)",
                    padding: "0.75rem 1rem",
                    borderRadius: "50%",
                    margin: "0 0.25rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaChevronLeft />
                </Pagination.Prev>
              </LinkContainer>
            </motion.div>
          )}

          {/* Page Numbers */}
          {getVisiblePages().map((pageNum, index) => (
            <motion.div key={index} variants={itemVariants}>
              {pageNum === "..." ? (
                <Pagination.Ellipsis
                  className="pagination-ellipsis"
                  style={{
                    color: "var(--dark-color)",
                    padding: "0.75rem 1rem",
                    margin: "0 0.25rem",
                  }}
                />
              ) : (
                <LinkContainer
                  to={
                    !isAdmin
                      ? keyword
                        ? `/search/${keyword}/page/${pageNum}`
                        : `/page/${pageNum}`
                      : `/admin/productlist/${pageNum}`
                  }
                >
                  <Pagination.Item
                    active={pageNum === page}
                    className="pagination-item-modern"
                    style={{
                      background:
                        pageNum === page
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                      border: "none",
                      color: pageNum === page ? "white" : "var(--dark-color)",
                      padding: "0.75rem 1rem",
                      borderRadius: "50%",
                      margin: "0 0.25rem",
                      minWidth: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow:
                        pageNum === page
                          ? "0 4px 15px rgba(102, 126, 234, 0.3)"
                          : "none",
                    }}
                    whileHover="hover"
                  >
                    {pageNum}
                  </Pagination.Item>
                </LinkContainer>
              )}
            </motion.div>
          ))}

          {/* Next Button */}
          {page < pages && (
            <motion.div variants={itemVariants}>
              <LinkContainer
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${page + 1}`
                      : `/page/${page + 1}`
                    : `/admin/productlist/${page + 1}`
                }
              >
                <Pagination.Next
                  className="pagination-item-modern"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary-color)",
                    padding: "0.75rem 1rem",
                    borderRadius: "50%",
                    margin: "0 0.25rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaChevronRight />
                </Pagination.Next>
              </LinkContainer>
            </motion.div>
          )}
        </Pagination>
      </motion.div>
    )
  );
};

export default Paginate;
