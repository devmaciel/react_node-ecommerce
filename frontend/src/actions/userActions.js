import Cookie from 'js-cookie';

const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } = require("../constants/userConstants");
const { default: Axios } = require("axios");




const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})
    try{
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    }catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
}

export { signin };