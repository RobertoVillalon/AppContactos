import {Avatar, Typography, Chip, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion'
import "../style.css"

export default function UserContactInformation({userInformation}){
    const [informationLoading, setInformationLoading] = useState(false);
    const [socialMediasList, setSocialMediasList] = useState([]);

    useEffect(() => {
        userInformation.length === 0 ? setInformationLoading(false) : setInformationLoading(true);
        if(userInformation.socialMedias) {
           setSocialMediasList(userInformation.socialMedias.split(",")) 
        }
        
    },[userInformation])

   return(
        <div id="userContactInformationContainer">
            {informationLoading ?
            <div id="userContactInformation">
                    <div id="PresentationContainer">
                        <div id="BasicInformation">
                            <div id="PersonalImage">
                                <Avatar sx={{height: 100, width: 100}} src={`http://localhost:8080/api/users/images/${userInformation.userID}/getProfileimg`} />
                            </div>
                            <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
                                <div id="PersonalInfo">
                                    <Typography variant="h5" color="black">{`${userInformation.username}`}</Typography>
                                    <Typography variant="h6" color="black">{`${userInformation.userCareer}`}</Typography>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                <div id="DescriptionContainer">
                    <div id="PersonalDescriptionBox">
                        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring" }}>
                            <Typography variant="h5" color="black">Descripcion Personal</Typography>
                            <Typography variant="body1" color="black">{`${userInformation.personalDescription}`}</Typography>
                        </motion.div>
                    </div>
                    <div id="ContactDescriptionBox">
                        <Typography variant="h5" color="black">Curriculum</Typography>
                        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring" }}>
                            <Chip label="Direccion" color="primary"/>
                            <Typography variant="body1" color="black">{`${userInformation.address}`}</Typography>
                        </motion.div>
                        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring" }}>
                            <Chip label="Email" color="primary"/> 
                            <Typography variant="body1" color="black">{`${userInformation.email}`}</Typography>
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
                                <Typography variant="body1" color="black">{`${userInformation.phone}`}</Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            :
            <h1>No hay informacion</h1>}
        </div>
   )
}