import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"
const Product = ({product}) => {
    return (
      <Card className="my-3 p-3 rounded " style={{ height: "400px" }}>
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{ height: "220px" }}
            className="object-cover"
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div"></Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    );
}

export default Product