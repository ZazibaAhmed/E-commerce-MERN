import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState([]);  //OLD WAY
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  // Name it, what you named it in store
  const productList = useSelector((state) => state.productList);
  //Destructuring parts of the state that could be sent down from reducer
  const { loading, error, products, page, pages } = productList;

  // We make requests when the app has loaded
  useEffect(() => {
    //Calls listProducts and fills up our space
    dispatch(listProducts(keyword, pageNumber));

    //----------OLD WAY--------------
    // const fetchProducts = async () => {
    //     const response = await axios.get('/api/products')
    //     setProducts(response.data)
    // }
    //fetchProducts();
  }, [dispatch, keyword, pageNumber]); //passing dispatch as a dependency since we are using it, otherwise we'll get a warning

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
