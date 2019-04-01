import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE, 
    GET_PRODUCT_CATEGORIES, GET_PRODUCTS_TO_SHOP } from "../Actions/types"; 

const INITIAL_STATE = {promotions:{bysales:[], byarrival:[]}, categories:{wood:[],brand:[]},
 toShop:[], toShopSize: null}

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
        default:
            return {...state}
    }
}