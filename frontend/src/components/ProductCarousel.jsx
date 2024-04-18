import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./message"
import { useGetTopProductsQuery } from "../slices/productApiSlice"

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery()
    

    return isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <Carousel pause="hover" className="bg-primary mb-4">
        {products.map((product) => (
          <Carousel.Item key={product._id} className="carousel">
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />

              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
                    </Carousel.Caption>
                    <div style={{position: "absolute top-0"}}>
                        <p>{product.description}</p>
                    </div>
            </Link>
          <div>
            
          </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
}
export default ProductCarousel