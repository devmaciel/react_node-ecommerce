import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';


const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
});

//redux extension no dev tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//thunk asyn no redux (reducer/initialState/compose)
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;