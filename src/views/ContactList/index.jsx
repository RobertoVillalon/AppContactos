import React, { useEffect, useState } from 'react';
import UserContactList from "./components/userContactList"
import NavigationBar from "../../components/NavigationBar"
import UserContactInformation from './components/userContactInformation';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getContactAction } from "../../store/contactSlice"


export default function ContactList(){
    let contactListData = useSelector((state) => state.contact.userContacts.contacts)
    const [contactData, setContactData] = useState([])
    const id = useSelector((state) => state.user.infoUser.userID)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [loadedContacts, setLoadedContacts] = useState(false);

    useEffect(() => {

        if(id == null){
            navigate('/login');
        }

        dispatch(getContactAction(id)); 

    },[id, dispatch, navigate])

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

