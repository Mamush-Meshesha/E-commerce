import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create product?")) {
      try {
        await createProduct();
        toast.success("Product created successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
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
                  <FaEye className="me-3" />
                  Product Management
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Manage your product inventory and details
                </p>
              </Col>
              <Col className="text-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="btn-lg px-4 py-3 rounded-pill fw-bold"
                    onClick={createProductHandler}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(255,255,255,0.3)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <FaPlus className="me-2" />
                    Create Product
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
                <FaEye className="me-2" />
                Products List ({data.products.length})
              </h5>
            </div>

            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th className="border-0 py-3 px-4 fw-bold">ID</th>
                    <th className="border-0 py-3 px-4 fw-bold">NAME</th>
                    <th className="border-0 py-3 px-4 fw-bold">PRICE</th>
                    <th className="border-0 py-3 px-4 fw-bold">CATEGORY</th>
                    <th className="border-0 py-3 px-4 fw-bold">BRAND</th>
                    <th className="border-0 py-3 px-4 fw-bold text-center">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <td className="py-3 px-4">
                        <Badge
                          bg="secondary"
                          className="px-3 py-2 rounded-pill"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {product._id.slice(-6)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 fw-semibold">{product.name}</td>
                      <td className="py-3 px-4">
                        <span className="text-success fw-bold">
                          ${product.price}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          bg="info"
                          className="px-3 py-2 rounded-pill"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {product.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 fw-semibold">{product.brand}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <LinkContainer
                              to={`/admin/product/${product._id}/edit`}
                            >
                              <Button
                                variant="outline-primary"
                                className="btn-sm px-3 py-2 rounded-pill"
                                style={{
                                  border: "2px solid #667eea",
                                  color: "#667eea",
                                  background: "transparent",
                                }}
                              >
                                <FaEdit />
                              </Button>
                            </LinkContainer>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="outline-danger"
                              className="btn-sm px-3 py-2 rounded-pill"
                              onClick={() => deleteHandler(product._id)}
                              style={{
                                border: "2px solid #dc3545",
                                color: "#dc3545",
                                background: "transparent",
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>

          <motion.div variants={itemVariants} className="mt-4">
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductListScreen;
