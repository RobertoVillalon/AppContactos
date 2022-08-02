import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Skeleton, Avatar } from '@mui/material';
import { motion } from 'framer-motion'
import "../style.css";

export default function InformationContactList({isLoading, getContactData, userListInformation}) {
  
  const getUser = (contact) => {
    getContactData(contact);
  }

  return (
    <List id="contactList">
      {isLoading ? 
        userListInformation.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user}`;
          return (
            <motion.div initial={{scale: .1}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring" }}>
              <ListItem onClick={() => getUser(user)} className="contactItemList" key={user.userID}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°`} src={`http://localhost:8080/api/users/images/${user.userID}/getProfileimg`} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${user.username}`} />
                </ListItemButton>
              </ListItem>
            </motion.div>

          );
        })
        :
        [1,2,3].map((value) => {
          return(
          <ListItem key={value} className="contactItemList" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
          );
        })
    }
    </List>
  );
}
