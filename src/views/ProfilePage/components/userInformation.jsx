import React, { useEffect, useState} from 'react';
import {Avatar, Typography, Chip, Button, TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserInformation, updateUserImageProfile, updateUserStateInformation} from '../../../store/userSlice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShareIcon from '@mui/icons-material/Share';
import { List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { motion } from 'framer-motion';

export default function UserInformation({user}){
    const [informationLoading, setInformationLoading] = useState(false);
    const [personalInformationEditableMode, setPersonalInformationEditableMode] = useState(false);
    let personalInformationIsEdited = false;
    const [laboralInformationEditableMode, setLaboralInformationEditableMode] = useState(false);
    let laboralInformationIsEdited = false;
    const [socialMediasList, setSocialMediasList] = useState([]);
    const [userImg, setUserImg] = useState(undefined);
    const dispatch = useDispatch();
    let userInfo = Object.assign({}, user);

    useEffect(() => {
        user.length === 0 ? setInformationLoading(false) : setInformationLoading(true);
        if(user.socialMedias) {
           setSocialMediasList(user.socialMedias.split(",")) 
        }
        
    },[user])

    const handlePersonalInformation = async () => {
        if(document.getElementById("fieldUsername").value.length > 0){
            userInfo.username = document.getElementById("fieldUsername").value;
            personalInformationIsEdited = true;
        }

        if(document.getElementById("fieldUserCareer").value.length > 0){
            userInfo.userCareer = document.getElementById("fieldUserCareer").value;
            personalInformationIsEdited = true;
        }

        if(personalInformationIsEdited){
            dispatch(updateUserStateInformation(userInfo));
            dispatch(updateUserInformation(userInfo));
            personalInformationIsEdited = false;
        }
        
        if(userImg){
            let data = new FormData();
            data.append('file',userImg);
            dispatch(updateUserImageProfile({userInfo, data}));
            setInformationLoading(false);
        }

    }

    const handleLaboralInformation = () => {

        if(document.getElementById("fieldPersonalDescription").value.length > 0){
            userInfo.personalDescription = document.getElementById("fieldPersonalDescription").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserAddress").value.length > 0){
            userInfo.address = document.getElementById("fieldUserAddress").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserEmail").value.length > 0){
            userInfo.email = document.getElementById("fieldUserEmail").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserSocialMedias").value.length > 0){
            userInfo.socialMedias = document.getElementById("fieldUserSocialMedias").value;
            laboralInformationIsEdited = true;
        }
        if(document.getElementById("fieldUserPhone").value.length > 0){
            userInfo.phone = document.getElementById("fieldUserPhone").value;
            laboralInformationIsEdited = true;
        }

        if(laboralInformationIsEdited){
            dispatch(updateUserStateInformation(userInfo));
            dispatch(updateUserInformation(userInfo));
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
        e.preventDefault();
        setUserImg(e.target.files[0])
    }

   return(
        <div id="userContactInformationContainer">
            {informationLoading && user && !personalInformationEditableMode && !laboralInformationEditableMode ?
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                        <div id="BasicInformation">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${user.userID}/getProfileimg`} />
                            </div>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <div id="PersonalInfo">
                                    <Typography variant="h5" color="black">{`${user.username}`}</Typography>
                                    <Typography variant="h6" color="black">{`${user.userCareer}`}</Typography>
                                </div>
                            </motion.div>
                        </div>
                        <Button id="personalInformationButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Personal</Button>
                    </div>
                    <div id="DescriptionContainer">
                        <div id="PersonalDescriptionBox">
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Typography variant="h5" color="black">Descripcion Personal</Typography>
                                <Typography variant="body1" color="black">{`${user.personalDescription}`}</Typography>
                            </motion.div>
                        </div>
                        <div id="ContactDescriptionBox">                            
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Direccion" color="primary"/>
                                <Typography variant="body1" color="black">{`${user.address}`}</Typography>
                            </motion.div>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Email" color="primary"/> 
                                <Typography variant="body1" color="black">{`${user.email}`}</Typography>
                                <Chip label="Redes Sociales" color="primary"/>
                            </motion.div>
                            <motion.ul initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <List id="socialMediasList" sx={{maxWidth: '20%', maxHeight: '5'}}>
                                    {[...socialMediasList].map((socialMedias, index) => {
                                        return(
                                            <ListItem key={`socialMediasListItem-${index}`} button component="a" href={`https://${socialMedias}`}>
                                                <ListItemIcon>
                                                    <ShareIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`${socialMedias}`} />
                                            </ListItem>
                                        )
                                    })
                                }
                                </List>
                            </motion.ul>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Telefono" color="primary"/>
                                <Typography variant="body1" color="black">{`${user.phone}`}</Typography>
                            </motion.div>
                        </div>
                        <Button id="laboralDescriptionButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Editar Informacion Laboral</Button>
                    </div>
                </div>
            :personalInformationEditableMode? 
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                        <div id="BasicInformation">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${user.userID}/getProfileimg`} />
                                <label htmlFor="file-input">
                                    <AddAPhotoIcon id="changeImageIcon" color="primary"/>
                                </label>
                                <input id="file-input" type="file" name="image" onChange={(e) => handleChangeProfileImage(e)}></input>
                            </div>
                            <div id="PersonalInfo">
                                <TextField id="fieldUsername" label="Nombre De Usuario" variant="outlined" />
                                <TextField id="fieldUserCareer" label="Puesto de Trabajo" variant="outlined" />
                            </div>
                        </div>
                        <Button id="personalInformationButton" onClick={(e) => handleChangeInformation(e)} variant="outlined">Finalizar Edicion Personal</Button>
                    </div>
                    <div id="DescriptionContainer">
                        <div id="PersonalDescriptionBox">
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Typography variant="h5" color="black">Descripcion Personal</Typography>
                                <Typography variant="body1" color="black">{`${user.personalDescription}`}</Typography>
                            </motion.div>
                        </div>
                        <div id="ContactDescriptionBox">                            
                            <Typography variant="h5" color="black">Curriculum</Typography>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Direccion" color="primary"/>
                                <Typography variant="body1" color="black">{`${user.address}`}</Typography>
                            </motion.div>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Email" color="primary"/> 
                                <Typography variant="body1" color="black">{`${user.email}`}</Typography>
                                <Chip label="Redes Sociales" color="primary"/>
                            </motion.div>
                            <motion.ul initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <List id="socialMediasList" sx={{maxWidth: '20%', maxHeight: '5'}}>
                                    {[...socialMediasList].map((socialMedias, index) => {
                                        return(
                                            <ListItem key={`socialMediasListItem-${index}`} button component="a" href={`https://${socialMedias}`}>
                                                <ListItemIcon>
                                                    <ShareIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`${socialMedias}`} />
                                            </ListItem>
                                        )
                                    })
                                }
                                </List>
                            </motion.ul>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <Chip label="Telefono" color="primary"/>
                                <Typography variant="body1" color="black">{`${user.phone}`}</Typography>
                            </motion.div>
                        </div>
                    </div>
                </div>
            :laboralInformationEditableMode?
                <div id="userContactInformation">
                    <div id="PresentationContainer">
                        <div id="BasicInformation">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${user.userID}/getProfileimg`} />
                            </div>
                            <div id="PersonalInfo">
                                <Typography variant="h5" color="black">{`${user.username}`}</Typography>
                                <Typography variant="h6" color="black">{`${user.userCareer}`}</Typography>
                            </div>
                        </div>
                    </div>
                    <div id="DescriptionContainer">
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
                            <TextField className="textFieldEdit" placeholder="Escriba las redes separadas por una coma, sin espacios" fullWidth id="fieldUserSocialMedias" variant="filled"/>
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

