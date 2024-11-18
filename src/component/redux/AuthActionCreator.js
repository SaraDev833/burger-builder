import axios from 'axios'
import * as actionTypes from './ActionType'


export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    }
  }
}
export const AuthLoading=(props)=>{
  return{
    type:actionTypes.AUTH_LOADED,
    payload:props ,
  }
  }
export const AuthFailed =(props)=>{
  return{
    type:actionTypes.AUTH_FAILED , 
    payload:props
  }
}
export const auth = (email, password, mode) => dispatch => {
 dispatch(AuthLoading(true))
  let authData = {
    email: email,
    password: password,
    mode: mode,
    returnSecureToken: true,
  }
  const API_KEY = "AIzaSyAZx1zy1E7HkbldtiQ_bEy3uyBgjf4AWN0";

  if (mode === "Signup") {

    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, authData)
      .then(response => {
        dispatch(AuthLoading(false))
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem("userId", response.data.localId)
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('expirationDate', expirationTime)
        dispatch(authSuccess(response.data.localId, response.data.idToken))
      })
      .catch(err=>{
        dispatch(AuthLoading(false))
        dispatch(AuthFailed(err.response.data.error.message))
      })
  }
  else {
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY, authData)
      .then(response => {
        dispatch(AuthLoading(false))
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem("userId", response.data.localId)
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('expirationDate', expirationTime)
        dispatch(authSuccess(response.data.localId, response.data.idToken))
      })
      .catch(err=>{
        dispatch(AuthLoading(false))
        dispatch(AuthFailed(err.response.data.error.message))
      })
  }


}

export const logout =()=>{
     localStorage.removeItem('token');
     localStorage.removeItem('userId');
     localStorage.removeItem('expirationDate');
     return{
      type:actionTypes.AUTH_LOGOUT ,
     }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        logout()
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationDate'));
        if (expirationTime <= new Date()) {
          logout()
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(userId, token));
        }
    }
};


