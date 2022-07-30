import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContact from "./components/FormContact"
import ContactResult from "./components/ContactResults"
import NavigationBar from "../../components/NavigationBar"

export default function AddContact(){
    let searchResults = useSelector((state) => state.contact.searchContact.foundContacts)
    const id = useSelector((state) => state.user.infoUser.userID)
    const navigate = useNavigate();

    useEffect(() => {
        if(id == null){
            navigate('/login');
        }
    })

    return(
        <div className="d-grid gad-2">
            <NavigationBar />
            <FormContact />
            <ContactResult results={searchResults} userID={id}/>
        </div>

    )
}