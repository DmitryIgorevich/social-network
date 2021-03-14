import { SubmissionError } from "redux-form";
import { AuthApi } from "../../api/restAPI";
import { getUserInfo } from './profile-reducer';
import { getFriends } from "./users-reducer";

let initialState = {
    email: null,
    login: null,
    id: null,
    photo: null,
    isAuthed: false,
    loading: false,
    captcha: null,
}
// 
let SET_AUTH_INFO = './auth-reducer/SET_AUTH_INFO';
let SET_CAPTCHA = './auth-reducer/SET_CAPTCHA';
let SET_LOADING_STATUS = './auth-reducer/SET_LOADING_STATUS';
let NULL_AUTH_INFO = './auth-reducer/NULL_AUTH_INFO';
let SET_PHOTO_USER = './auth-reducer/SET_PHOTO_USER';
// 
let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_INFO: {
            return {
                ...state,
                ...action.data,
                isAuthed: true,
            }
        }
        case SET_LOADING_STATUS: {
            return {
                ...state,
                loading: action.status,
            }
        }
        case NULL_AUTH_INFO: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_PHOTO_USER: {
            return {
                ...state,
                photo: action.photo,
            }
        }
        case SET_CAPTCHA: {
            return {
                ...state,
                captcha: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default authReducer;
// AC
export let setAuthInfo = (data) => ({ type: SET_AUTH_INFO, data });
export let setLoadingStatus = (status) => ({ type: SET_LOADING_STATUS, status });
export let nullAuthInfo = (data) => ({ type: NULL_AUTH_INFO, data });
export let setPhotoUser = (photo) => ({ type: SET_PHOTO_USER, photo });
export let setCaptchaAC = (payload) => ({ type: SET_CAPTCHA, payload });
// THUNKS
export let getLoginnedUser = () => async (dispatch) => {
    let res = await AuthApi.getAuthStatus();
    if (!res.data.resultCode) {
        return await dispatch(getUserInfo(res.data.data.id))
            .then(data => {
                dispatch(setAuthInfo(res.data.data))
                dispatch(setPhotoUser(data?.photos?.small))
                dispatch(getFriends())
            })
            .catch(error => { })
    }
}
export let login = (formdata) => async (dispatch) => {
    return await AuthApi.logIn(formdata)
        .then(res => {
            if (!res.data.resultCode) {
                dispatch(getLoginnedUser());
            }
            if (res.data.resultCode === 10) {
                dispatch(getCaptcha());
                let errors = {};
                res.data.fieldsErrors.forEach(item => {
                    errors[`${item.field}`] = item.error;
                });
                throw new SubmissionError(errors);
            } else {
                throw new SubmissionError({
                    'email': res.data.messages[0],
                    'password': res.data.messages[0]
                });
            }
        })
        .catch((error) => {
            throw new SubmissionError(error.errors);
        });
}
export let logout = () => (dispatch) => {
    AuthApi.logOut().then(res => {
        if (!res.data.resultCode) {
            dispatch(nullAuthInfo(initialState));
        }
    });
}
export let getCaptcha = () => async (dispatch) => {
    return await AuthApi.getCaptcha()
        .then(res => {
            dispatch(setCaptchaAC(res.data.url));
        });
}