import React from 'react';
import UserRegisterForm from './components/UserFormRegister';
import { useDispatch } from 'react-redux';
import { registerUserAction } from "../../store/userSlice"
import "./style.css";

export default function Register(){
    const dispatch = useDispatch();

    const handleSubmitRegister = (username, email, password) => {
        let user = {
            email: email,
            username: username,
            password: password 
        };

        dispatch(registerUserAction(user));
    }

    return(
        <div id="main-container-register">
            <UserRegisterForm handleSubmitRegister={handleSubmitRegister}/>
        </div>
    )
    
}