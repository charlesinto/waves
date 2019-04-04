import async from "async";
import axios from "axios";
import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE, PRODUCT_SERVER,
    GET_PRODUCT_CATEGORIES, GET_PRODUCTS_TO_SHOP, ADD_PRODUCTS,
 UPLOAD_IMAGE, CLEAR_FORM, ADD_PRODUCT, ADD_WOOD } from "./types";

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

const getProductsToShop = async (limit, skip, filters, previousState = []) => {
    try {
        const reponse = await getProducts(limit, skip, filters, previousState)
        return (dispatch) => {
            dispatch({type:GET_PRODUCTS_TO_SHOP,
                payload: reponse})
        } 
    }catch(e){
        throw e
    }
}

const getProducts = async (limit, skip, filters, previousState=[]) => {
    return new Promise((resolve, reject) => {
        axios
        .post(`${PRODUCT_SERVER}/shop`,{limit, skip, filters})
            .then(response => {
                console.log('response', response.data, 'filters', filters);
                   resolve({products:[...previousState, ...response.data.product],
                    size: response.data.size } ) 
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

const  addProductBrand = async function(datatoSubmit, existingBrands){
    try {
        const request = await axios.post(`${PRODUCT_SERVER}/brand`,datatoSubmit)
                                    .then(response => response.data)
                                    .catch(error => error.response.data)
        return {
            type: ADD_PRODUCT,
            payload: [...existingBrands, request.brand]
        }
    } catch (e){
        console.log(e)
    }
    
}

const  addProductWood = async function(datatoSubmit, existingBrands){
    
    try {
        const request = await axios.post(`${PRODUCT_SERVER}/wood`,datatoSubmit)
                                    .then(response => response.data)
                                    .catch(error => error.response.data)
        
        return {
            type: ADD_WOOD,
            payload: [...existingBrands, request.wood]
        }
    } catch (e){
        console.log(e)
    }
    
}

const addProduct = async (dataToSubmit) => {
    try{
        const respnse = await createNewProduct(dataToSubmit);

        return (dispatch) => {
            dispatch({type:ADD_PRODUCTS,
                payload: respnse})
        }
    }catch(e){
        throw e
    }
}

const createNewProduct = async (dataToSubmit) => {
    return new Promise((resolve, reject)=> {
        axios.post(`${PRODUCT_SERVER}/item`, dataToSubmit)
            .then(response => {
                resolve({...response.data, status: response.status})
            })
            .catch(error => {
                reject({...error.response.data, status: error.response.status})
            })
    })
}

const uploadHandler = async (file, config, formdata) => {
    try{
        const response = await uploadFile(file,config, formdata);
        return (dispatch) => {
            dispatch({
                type:UPLOAD_IMAGE,
                payload: response
            })
        }
    } catch(e){
        console.log(e)
        throw e
    }

}

const clearForm = () => {
    return {
        type: CLEAR_FORM,
        payload: ''
    }
}

const uploadFile = (file, config, formdata) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/users/uploadimage', formdata, config)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data));
    })
}

export { getProductByArrivalTopSelling, getProductsCategory,
    getProductsToShop, addProduct, uploadHandler, 
    clearForm, addProductBrand, addProductWood
}