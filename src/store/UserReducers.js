import axios from 'axios';

//Informacion Inicial
const initialData = {
    userLogged: [],
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
            return {...state, userLogged: action.payload}
        case USER_DISCONNECT_SUCCESS:
            return {...state, userLogged: undefined}
        case GET_PROFILE_INFORMATION_BY_ID:
            return {...state, usuario: action.payload}
        default: 
            return state
    }
}

//Acciones
export const initSessionAction = (user, password) => async (dispatch, getState) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/:${user}:${password}`);
            dispatch({
                type: USER_INIT_SESSION,
                payload: res.data
            })
    }catch(error){
        console.log(error);
    }
}

export const registerUserAction = (user) => async (dispatch, getState) => {

    try{
        const res = await axios.post(`http://localhost:8080/api`, user);
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

export const getUserInformationById = (id) => async (dispatch, getState) => {

    try{
        const res = await axios.get(`http://localhost:8080/api/users:${id}/infoUser`)
        dispatch({
            type: GET_PROFILE_INFORMATION_BY_ID,
            payload: res.data
        })
    }catch(error){
        console.log(error);
    }
}

export const updateUserInformation = (user) => async (dispatch, getState) => {
    
    try{
        const res = await axios.put(`http://localhost:8080/api/users:${user.userID}/update`, user)
        dispatch({
            type: GET_PROFILE_INFORMATION_BY_ID,
            payload: res.data
        })
    }catch(error){
        console.log(error);
    }
}

export const updateUserImageProfile = (user,data) => async (dispatch, getState) => {

    try{
        const res = await axios.post(`http://localhost:8080/api/users:${user.userID}/setProfileImage`, data ,{
            headers: {"Content-type": "multipart/form-data"}                    
        })
        dispatch({
            type: SET_IMAGE_USER,
            payload: res
        })
    }catch(error){
        console.log(error);
    }
}