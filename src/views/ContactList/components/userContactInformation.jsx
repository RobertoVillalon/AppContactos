import {Avatar, Typography, Chip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import "../style.css"

export default function UserContactInformation({userInformation}){
    const [informationLoading, setInformationLoading] = useState(false);
    const [socialMedias, setSocialMedias] = useState([]);

    useEffect(() => {
        if(userInformation.length === 0){
            setInformationLoading(false)
        }else{
            setInformationLoading(true);
            informationLoading.socialMedias && setSocialMedias(informationLoading.socialMedias.split([";"]));
            getIconSocialMedias();
        }
    },[userInformation])

    const getIconSocialMedias = () => {
        
    }

   return(
        <div id="userContactInformationContainer">
            {informationLoading ?
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
            :
            <h1>No hay informacion</h1>}
        </div>
   )
}