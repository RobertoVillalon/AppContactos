import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from "./UserReducers";
import contactReducer from "./ContactReducer"

const rootReducer = combineReducers({
    usuario: userReducer,
    contact: contactReducer
});

export default createStore(rootReducer, compose(applyMiddleware(thunk)));