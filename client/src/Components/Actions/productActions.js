// import async from "async";
import async from "async";
import axios from "axios";
import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE, PRODUCT_SERVER } from "./types";

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

export { getProductByArrivalTopSelling}