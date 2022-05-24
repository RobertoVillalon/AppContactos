import React, { useEffect, useState } from 'react';
import {Avatar, Typography, Chip, Button, TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserInformation, updateUserImageProfile} from '../../../store/UserReducers';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

export default function UserInformation({userInformation}){
    const [informationLoading, setInformationLoading] = useState(false);
    const [personalInformationEditableMode, setPersonalInformationEditableMode] = useState(false);
    let personalInformationIsEdited = false;
    const [laboralInformationEditableMode, setLaboralInformationEditableMode] = useState(false);
    let laboralInformationIsEdited = false;
    const [userImg, setUserImg] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        userInformation.length === 0 ? setInformationLoading(false) : setInformationLoading(true);
    },[userInformation])

    const handlePersonalInformation = async () => {
        if(document.getElementById("fieldUsername").value.length > 0){
            userInformation.username = document.getElementById("fieldUsername").value;
            personalInformationIsEdited = true;
        }

        if(document.getElementById("fieldUserCareer").value.length > 0){
            userInformation.userCareer = document.getElementById("fieldUserCareer").value;
            personalInformationIsEdited = true;
        }

        if(personalInformationIsEdited){
            dispatch(updateUserInformation(userInformation));
            personalInformationIsEdited = false;
        }
        
        if(userImg){
            let data = new FormData();
            data.append('file',userImg);
            dispatch(updateUserImageProfile(userInformation ,data));
            setInformationLoading(false);
        }

    }

    const handleLaboralInformation = () => {

        if(document.getElementById("fieldPersonalDescription").value.length > 0){
            userInformation.personalDescription = document.getElementById("fieldPersonalDescription").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserAddress").value.length > 0){
            userInformation.address = document.getElementById("fieldUserAddress").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserEmail").value.length > 0){
            userInformation.email = document.getElementById("fieldUserEmail").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserSocialMedias").value.length > 0){
            userInformation.socialMedias = document.getElementById("fieldUserSocialMedias").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserPhone").value.length > 0){
            userInformation.phone = document.getElementById("fieldUserPhone").value;
            laboralInformationIsEdited = true;
        }

        if(laboralInformationIsEdited){
            dispatch(updateUserInformation(userInformation));
            laboralInformationIsEdited = false;
        }
    }

    const handleChangeInformation = (e) => {

        switch(e.target.innerText){
            case "EDITAR INFORMACION PERSONAL":
                setPersonalInformationEditableMode(true) 
                e.target.innerText = "FINALIZAR EDICION PERSONAL"
                break;
            case "FINALIZAR EDICION PERSONAL":
                handlePersonalInformation();
                setPersonalInformationEditableMode(false)
                e.target.innerText = "EDITAR INFORMACION PERSONAL"
                break;
            case "EDITAR INFORMACION LABORAL":
                setLaboralInformationEditableMode(true)
                e.target.innerText = "FINALIZAR INFORMACION LABORAL"
                break;
            case "FINALIZAR INFORMACION LABORAL":
                handleLaboralInformation();
                setLaboralInformationEditableMode(false)
                e.target.innerText = "EDITAR INFORMACION LABORAL"
                break; 
            default: break;
        }
    }

    const handleChangeProfileImage = (e) => {
        setUserImg(e.target.files[0])
    }

   return(
        <div id="userContactInformationContainer">
            {informationLoading && !personalInformationEditableMode && !laboralInformationEditableMode ?
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${userInformation.userID}/getProfileimg`} />
                            </div>
                            <div id="BasicInformation">
                                <Typography variant="h5" color="black">{`${userInformation.username}`}</Typography>
                                <Typography variant="h6" color="black">{`${userInformation.userCareer}`}</Typography>
                            </div>
                        <Button id="personalInformationButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Personal</Button>
                    </div>
                    <div id="DescriptionBox">
                        <div id="PersonalDescriptionBox">
                            <Typography variant="h5" color="black">Descripcion Personal</Typography>
                            <Typography variant="body1" color="black">{`${userInformation.personalDescription}`}</Typography>
                        </div>
                        <div id="ContactDescriptionBox">
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <Chip label="Direccion" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.address}`}</Typography>
                            <Chip label="Email" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.email}`}</Typography>
                            <Chip label="Redes Sociales" color="primary"/>
                            <List id="socialMediasList" sx={{maxWidth: '20%', maxHeight: '5'}}>
                                <ListItem>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <AddAPhotoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <Chip label="Telefono" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.phone}`}</Typography>
                        </div>
                        <Button id="laboralDescriptionButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Laboral</Button>
                    </div>
                </div>
            :personalInformationEditableMode? 
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${userInformation.userID}/getProfileimg`} />
                                <label htmlFor="file-input">
                                    <AddAPhotoIcon id="changeImageIcon" color="primary"/>
                                </label>
                                <input id="file-input" type="file" name="image" onChange={(e) => handleChangeProfileImage(e)}></input>
                            </div>
                            <div id="BasicInformation">
                                <TextField id="fieldUsername" label="Nombre De Usuario" variant="outlined" />
                                <TextField id="fieldUserCareer" label="Puesto de Trabajo" variant="outlined" />
                            </div>
                            <Button id="personalInformationButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Finalizar Edicion Personal</Button>
                    </div>
                    <div id="DescriptionBox">
                        <div id="PersonalDescriptionBox">
                            <Typography variant="h5" color="black">Descripcion Personal</Typography>
                            <Typography variant="body1" color="black">{`${userInformation.personalDescription}`}</Typography>
                        </div>
                        <div id="ContactDescriptionBox">
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <Chip label="Direccion" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.address}`}</Typography>
                            <Chip label="Email" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.email}`}</Typography>
                            <Chip label="Redes Sociales" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.socialMedias}`}</Typography>
                            <Chip label="Telefono" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.phone}`}</Typography>
                        </div>
                    </div>
                </div>
            :laboralInformationEditableMode?
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${userInformation.userID}/getProfileimg`} />
                            </div>
                            <div id="BasicInformation">
                                <Typography variant="h5" color="black">{`${userInformation.username}`}</Typography>
                                <Typography variant="h6" color="black">{`${userInformation.userCareer}`}</Typography>
                            </div>
                    </div>
                    <div id="DescriptionBox">
                        <div id="PersonalDescriptionBox">
                            <Typography variant="h5" color="black">Descripcion Personal</Typography>
                            <TextField className="textFieldEdit" id="fieldPersonalDescription" variant="filled" multiline={true} rows={8} />
                        </div>
                        <div id="ContactDescriptionBox">
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <Chip label="Direccion" color="primary" />
                            <TextField className="textFieldEdit" id="fieldUserAddress"variant="filled"/>
                            <Chip label="Email" color="primary"  />
                            <TextField className="textFieldEdit" fullWidth id="fieldUserEmail" variant="filled"/>
                            <Chip label="Redes Sociales" color="primary" />
                            <TextField className="textFieldEdit" fullWidth id="fieldUserSocialMedias" variant="filled"/>
                            <Chip label="Telefono" color="primary"/>
                            <TextField className="textFieldEdit" fullWidth id="fieldUserPhone" variant="filled"/>
                        </div>
                        <Button id="personalDescriptionButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Laboral</Button>
                    </div>
                </div>
            : <h1>No hay informacion</h1>
            }
        </div>
   )
}