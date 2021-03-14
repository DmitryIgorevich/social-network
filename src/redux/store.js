import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import appReducer from './reducers/app-reducer';
import authReducer from './reducers/auth-reducer';
import profileReducer from './reducers/profile-reducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './reducers/users-reducer';
// 
let reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    app: appReducer,
    users: usersReducer,
    form: formReducer,
})
let store = createStore(reducers, applyMiddleware(reduxThunkMiddleware));
export default store;