import { LOGIN_USER, REGISTER_USER,AUTH_USER } from '../Actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action){
    switch(action.type){
        case LOGIN_USER: 
            return {...state, ...action.payload}
        case REGISTER_USER: 
            return {...state, ...action.payload}
        case AUTH_USER: 
            return {...state, userData: action.payload}
        default:
            return state
    }
}