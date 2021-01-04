import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import {Row,Col} from 'react-bootstrap'
// import axios from 'axios'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
 
const HomeScreen = () => {
    // const [products, setProducts] = useState([]);  //OLD WAY
     
    const dispatch = useDispatch();

    // Name it, what you named it in store
    const productList = useSelector( state => state.productList );
    
    //Destructuring parts of the state that could be sent down from reducer
    const { loading, error, products } = productList

    // We make requests when the app has loaded
    useEffect(() => {
        //Calls listProducts and fills up our space
        dispatch(listProducts())
        
        //----------OLD WAY--------------
        // const fetchProducts = async () => {       
        //     const response = await axios.get('/api/products')
        //     setProducts(response.data) 
        // }
        //fetchProducts();
    }, [dispatch]) //passing dispatch as a dependency since we are using it, otherwise we'll get a warning

    return (
        <>
            <h1>Latest Products</h1>
            { loading ? 
            <Loader />
            : error ? 
            <Message variant='danger'>{error}</Message> 
            : <Row>
                    { products.map(product => ( 
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>                    
                    ))}
              </Row> 
            }
                    
        </>
    )
}

export default HomeScreen
