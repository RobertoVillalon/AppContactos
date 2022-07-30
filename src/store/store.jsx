import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import contactReducer from "./contactSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        contact: contactReducer
    }
});

export default store;