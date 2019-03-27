import {combineReducers} from 'redux';

import User from './userReducer';
import ProductsReducer from './productReducers';

export default combineReducers({
    auth: User,
    products: ProductsReducer
})