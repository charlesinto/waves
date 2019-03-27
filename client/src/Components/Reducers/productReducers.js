import { GET_PRODUCTS_BY_SALES_ARRIVAL_DATE } from "../Actions/types";

const INITIAL_STATE = {promotions:{bysales:[], byarrival:[]}}

export default function(state=INITIAL_STATE, actions){
    switch(actions.type){
        case GET_PRODUCTS_BY_SALES_ARRIVAL_DATE:
            return {...state, promotions:{...state.promotions, 
                byarrival:actions.payload.byarrival, bysales:actions.payload.bysales}}
        default:
            return {...state}
    }
}