import axios from 'axios';

//Informacion Inicial
const initialData = {
}

//Constantes
const USER_INIT_SESSION = "USER_INIT_SESSION";
const GET_PROFILE_INFORMATION_BY_ID = "GET_PROFILE_INFORMATION_BY_ID";
const SET_IMAGE_USER = "SET_IMAGE_USER";
const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
const USER_DISCONNECT_SUCCESS = "USER_DISCONNECT_SUCCESS";

//reducers
export default function userReducer(state = initialData, action){

    switch (action.type) {
        case USER_INIT_SESSION:
            return {...state, user: action.payload}
        case USER_DISCONNECT_SUCCESS:
            return {...state, user: null}
        case GET_PROFILE_INFORMATION_BY_ID:
            return {...state, userInfo: action.payload}
        default: 
            return state
    }
}

//Acciones
export const initSessionAction = (user, password) => async (dispatch, getState) => {
    let userCredentials = {
        usernameOrEmail: user,
        password: password
    }

    try{
        const res = await axios.post(`http://localhost:8080/api/login`, userCredentials);
            dispatch({
                type: USER_INIT_SESSION,
                payload: res.data
            })

            document.cookie = "jwt: "+res.data.auth;
    }catch(error){
        console.log(error);
    }
}

export const registerUserAction = (user) => async (dispatch, getState) => {

    try{
        const res = await axios.post(`http://localhost:8080/api/register`, user);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        })
    }catch(error){
        console.log(error);
    }
}

export const disconnectUserAction = () => (dispatch, getState) => {
        dispatch({
            type: USER_DISCONNECT_SUCCESS,
            payload: initialData
        })
}

export const updateUserInformation = (user) => async (dispatch, getState) => {
    
    try{
        const res = await axios.put(`http://localhost:8080/api/users/${user.userID}/update`, user, {
            headers: {"Authorization" : 'Bearer '+ document.cookie.substring(5)}
        })
        dispatch({
            type: GET_PROFILE_INFORMATION_BY_ID,
            payload: res.data
        })
    }catch(error){
        console.log(error);
    }
}

export const updateUserImageProfile = (user, data) => async (dispatch, getState) => {

    try{
        const res = await axios.post(`http://localhost:8080/api/users/images/${user.userID}/setProfileImage`, data ,{
            headers: {"Content-type": "multipart/form-data","Authorization":'Bearer '+ document.cookie.substring(5)}                    
        })
        dispatch({
            type: SET_IMAGE_USER,
            payload: res
        })
    }catch(error){
        console.log(error);
    }
}