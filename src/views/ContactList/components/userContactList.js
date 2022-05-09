import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Skeleton, Avatar } from '@mui/material';
import "../style.css";

export default function InformationContactList({isLoading, getContactData, userListInformation}) {

  const getUser = (contact) => {
    getContactData(contact);
  }

  return (
    <List id="contactList">
      {isLoading ? 
        userListInformation.map((element) => {
          const labelId = `checkbox-list-secondary-label-${element}`;
          return (
            <ListItem onClick={() => getUser(element)} className="contactItemList" key={element.userID} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°`} src={`http://localhost:8080/api/users:${element.userID}/getProfileimg`} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${element.username}`} />
              </ListItemButton>
            </ListItem>
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
