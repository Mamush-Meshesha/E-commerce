import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaSave,
  FaArrowLeft,
  FaImage,
  FaBox,
  FaTag,
  FaList,
  FaWarehouse,
  FaFileAlt,
} from "react-icons/fa";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetProductDetailsQuery,
} from "../../slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Submitting Product:", {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    });

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData);
      toast.success(res.message);
      setImage(res.data.data[0].url);
      console.log("Upload Response:", res);
    } catch (err) {
      console.error("Upload error:", err);
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
                  Edit Product
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Update product information and details
                </p>
              </Col>
              <Col className="text-end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/admin/productlist"
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
                    Back to Products
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
                <FaEdit className="me-2" />
                Product Information
              </h5>
            </div>

            <Card.Body className="p-4">
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group controlId="name" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaBox className="me-2 text-primary" />
                          Product Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter product name"
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
                      <Form.Group controlId="price" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaTag className="me-2 text-success" />
                          Price ($)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
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

                <Row>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group controlId="brand" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaTag className="me-2 text-info" />
                          Brand
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
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
                      <Form.Group controlId="category" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaList className="me-2 text-warning" />
                          Category
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
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

                <Row>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group controlId="countInStock" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaWarehouse className="me-2 text-secondary" />
                          Stock Quantity
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter stock quantity"
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
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
                      <Form.Group controlId="image" className="mb-4">
                        <Form.Label className="fw-bold text-dark d-flex align-items-center">
                          <FaImage className="me-2 text-primary" />
                          Product Image
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Image URL"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "10px",
                            padding: "0.75rem 1rem",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                            marginBottom: "0.5rem",
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
                        <Form.Control
                          type="file"
                          onChange={uploadFileHandler}
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "10px",
                            padding: "0.75rem 1rem",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                          }}
                        />
                        <small className="text-muted">Or upload a file</small>
                      </Form.Group>
                    </motion.div>
                  </Col>
                </Row>

                <motion.div variants={itemVariants}>
                  <Form.Group controlId="description" className="mb-4">
                    <Form.Label className="fw-bold text-dark d-flex align-items-center">
                      <FaFileAlt className="me-2 text-info" />
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "10px",
                        padding: "0.75rem 1rem",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        resize: "vertical",
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
                      Update Product
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

export default ProductEditScreen;
