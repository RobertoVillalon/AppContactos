import React, { useEffect, useState } from 'react';
import UserContactList from "./components/userContactList"
import NavigationBar from "../../components/NavigationBar"
import UserContactInformation from './components/userContactInformation';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getContactAction } from "../../store/ContactReducer"


export default function ContactList(){
    const contactListData = useSelector(store => store.contact.contacts)
    const [contactData, setContactData] = useState([])
    const id = useSelector(store => store.usuario.userLogged.userID)
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let [loadedContacts, setLoadedContacts] = useState(false);

    useEffect(() => {
        if(id == null){
            navigate('/login');
        }
        dispatch(getContactAction(id))
    },[])

    useEffect(() => {
        Array.isArray(contactListData) ? setLoadedContacts(true) : setLoadedContacts(false)
    },[contactListData])
    
    return(
        <div>
            <NavigationBar />
            <div id="principalContainer">
                <UserContactList isLoading={loadedContacts} getContactData={setContactData} userListInformation={contactListData}/>
                <UserContactInformation userInformation={contactData}/>           
            </div>
        </div>
    )
    
}

