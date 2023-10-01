import { combineReducers } from 'redux'; //combineReducers expects at least one reducer

import userReducer from './User/user.reducer';

export default combineReducers(
    {
        user: userReducer
    }
)