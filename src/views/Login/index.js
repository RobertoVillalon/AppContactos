import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserFormLogin from "./components/UserFormLogin"
import "./style.css"
import { useSelector, useDispatch} from "react-redux";

export default function Login(){
    const usersData = useSelector(store => store.usuario.userLogged)
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [userId, setUserId] = useState();
    let dispatch = useDispatch();

    useEffect(() => {

        if(usersData != null){ 
            if(usersData?.email && usersData?.password){
                setUserIsLogged(true);
                setUserId(usersData.userID);
            }else{ 
                setUserIsLogged(false);
                setShowAlert(true);
            }
        }

    },[usersData])

    return(
        <div>
            {userIsLogged ? <Navigate to={`/contact-list`} /> : <UserFormLogin showAlert={showAlert}/>}
        </div>
    )
}