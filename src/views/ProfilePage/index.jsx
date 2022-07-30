import { useEffect} from 'react';
import { useSelector } from 'react-redux';
import NavigationBar from "../../components/NavigationBar"
import UserInformation from "./components/userInformation"
import { useNavigate } from 'react-router-dom'
import './style.css';

export default function ProfilePage(){
    let user = useSelector((state) => state.user.infoUser)
    const navigate = useNavigate();

    useEffect(() =>{

        if(!user.userID){
            navigate('/login');
        }
    })

    return(
        <div className="d-grid gad-2">
            <NavigationBar view={"Profile"} />
            <UserInformation user={user}/>
        </div>
    )
}