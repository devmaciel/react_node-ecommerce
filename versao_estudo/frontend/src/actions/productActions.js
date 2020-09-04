import axios from 'axios';
import Axios from 'axios';
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL,PRODUCT_DATAILS_SUCCESS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_FAIL,PRODUCT_SAVE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } = require("../constants/productConstants");



const listProducts = () => async (dispatch) => {

    try {

        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});

    }catch(error){

        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message });

    }

};

const saveProduct = (product) => async (dispatch, getState) => {

    try{
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const {UserInfo: {UserInfo}} = getState();

        if(!product._id){
            const {data} = await Axios.post('/api/products', product, {headers:{
                'Authorization': 'Bearer ' + UserInfo.token
            }});
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }else{
            const {data} = await Axios.put('/api/products/' + product._id, product, {headers:{
                'Authorization': 'Bearer ' + UserInfo.token
            }});
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }
    }catch(error){
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message });
    }

}


const detailsProduct = (productId) => async (dispatch) => {
    try{

        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({type: PRODUCT_DATAILS_SUCCESS, payload: data});

    }catch(error){

        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message });

    }
}


const deleteProduct = (productId) => async (dispatch, getState) => {
    try{

        const { userSignin: { UserInfo } } = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete("/api/products/" + productId, {
            headers:{
                Authorization: 'Bearer ' + UserInfo.token
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true});

    }catch(error){

        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message });

    }
}


//Export
export { listProducts, detailsProduct, saveProduct, deleteProduct }