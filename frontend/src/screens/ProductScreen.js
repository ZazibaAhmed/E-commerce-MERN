import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Image, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

//Destructuring the props we get from route
//history to redirect
const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)

    //------------OLD WAY---------------
    // const [product, setProduct] = useState({}) 
    // useEffect( () => {
    //     const fetchProduct = async () => {
    //         const response = await axios.get(`/api/products/${match.params.id}`)
    //         setProduct(response.data)
    //     }
    //     fetchProduct()
    // }, [match])
     
    const dispatch = useDispatch();

    const productDetails = useSelector( state => state.productDetails );
    const { loading, error, product } = productDetails

  
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        //Redirecting to cart
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    return (
        <>
            <Link className="btn btn-light my-3" to="/" exact>
                Go Back
            </Link>
            { loading ? 
            <Loader />
            : error ? 
            <Message variant='danger'>{error}</Message> 
            : <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating 
                            color='orange'
                            value={product.rating} 
                            text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col><strong>{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control 
                                                as="select" 
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}>  
                                            {
                                              [...Array(product.countInStock).keys()].map( x => (
                                                <option key={x+1} value={x+1}>
                                                    { x + 1}
                                                </option>
                                              ))

                                            }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button 
                                    onClick={addToCartHandler}
                                    className="btn-block" 
                                    type="button"
                                    disabled={product.countInStock===0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </>
    )
}

export default ProductScreen
