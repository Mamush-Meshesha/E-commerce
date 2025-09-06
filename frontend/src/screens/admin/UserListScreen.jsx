import { LinkContainer } from "react-router-bootstrap";
import { FaTrash, FaEdit, FaUsers, FaUserShield } from "react-icons/fa";
import { Table, Button, Card, Badge, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Message from "../../components/message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
const UserListScreen = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();

  // Extract users array from the API response with proper error handling
  const users = data?.users || [];

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        await deleteUser(id);
        toast.success("successfully deleted");
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
                  <FaUsers className="me-3" />
                  User Management
                </h1>
                <p className="text-white-50 mb-0 mt-2">
                  Manage user accounts and permissions
                </p>
              </Col>
              <Col className="text-end">
                <Badge
                  bg="light"
                  className="px-3 py-2 rounded-pill text-dark fw-bold"
                  style={{ fontSize: "1rem" }}
                >
                  {users?.length || 0} Users
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message ||
            error?.message ||
            "Failed to load users. Please check your permissions."}
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
                <FaUsers className="me-2" />
                Users List ({users?.length || 0})
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
                    <th className="border-0 py-3 px-4 fw-bold">EMAIL</th>
                    <th className="border-0 py-3 px-4 fw-bold">ADMIN</th>
                    <th className="border-0 py-3 px-4 fw-bold text-center">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users && Array.isArray(users) && users.length > 0 ? (
                    users.map((user, index) => (
                      <motion.tr
                        key={user._id}
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
                            {user._id.slice(-6)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 fw-semibold">{user.name}</td>
                        <td className="py-3 px-4">
                          <a
                            href={`mailto:${user.email}`}
                            className="text-decoration-none text-primary"
                          >
                            {user.email}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          {user.isAdmin ? (
                            <Badge
                              bg="success"
                              className="px-3 py-2 rounded-pill d-flex align-items-center"
                              style={{
                                fontSize: "0.8rem",
                                width: "fit-content",
                              }}
                            >
                              <FaUserShield className="me-1" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge
                              bg="secondary"
                              className="px-3 py-2 rounded-pill d-flex align-items-center"
                              style={{
                                fontSize: "0.8rem",
                                width: "fit-content",
                              }}
                            >
                              <FaUsers className="me-1" />
                              User
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <LinkContainer
                                to={`/admin/user/${user._id}/edit`}
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
                                onClick={() => deleteHandler(user._id)}
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <div className="text-muted">
                          <FaUsers
                            className="mb-3"
                            style={{ fontSize: "3rem", opacity: 0.3 }}
                          />
                          <h5>No users found</h5>
                          <p>There are no users to display at the moment.</p>
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

export default UserListScreen;
