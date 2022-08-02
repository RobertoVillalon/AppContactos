import React from 'react';
import "../style.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { insertContactAction } from "../../../store/contactSlice"

export default function ContactResult({results, userID}){
    const dispatch = useDispatch();
    const addContact = (idContact) => {
        dispatch(insertContactAction({idContact, userID}))

    };
    
    if(!results || results.length === 0){
        return(
            <Container id="containerSearchError">
                <h1>No existen usuarios</h1>
            </Container>
        )
        }else{
            return (
                <div id="containerSearchResults">
                    {results.map((element) => (
                        <Card key={`${element.userID}`} id={`cardProfile-${element.userID}`} className="card">
                            <CardMedia component="img" height="200" image={`http://localhost:8080/api/users/images/${element.userID}/getProfileimg`} alt="La Imagen no esta Disponible"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {element.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {element.email}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" onClick={() => addContact(element.userID)}>Agregar Contacto</Button>
                            </CardActions>
                        </Card>
                        ))
                    }
                </div>
            )
        }
}