import { LOGIN_USER, REGISTER_USER } from '../Actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action){
    switch(action.type){
        case LOGIN_USER: 
            return {...state, ...action.payload}
        case REGISTER_USER: 
            return {...state, ...action.payload}
        default:
            return state
    }
}