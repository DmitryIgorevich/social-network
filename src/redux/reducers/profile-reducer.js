import { SubmissionError } from "redux-form";
import { ProfileApi, UserApi } from "../../api/restAPI";
import { getFriends } from "./users-reducer";

let initialState = {
    loading: true,
    userInfo: {},
    userStatus: null,
    followedStatus: null,
}
// 
let INIT_USER_INFO = './profile-reducer/INIT_USER_INFO';
let SET_LOADING_STATUS = './profile-reducer/SET_LOADING_STATUS';
let SET_USER_STATUS = './profile-reducer/SET_USER_STATUS';
let UPDATE_USER_INFO = './profile-reducer/UPDATE_USER_INFO';
let UPDATE_USER_PHOTO = './profile-reducer/UPDATE_USER_PHOTO';
let SET_FOLLOWED_STATUS = './profile-reducer/SET_FOLLOWED_STATUS';
// 
let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_USER_INFO: {
            return {
                ...state,
                userInfo: action.data,
            }
        }
        case SET_LOADING_STATUS: {
            return {
                ...state,
                loading: action.status,
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                userStatus: action.status,
            }
        }
        case UPDATE_USER_INFO: {
            return {
                ...state,
                userInfo: { ...action.data, photos: state.userInfo.photos },
            }
        }
        case UPDATE_USER_PHOTO: {
            return {
                ...state,
                userInfo: { ...state.userInfo, photos: action.data },
            }
        }
        case SET_FOLLOWED_STATUS: {
            return {
                ...state,
                followedStatus: action.status,
            }
        }
        default: {
            return state;
        }
    }
}
// AC
export let initUserInfo = (data) => ({ type: INIT_USER_INFO, data });
export let setLoadingStatus = (status) => ({ type: SET_LOADING_STATUS, status });
export let setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export let updatetUserInfo = (data) => ({ type: UPDATE_USER_INFO, data });
export let updatetUserPhoto = (data) => ({ type: UPDATE_USER_PHOTO, data });
export let setFollowedStatusAC = (status) => ({ type: SET_FOLLOWED_STATUS, status });
// THUNKS
export let initUserPage = (userId) => (dispatch) => {
    dispatch(setLoadingStatus(true));
    let info = dispatch(getUserInfo(userId));
    let status = dispatch(getUserStatus(userId));
    let followed = dispatch(getFollowedStatus(userId));

    Promise.all([info, status, followed]).then(() => {
        dispatch(setLoadingStatus(false));
    }).catch(() => {
        console.log('catch');
    });
}
export let getUserInfo = (userId) => async (dispatch) => {
    return await ProfileApi.getProfileInfo(userId)
        .then(res => {
            dispatch(initUserInfo(res.data));
            return res.data;
        }).catch(() => { throw new Error() });
}
export let getUserStatus = (userId) => async (dispatch) => {
    return await ProfileApi.getProfileStatus(userId).then(res => {
        dispatch(setUserStatus(res.data));
    }).catch(() => { throw new Error() });
}
export let updateUserStatus = (status) => async (dispatch) => {
    return await ProfileApi.updateStatus(status).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setUserStatus(status.status));
            return;
        }
        throw new Error(res.data.messages[0]);
    }).catch((error) => {
        if (error.message === 'Request failed with status code 404') {
            throw new SubmissionError({ _error: 'Произошла какая то ошибка' });
        }
        throw new SubmissionError({ 'status': error.message })
    });
}
export let updateProfileInfo = (data) => async (dispatch) => {
    return await ProfileApi.updateProfileInfo(data).then(res => {
        console.log(res);
        if (!res.data.resultCode) {
            dispatch(updatetUserInfo(data));
            return;
        }
        throw new Error(res.data.messages[0]);
    }).catch((error) => {
        throw new SubmissionError({ _error: error.message })
    });
}
export let updateUserPhoto = (data) => async (dispatch) => {
    return await ProfileApi.updatePhoto(data).then(res => {
        if (!res.data.resultCode) {
            dispatch(updatetUserPhoto(res.data.data.photos));
            return;
        }
        throw new Error(res.data.messages[0]);
    }).catch(error => {
        throw new SubmissionError({ _error: error.message });
    });
}
export let getFollowedStatus = (userID) => async (dispatch) => {
    return await UserApi.isFollowedUser(userID)
        .then(res => {
            dispatch(setFollowedStatusAC(res.data));
        })
        .catch(error => { })
}
// 
export default profileReducer;