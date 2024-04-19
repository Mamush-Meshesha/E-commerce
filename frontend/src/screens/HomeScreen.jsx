import { useGetProductsQuery } from "../slices/productApiSlice";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Message from "../components/message";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber});
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={"Welcome to E-Commerce"} />
          <h1>Letest products</h1>
          <Row>
            {Array.isArray(data.products) &&
              data.products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
