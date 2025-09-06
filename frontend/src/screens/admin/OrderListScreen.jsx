import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Card, Badge, Row, Col } from "react-bootstrap";
import { FaTimes, FaEye, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";

const OrderListScreen = () => {
  const { data, isLoading, error } = useGetOrdersQuery();

  // Extract orders array from the API response
  const orders = data?.orders || [];

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
                  <FaShoppingBag className="me-3" />
                  Order Management
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Track and manage customer orders
                </p>
              </Col>
              <Col className="text-end">
                <Badge
                  bg="light"
                  className="px-3 py-2 rounded-pill text-dark fw-bold"
                  style={{ fontSize: "1rem" }}
                >
                  {orders?.length || 0} Orders
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message ||
            error?.message ||
            "Failed to load orders. Please check your permissions."}
        </Message>
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
                <FaShoppingBag className="me-2" />
                Orders List ({orders?.length || 0})
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
                    <th className="border-0 py-3 px-4 fw-bold">USER</th>
                    <th className="border-0 py-3 px-4 fw-bold">DATE</th>
                    <th className="border-0 py-3 px-4 fw-bold">TOTAL</th>
                    <th className="border-0 py-3 px-4 fw-bold">PAID</th>
                    <th className="border-0 py-3 px-4 fw-bold">DELIVERED</th>
                    <th className="border-0 py-3 px-4 fw-bold text-center">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders && Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <motion.tr
                        key={order._id}
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
                            {order._id.slice(-6)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 fw-semibold">
                          {order.user && order.user.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-muted">
                            {order.createdAt.substring(0, 10)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-success fw-bold">
                            ${order.totalPrice}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {order.isPaid ? (
                            <Badge
                              bg="success"
                              className="px-3 py-2 rounded-pill"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {order.paidAt.substring(0, 10)}
                            </Badge>
                          ) : (
                            <Badge
                              bg="danger"
                              className="px-3 py-2 rounded-pill"
                              style={{ fontSize: "0.8rem" }}
                            >
                              <FaTimes className="me-1" />
                              Not Paid
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {order.isDelivered ? (
                            <Badge
                              bg="success"
                              className="px-3 py-2 rounded-pill"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {order.deliveredAt.substring(0, 10)}
                            </Badge>
                          ) : (
                            <Badge
                              bg="warning"
                              className="px-3 py-2 rounded-pill"
                              style={{ fontSize: "0.8rem" }}
                            >
                              <FaTimes className="me-1" />
                              Pending
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button
                                variant="outline-primary"
                                className="btn-sm px-3 py-2 rounded-pill"
                                style={{
                                  border: "2px solid #667eea",
                                  color: "#667eea",
                                  background: "transparent",
                                }}
                              >
                                <FaEye className="me-1" />
                                Details
                              </Button>
                            </LinkContainer>
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <div className="text-muted">
                          <FaShoppingBag
                            className="mb-3"
                            style={{ fontSize: "3rem", opacity: 0.3 }}
                          />
                          <h5>No orders found</h5>
                          <p>There are no orders to display at the moment.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderListScreen;
