import axios from 'axios';
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL,PRODUCT_DATAILS_SUCCESS } = require("../constants/productConstants");



const listProducts = () => async (dispatch) => {

    try {

        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});

    }catch(error){

        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message });

    }

};


const detailsProduct = (productId) => async (dispatch) => {
    try{

        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: PRODUCT_DATAILS_SUCCESS, payload: data});

    }catch(error){

        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message });

    }
}

//Export
export { listProducts, detailsProduct }