import Orders from '../Order/Orders';
import { LoadOrders, Loadorders, Order_err, OrderError } from './ActionCreator';
import * as actionTypes from './ActionType';
import { AuthFailed, AuthLoading } from './AuthActionCreator';


const Ingredient_prices = {
  salad: 20,
  cheese: 30,
  meat: 60,
};

const InitialState = {
  Ingredients: [
    { type: 'meat', amount: 0 },
    { type: 'cheese', amount: 0 },
    { type: 'salad', amount: 0 },
  ],
  totalPrice: 80,
  modalOpen: false,
  purchaseAble: false,
  redirect: false,
  orders: [],
  LoadOrders: true,
  OrderError: false,
  token: null,
  userId: null,
  AuthLoading:false ,
  AuthFailed: null ,
};

export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const addedIngredients = [...state.Ingredients];
      const newAddedTotalPrice = state.totalPrice + Ingredient_prices[action.payload];

      for (let item of addedIngredients) {
        if (item.type === action.payload) {
          item.amount++;
        }
      }

      return {
        ...state,
        Ingredients: addedIngredients,
        totalPrice: newAddedTotalPrice,
      };

    case actionTypes.REMOVE_INGREDIENT:
      const removedIngredients = [...state.Ingredients];
      const newRemovedTotalPrice = Math.max(state.totalPrice - Ingredient_prices[action.payload], 80);

      for (let item of removedIngredients) {
        if (item.type === action.payload && item.amount > 0) {
          item.amount--; // Only decrement if amount is greater than 0
        }
      }

      return {
        ...state,
        Ingredients: removedIngredients,
        totalPrice: newRemovedTotalPrice,
      };

    case actionTypes.UPDATE_PURCHASABLE:
      const sum = state.Ingredients.reduce((total, ingredient) => total + ingredient.amount, 0);
      return {
        ...state,
        purchaseAble: sum > 0,
      };
    case actionTypes.RESET:
      return {
        ...state,
        Ingredients: [
          { type: 'meat', amount: 0 },
          { type: 'cheese', amount: 0 },
          { type: 'salad', amount: 0 },
        ],
        totalPrice: 80,
        modalOpen: false,
        purchaseAble: false,
        redirect: false,
      }
    case actionTypes.LOAD_ORDERS:
      console.log('Loading orders:', action.payload); // Debugging line
      let orders = [];
      for (let key in action.payload) {
        orders.push({ id: key, ...action.payload[key] });
        console.log('orders', orders)
      }
      return {
        ...state,
        orders: orders,
        LoadOrders: false,
        OrderError: false,
      };

    case actionTypes.LOAD_ERROR:
      return {
        ...state,
        LoadOrders: false,
        OrderError: true
      }
    // auth
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        AuthFailed:null,
        token: null,
        userId: null,

      }
    case actionTypes.AUTH_LOADED:
      return{
        ...state,
        AuthLoading:action.payload,
      }
    case actionTypes.AUTH_FAILED:
      return{
        ...state,
        AuthFailed: action.payload ,
      }
    default:
      return state;
  }
};
