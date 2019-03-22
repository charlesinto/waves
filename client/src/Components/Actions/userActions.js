import { USER_SERVER } from '../Util/misc';
import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

const loginUser = function(record){
    console.log('record', record);
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
                        .then(response => {console.log('response'); return response.data})
                        .catch(error => {
                                console.log(error.response)
                                return error.response.data;
                        })

    return {
        type: REGISTER_USER,
        payload: response
    }
}

export {
    loginUser,
    registerUser
}