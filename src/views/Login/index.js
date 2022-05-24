import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserFormLogin from "./components/UserFormLogin"
import "./style.css"
import { useSelector} from "react-redux";


export default function Login(){
    const user = useSelector(store => store.usuario.user?.user)
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {

    },[user])

    return(
        <div>
            {user ? <Navigate to={`/contact-list`} /> : <UserFormLogin showAlert={showAlert}/>}
        </div>
    )
}