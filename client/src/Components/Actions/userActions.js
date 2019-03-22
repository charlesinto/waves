import { USER_SERVER } from '../Util/misc';
import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

const loginUser = function(record){
   const response = axios.post(`${USER_SERVER}/login`, record)
                        .then(response => {console.log('response'); return response.data})
                        .catch(error => {
                                console.log(error.response)
                                return error.response.data;
                        })

    return {
        type: LOGIN_USER,
        payload: response
    }
}

const registerUser = function(user){
    const response = axios.post(`${USER_SERVER}/register`, user)
                        .then(response => {return response.data})
                        .catch(error => {
                                console.log(error.response)
                                return error.response.data;
                        })

    return {
        type: REGISTER_USER,
        payload: response
    }
}

const authUser = function(){
    const response = axios.post(`${USER_SERVER}/auth`, {})
                        .then(response => { return {...response.data, status:response.status}})
                        .catch(error => {
                                return {...error.response.data, status: error.response.status};
                        })
    return {
        type: AUTH_USER,
        payload: response
    }
}

export {
    loginUser,
    registerUser,
    authUser

}