
import * as actionTypes from './ActionType';
import axios from 'axios';


export const add_item = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}
export const remove_item = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType,
    }
}
export const updatePurchaseAble = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}
export const reset = () => {
    return {
        type: actionTypes.RESET
    }
}



export const LoadOrders = (orders) =>{
    return{
        type:actionTypes.LOAD_ORDERS , 
        payload:orders ,
    }
}

export const OrderError = ()=>{
    return{
        type:actionTypes.LOAD_ERROR ,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    // Correctly construct the query parameters
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    // Log the URL to debug
    const url = `https://react-dc1a3-default-rtdb.firebaseio.com/orders.json${queryParams}`;
    console.log('Fetching orders from:', url);

    axios.get(url)
        .then(response => {
            const orders = response.data ? Object.values(response.data) : []; // Convert object to array if necessary
            dispatch(LoadOrders(orders));
        })
        .catch(error => {
            console.error('Error fetching orders:', error.response ? error.response.data : error.message);
            dispatch(OrderError()); // Dispatch the error action
        });
};












// export const Loadorders = orders => {
//     return {
//         type: actionTypes.LOAD_ORDERS,
//         payload: orders,
//     }
// }

// export const Order_err = () => {
//     return {
//         type: actionTypes.LOAD_ERROR,
//     }
// }
// export const fetchOrders = () => dispatch => {
//     axios.get("https://react-dc1a3-default-rtdb.firebaseio.com/orders.json")
//         .then(response => {
//             console.log('sara')
//             console.log('reponse', response)
//             dispatch(Loadorders(response.data));
//         })
//         .catch(err => {
//             dispatch(Order_err());
//         })
// }