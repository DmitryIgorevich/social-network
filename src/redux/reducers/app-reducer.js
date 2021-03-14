import { getLoginnedUser } from "./auth-reducer";
import { getFriends } from './users-reducer';

let initialState = {
    loading: true,
}
// 
let SET_LOADING_STATUS = './app-reducer/SET_LOADING_STATUS';
// 
let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS: {
            return {
                ...state,
                loading: action.status,
            }
        }
        default: {
            return state;
        }
    }
}
export default appReducer;
// AC
export let setLoadingStatus = (status) => ({ type: SET_LOADING_STATUS, status });
// THUNKS
export let initializeApplication = () => async (dispatch) => {
    let login = dispatch(getLoginnedUser());

    return Promise.all([login])
        .then(res => {
            dispatch(setLoadingStatus(false));
        });
}