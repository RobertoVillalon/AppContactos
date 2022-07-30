import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from 'axios';

const initialState = {
    initSessionStatus: 'pending',
    userRegisterStatus : 'pending',
    userUpdatedStatus: 'pending',
    userImageUpdatedStatus: 'pending',
    infoUser: []
}

//Reducer
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        updateUserStateInformation: (state, infoUser) => {
            state.infoUser = infoUser.payload;
        },
        disconnectUserAction: (state) => {
            state = initialState
        }
    },
    extraReducers: builder => {
        builder
            //init session case
            .addCase(getUserAction.pending, (state, action) => {
                state.initSessionStatus = 'pending'
            })
            .addCase(getUserAction.fulfilled, (state, action) => {
                state.initSessionStatus = 'received'
                state.infoUser = action.payload;
            })
            .addCase(getUserAction.rejected, (state, action) => {
                state.initSessionStatus = 'rejected'
            })

            //Register user case
            .addCase(registerUserAction.pending, (state, action) => {
                state.userRegisterStatus = 'pending'
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.userRegisterStatus = 'received'
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.userRegisterStatus = 'rejected'
            })

            //Updated user case
            .addCase(updateUserInformation.pending, (state, action) => {
                state.userUpdatedStatus = 'pending'
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.userUpdatedStatus = 'received'
            })
            .addCase(updateUserInformation.rejected, (state, action) => {
                state.userUpdatedStatus = 'rejected'
            })

            //Updated user case
            .addCase(updateUserImageProfile.pending, (state, action) => {
                state.userImageUpdatedStatus = 'pending'
            })
            .addCase(updateUserImageProfile.fulfilled, (state, action) => {
                state.userImageUpdatedStatus = 'received'
            })
            .addCase(updateUserImageProfile.rejected, (state, action) => {
                state.userImageUpdatedStatus = 'rejected'
            })
    }
})

//Functions

export const getUserAction = createAsyncThunk('user/getUser', async (user) => {

    return client.post(`http://localhost:8080/api/login`, user).then((response) => {
        document.cookie = "jwt: "+response.data.auth;
        return response.data.user
    });
});

export const registerUserAction = createAsyncThunk('user/registerUser', async (user) => {

    console.log(user);

    return client.post(`http://localhost:8080/api/register`, user).then((response) => response.data);
});

export const updateUserInformation = createAsyncThunk('user/updateUser', async (user) => {

    return client.put(`http://localhost:8080/api/users/${user.userID}/update`, user, {
        headers: {"Authorization" : 'Bearer '+ document.cookie.substring(5)}
    }).then((response) => console.log(response.data));
});

export const updateUserImageProfile = createAsyncThunk('user/updateUserImage', async (info) => {

        return client.post(`http://localhost:8080/api/users/images/${info.userInfo.userID}/setProfileImage`, info.data ,{
            headers: {"Content-type": "multipart/form-data","Authorization":'Bearer '+ document.cookie.substring(5)}                    
        }).then((response) => console.log(response.data));
});

export const {updateUserStateInformation,disconnectUserAction, userActions } = userSlice.actions;

export default userSlice.reducer;