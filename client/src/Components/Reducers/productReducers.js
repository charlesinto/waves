import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE, 
    GET_PRODUCT_CATEGORIES, GET_PRODUCTS_TO_SHOP, 
    ADD_PRODUCTS, UPLOAD_IMAGE, CLEAR_FORM, ADD_PRODUCT, ADD_WOOD } from "../Actions/types"; 

const INITIAL_STATE = {promotions:{bysales:[], byarrival:[]}, categories:{wood:[],brand:[]},
 toShop:[], toShopSize: null, images:[], isUploaded:false}

export default function(state=INITIAL_STATE, actions){
    switch(actions.type){
        case GET_PRODUCTS_BY_SALES_ARRIVAL_DATE:
            return {...state, promotions:{...state.promotions, 
                byarrival:actions.payload.byarrival, bysales:actions.payload.bysales}}
        case GET_PRODUCT_CATEGORIES:
                return {...state, categories:{...state.categories,
                     wood:actions.payload[0].wood, brand:actions.payload[1].brands}}
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: actions.payload.products,
                toShopSize: actions.payload.size
            }
        case ADD_PRODUCTS:
            return {
                ...state,
                addProducts: actions.payload
            }
        case UPLOAD_IMAGE:
            console.log(actions.payload)
            return {
                ...state,
                images: actions.payload.files,
                isUploaded: true
            }
        case CLEAR_FORM:
            return {...state,
                images: []    
            }
        case ADD_PRODUCT:
            return {...state, categories:{...state.categories, brand:actions.payload}}
        case ADD_WOOD:
            console.log('ac', actions.payload)
            return {...state, categories:{...state.categories, wood:actions.payload}}
        default:
            return {...state}
    }
}