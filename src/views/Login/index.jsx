import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserFormLogin from "./components/UserFormLogin"
import "./style.css"
import { useSelector } from "react-redux";


export default function Login(){
    const user = useSelector((state) => state.user)


    useEffect(() => {
    },[user])

    return(
        <div>
            {user.initSessionStatus === 'received' ? <Navigate to={`/contact-list`} /> : <UserFormLogin/>}
        </div>
    )
}