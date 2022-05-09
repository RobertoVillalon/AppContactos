import React, { useEffect, useState } from 'react';
import {Avatar, Typography, Chip, Button, TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserInformation, updateUserImageProfile} from '../../../store/UserReducers';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function UserInformation({userInformation}){
    const [informationLoading, setInformationLoading] = useState(false);
    const [personalInformationEditableMode, setPersonalInformationEditableMode] = useState(false);
    const [personalInformationIsEdited, setPersonalInformationIsEdited] = useState(false);
    const [laboralInformationEditableMode, setLaboralInformationEditableMode] = useState(false);
    const [laboralInformationIsEdited, setLaboralInformationIsEdited] = useState(false);
    const [userImg, setUserImg] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        userInformation.length === 0 ? setInformationLoading(false) : setInformationLoading(true);
    },[userInformation])

    const handlePersonalInformation = () => {
        if(document.getElementById("fieldUsername").value.length > 0){
            userInformation.username = document.getElementById("fieldUsername").value;
            setPersonalInformationIsEdited(true);
        }

        if(document.getElementById("fieldUserCareer").value.length > 0){
            userInformation.userCareer = document.getElementById("fieldUserCareer").value;
            setPersonalInformationIsEdited(true);
        }

        if(personalInformationIsEdited){
          dispatch(updateUserInformation(userInformation));
          setPersonalInformationIsEdited(false);
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
            setLaboralInformationIsEdited(true);
        }
        if(document.getElementById("fieldUserAddress").value.length > 0){
            userInformation.address = document.getElementById("fieldUserAddress").value;
            setLaboralInformationIsEdited(true);
        }
        if(document.getElementById("fieldUserEmail").value.length > 0){
            userInformation.email = document.getElementById("fieldUserEmail").value;
            setLaboralInformationIsEdited(true);
        }
        if(document.getElementById("fieldUserSocialMedias").value.length > 0){
            userInformation.socialMedias = document.getElementById("fieldUserSocialMedias").value;
            setLaboralInformationIsEdited(true);
        }
        if(document.getElementById("fieldUserPhone").value.length > 0){
            userInformation.phone = document.getElementById("fieldUserPhone").value;
            setLaboralInformationIsEdited(true);
        }

        if(laboralInformationIsEdited){
            dispatch(updateUserInformation(userInformation));
            setLaboralInformationIsEdited(false);
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
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users:${userInformation.userID}/getProfileimg`} />
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
                            <Typography variant="body1" color="black">{`${userInformation.socialMedias}`}</Typography>
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
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users:${userInformation.userID}/getProfileimg`} />
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
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users:${userInformation.userID}/getProfileimg`} />
                            </div>
                            <div id="BasicInformation">
                                <Typography variant="h5" color="black">{`${userInformation.username}`}</Typography>
                                <Typography variant="h6" color="black">{`${userInformation.userCareer}`}</Typography>
                            </div>
                    </div>
                    <div id="DescriptionBox">
                        <div id="PersonalDescriptionBox">
                            <Typography variant="h5" color="black">Descripcion Personal</Typography>
                            <TextField id="fieldPersonalDescription" label="Descripcion Personal" variant="outlined" multiline={true} rows={8} />
                        </div>
                        <div id="ContactDescriptionBox">
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <Chip label="Direccion" color="primary" />
                            <TextField id="fieldUserAddress" label="Direccion" variant="outlined"/>
                            <Chip label="Email" color="primary"  />
                            <TextField fullWidth id="fieldUserEmail" label="Email" variant="outlined"/>
                            <Chip label="Redes Sociales" color="primary" />
                            <TextField fullWidth id="fieldUserSocialMedias" label="Social Medias" variant="outlined"/>
                            <Chip label="Telefono" color="primary"/>
                            <TextField fullWidth id="fieldUserPhone" label="Phone" variant="outlined"/>
                        </div>
                        <Button id="personalDescriptionButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Laboral</Button>
                    </div>
                </div>
            : <h1>No hay informacion</h1>
            }
        </div>
   )
}