import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import data from '../data';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {
    // console.log(props.match.params.id)
    // const product = data.products.find( x => x._id === props.match.params.id);

    //redux
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(detailsProduct(props.match.params.id));

        return () => {

        };
    }, [dispatch, props.match.params.id]);


    //add to cart, FUNCTION
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty); //redirect url get
    }

    return <div>

        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>

        { 
            loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
            ( 
            <div className="details ">
                <div className="details-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="details-info">
                    <ul>
                        <li><h4>{product.name}</h4></li>
                        <li>{product.rating} Stars ({product.reviews} Reviews)</li>
                        <li>Price: <b>${product.price}</b></li>
                        <li>Description: <div>{product.description}</div></li>
                    </ul>
                </div>
    
                <div className="details-action">
                    <ul>
                        <li>Price: {product.price}</li>
                        <li>Status: 
                        {
                            product.countInStock > 0 
                            ?
                            "In Stock"
                            :
                            "Out of Stock"
                        }
                        </li>
                        <li>Qty:
                            <select value={qty} onChange={(e) => { setQty(e.target.value) } }>
                                {[...Array(product.countInStock).keys()].map(x => 
                                    <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                                )}
                            </select>
                        </li>

                        {
                        product.countInStock > 0 
                        ?
                        <li><button onClick={handleAddToCart} className="button-cart primary">Add to Cart</button></li>
                        :
                        <li><button disabled className="button-cart secondary">Out of Stock</button></li>
                        }
                    </ul>
                </div>
    
            </div>

            )
        }

    </div>
}

export default ProductScreen;