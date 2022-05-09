import { useDispatch } from 'react-redux';
import { searchContactAction } from "../../../store/ContactReducer"
import {TextField} from '@mui/material';

export default function FormContact(){
    const dispatch = useDispatch();

    const handleFormChange = (e) => {
        e.preventDefault();
        let nombreUsuario = document.getElementById("textboxUser").value

        dispatch(searchContactAction(nombreUsuario))
    }

    return (
        <div>
            <form id="Form-Contact">
                <div id="formSearchcontactContainer">
                    <TextField id="textboxUser" onChange={(e) => handleFormChange(e)} margin="normal" fullWidth label="Buscar Contacto" name="searchContact" autoFocus />
                </div>
            </form>
        </div>
    );
}