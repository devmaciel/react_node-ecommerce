// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import data from '../data';
// import axios from 'axios';
import { listProducts } from '../actions/productActions';

function HomeScreen (props) {

    //proxy react hooks
    // const [products, setProduct] = useState([]);
    
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList; 
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(listProducts());

        // const fetchData = async() => {
        //     const {data} = await axios.get("/api/products");
        //     setProduct(data)
        // }

        // fetchData();

        return () => {

        };
    }, [dispatch])


    return loading ? <div>Loading...</div> : error? <div>{error}</div> :
    <div>
        <ul className="products">
            {
                products.map(product => 
                    <li key={product._id}>
                        <div className="product">
                            <Link to={'/product/' + product._id}>
                                <img className="product-image" src={product.image} alt="product" />
                            </Link>
                            
                            <div className="product-name">
                                <Link to={'/product/' + product._id}>{product.name}</Link>
                            </div>

                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">{product.rating} Stars ({product.reviews} Reviews)</div>
                        </div>
                    </li>
                )
            }
        </ul>
    </div>
}

export default HomeScreen;