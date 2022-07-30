import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from 'axios';

const initialState = {
    searchContact: {
        status: 'pending',
        foundContacts: []
    },
    userContacts: {
        status: 'pending',
        contacts: []
    },
    insertContact : {
        status: 'pending'
    }
}

//Reducer

const contactSlice = createSlice({
    name: 'contact',
    initialState,

    extraReducers: builder => {
        builder
            //Search Contacts Actions
            .addCase(searchContactAction.pending, (state, action) => {
                state.searchContact.status = 'pending'
            })
            .addCase(searchContactAction.fulfilled, (state, action) => {
                state.searchContact.status = 'received'
                state.searchContact.foundContacts = action.payload;
            })
            .addCase(searchContactAction.rejected, (state, action) => {
                state.searchContact.status = 'rejected'
            })

            //Get Contacts Actions
            .addCase(getContactAction.pending, (state, action) => {
                state.userContacts.status  = 'pending'
            })
            .addCase(getContactAction.fulfilled, (state, action) => {
                state.userContacts.status = 'received'
                state.userContacts.contacts = action.payload;
            })
            .addCase(getContactAction.rejected, (state, action) => {
                state.userContacts.status  = 'rejected'
            })

            //Insert Contacts Actions
            .addCase(insertContactAction.pending, (state, action) => {
                state.insertContact.status  = 'pending'
            })
            .addCase(insertContactAction.fulfilled, (state, action) => {
                state.insertContact.status = 'received'
            })
            .addCase(insertContactAction.rejected, (state, action) => {
                state.insertContact.status  = 'rejected'
            })
    }
})

//Functions

export const searchContactAction = createAsyncThunk('contact/searchContacts', async (texto) => {
        return client.get(`http://localhost:8080/api/search:${texto}`, {
            headers: {"Authorization" : 'Bearer '+ document.cookie.substring(5)}
        }).then((response) => response.data);
})

export const getContactAction = createAsyncThunk('contact/getContact', async (id) => {

        return client.get(`http://localhost:8080/api/${id}/contactos`, {
            headers: {"Authorization" : 'Bearer '+ document.cookie.substring(5)}
        }).then((response) => response.data);

})

export const insertContactAction = createAsyncThunk('contact/insertContact', async (ids) => {
    
    console.log(ids)

    return client.post(`http://localhost:8080/api/${ids.userID}/agregarContacto`, ids.idContact, {
        headers: {"Authorization" : 'Bearer '+ document.cookie.substring(5)}
    }).then((response) => response.data);
})

export const { contactActions } = contactSlice.actions;

export default contactSlice.reducer;