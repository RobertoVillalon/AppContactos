import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "../views/Login"
import Register from "../views/Register";
import ContactList from "../views/ContactList";
import SearchContact from "../views/SearchContact";
import ProfilePage from "../views/ProfilePage";
import Error404 from "../views/404"

export default function Rutas(){

    return(
        <Router>
            <Routes>
                <Route path="/" exact element={<Navigate to="/login" />}></Route>
                <Route path="/login" exact element={<Login/>}></Route>
                <Route path ="/register" exact element={<Register/>}></Route>
                <Route path ="/contact-list" exact element={<ContactList/>}></Route>
                <Route path = "/search-contact" exact element={<SearchContact/>}></Route>
                <Route path ="/profile" exact element={<ProfilePage/>}></Route>
                <Route path = "*" exact element={<Error404 />}></Route>
            </Routes>
        </Router>
    );
}