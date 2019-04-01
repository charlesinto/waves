import async from "async";
import axios from "axios";
import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE, PRODUCT_SERVER,
    GET_PRODUCT_CATEGORIES, GET_PRODUCTS_TO_SHOP } from "./types";

const getProductByArrivalTopSelling = async () => {

    try {
        const results = await getPromotion();
        return (dispatch) => {
            dispatch({type: GET_PRODUCTS_BY_SALES_ARRIVAL_DATE,
                payload:   {bysales:results[0].product, byarrival: results[1].product}})
        }
    } catch(e){
        throw e
    }
}

const getPromotion = () => {
    return new Promise((resolve, reject) => {
        async.parallel([function(callback){getProductsBySales(callback)},
            function(callback){getProductsByArrival(callback)}], (error, results) => {
                if(error) return reject(error)
                return resolve(results);
            })
    })
}
const getProductsBySales = (callback) => {
    axios
        .get(`${PRODUCT_SERVER}/get_items_by_order?sortby=sold&order=desc&limit=4`)
        .then(response => {callback(null, {...response.data, status: response.status});})
        .catch(error => {callback(null, {...error.response.data, status: error.response.status});})

    
}

const getProductsByArrival = (callback) => {
     axios
        .get(`${PRODUCT_SERVER}/get_items_by_order?sortby=createdAt&order=desc&limit=4`)
        .then(response => {callback(null, {...response.data, status: response.status});})
        .catch(error => {callback(null, {...error.response.data, status: error.response.status});})

   
}

const getProductsCategory = async () => {
    try{
        const categories = await getCategory();
        return (dispatch) => {
            
            dispatch({type: GET_PRODUCT_CATEGORIES,
                payload:categories})
        }
    } catch(e){
        throw e
    }
}

const getCategory = () => {
    return new Promise ((resolve, reject) => {
        async.parallel([function(callback){getWoodCategory(callback)},
                         function(callback){getBrandCategory(callback)}], (error, result) => {
                                if(error) return reject(error);
                                return resolve(result)
                         })
    })
}

const getWoodCategory = (callback) => {
    axios
        .get(`${PRODUCT_SERVER}/wood`)
        .then(response => {callback(null, {...response.data, status: response.status});})
        .catch(error => {callback(null, {...error.response.data, status: error.response.status});})
}

const getBrandCategory = (callback) => {
    axios
        .get(`${PRODUCT_SERVER}/brand`)
        .then(response => {callback(null, {...response.data, status: response.status});})
        .catch(error => {callback(null, {...error.response.data, status: error.response.status});})
}

const getProductsToShop = (limit, skip, filters, previousState = []) => {
    const response = axios
        .post(`${PRODUCT_SERVER}/shop`,{limit, skip, filters})
            .then(response => {
                console.log('response', response.data);
                return {products:[...previousState, ...response.data.product],
                    size: response.data.size }  
                // return (dispatch) => {
                //     dispatch({type: GET_PRODUCTS_TO_SHOP,
                //         payload:{products:[...previousState, ...response.data.product],
                //             size: response.data.size }
                //     })
                // }
                // return (dispatch) => {
                //     dispatch({type: '',
                //         payload:   {}})
                // }
            })
            .catch(error => {
                console.log(error)
                throw error;
            })
    return {
        type:GET_PRODUCTS_TO_SHOP,
        payload: response
    }
}

export { getProductByArrivalTopSelling, getProductsCategory,
    getProductsToShop
}