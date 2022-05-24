import React from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { disconnectUserAction } from '../../store/UserReducers';
import AppBar from '@mui/material/AppBar';
import MenuList from '@mui/material/MenuList';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import "./style.css"

export default function Navigation(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDisconnect = () => {
        dispatch(disconnectUserAction());
    }

    return(
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ContactAPP
                    </Typography>
                    <MenuList sx={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
                        <MenuItem selected={true} component={Link} to={`/contact-list`}>Mis Contactos</MenuItem>
                        <MenuItem component={Link} to={`/search-contact`}>Buscar Contacto</MenuItem>
                        <MenuItem component={Link} to={`/profile`}>Mi Perfil</MenuItem>
                    </MenuList>
                    <Button sx={{color: 'white'}} component={Link} to={`/login`} onClick={(e) => userDisconnect()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
        );
}