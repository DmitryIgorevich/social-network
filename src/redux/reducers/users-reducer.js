import { UserApi } from "../../api/restAPI";
import { setFollowedStatusAC } from "./profile-reducer";
// 
let initialState = {
    loading: true,
    loadingOnAddingUsers: false,
    users: [],
    totalUsersCount: null,
    currentPage: 1,
    countUserInPage: 10,
    termAll: '',
    // 
    usersFollowed: [],
    currentPageFollowed: 1,
    countUserInPageFollowed: 10,
    totalUsersCountFollowed: null,
    termFollowed: '',
    loadingSearchTerm: false,
}
// 
let SET_LOADING_STATUS = './users-reducer/SET_LOADING_STATUS';
let SET_LOADING_STATUS_ON_ADD_USERS = './users-reducer/SET_LOADING_STATUS_ON_ADD_USERS';
let SET_TOTAL_USERS = './users-reducer/SET_TOTAL_USERS';
let TOGGLE_FOLLOWED = './users-reducer/TOGGLE_FOLLOWED';
let ADD_USERS = './users-reducer/ADD_USERS';
let SET_NEW_USERS = './users-reducer/SET_NEW_USERS';
let SET_TERM_ALL = './users-reducer/SET_TERM_ALL';
let SET_CURRENT_PAGE = './users-reducer/SET_CURRENT_PAGE';

let SET_TOTAL_USERS_FOLLOWED = './users-reducer/SET_TOTAL_USERS_FOLLOWED';
let ADD_USERS_FOLLOWED = './users-reducer/ADD_USERS_FOLLOWED';
let SET_FOLLOW_STATUS_FOLLOWED = './users-reducer/SET_FOLLOW_STATUS_FOLLOWED';
let REMOVE_UNFOLLOWED_FROM_FOLLOWED_LIST = './users-reducer/REMOVE_UNFOLLOWED_FROM_FOLLOWED_LIST';
let SET_NEW_USERS_FOLLOWED = './users-reducer/SET_NEW_USERS_FOLLOWED';
let SET_CURRENT_PAGE_FOLLOWED = './users-reducer/SET_CURRENT_PAGE_FOLLOWED';
let SET_TERM_FOLLOWED = './users-reducer/SET_TERM_FOLLOWED';
let SET_LOADING_SEARCH_TERM = './users-reducer/SET_LOADING_SEARCH_TERM';
// 
let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS: {
            return {
                ...state,
                loading: action.status,
            }
        }
        case SET_TOTAL_USERS: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
        }
        case TOGGLE_FOLLOWED: {
            let index = state.users.findIndex(item => item.id === action.userID);
            if (index === -1) return state;
            let newUser = { ...state.users[index], followed: !state.users[index].followed };
            return {
                ...state,
                users: [...state.users.slice(0, index), newUser, ...state.users.slice(index + 1)],
            }
        }
        case ADD_USERS: {
            if (!state.users.length) return {
                ...state,
                users: action.users,
            }
            if (!action.users.length) return state;

            // есть ли новые элементы в старом массиве или нет
            let hasNewUsers = false;
            let newUsers = state.users;
            action.users.forEach(item => {
                let index = state.users.findIndex(user => user.id === item.id);
                if (index === -1) {
                    newUsers = [...newUsers, item];
                    hasNewUsers = true;
                }
            })
            if (hasNewUsers) {
                newUsers.sort((a, b) => b.id - a.id);
                return { ...state, users: newUsers };
            }

            return state;
        }
        case SET_NEW_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }
        case SET_LOADING_STATUS_ON_ADD_USERS: {
            return {
                ...state,
                loadingOnAddingUsers: action.status,
            }
        }
        case SET_TERM_ALL: {
            return {
                ...state,
                termAll: action.term,
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload,
            }
        }
        // 
        case SET_TOTAL_USERS_FOLLOWED: {
            return {
                ...state,
                totalUsersCountFollowed: action.total,
            }
        }
        case ADD_USERS_FOLLOWED: {
            if (!state.usersFollowed.length) {
                return {
                    ...state,
                    usersFollowed: action.users,
                }
            }
            if (!action.users.length) return state;

            // фильтрация новых элементов. есть ли они в старом state и нужно ли его обновлять
            let hasNewUsers = false;
            let newUsers = state.usersFollowed;
            action.users.forEach(item => {
                let index = state.usersFollowed.findIndex(user => user.id === item.id);
                if (index === -1) {
                    newUsers = [...newUsers, item];
                    hasNewUsers = true;
                }
            })
            if (hasNewUsers) {
                newUsers.sort((a, b) => b.id - a.id);
                return { ...state, usersFollowed: newUsers };
            }

            return state;
        }
        case SET_FOLLOW_STATUS_FOLLOWED: {
            let index = state.usersFollowed.findIndex(item => item.id === action.userId);
            if (index === -1) return {
                ...state, currentPageFollowed: 1
            };
            let newItem = { ...state.usersFollowed[index], followed: !state.usersFollowed[index].followed };
            return {
                ...state,
                usersFollowed: [...state.usersFollowed.slice(0, index), newItem,
                ...state.usersFollowed.slice(index + 1)],
            }
        }
        case REMOVE_UNFOLLOWED_FROM_FOLLOWED_LIST: {
            let newList = state.usersFollowed.filter(item => item.followed);
            return {
                ...state,
                usersFollowed: newList,
            }
        }
        case SET_NEW_USERS_FOLLOWED: {
            return {
                ...state,
                usersFollowed: action.users,
            }
        }
        case SET_CURRENT_PAGE_FOLLOWED: {
            return {
                ...state,
                currentPageFollowed: action.payload,
            }
        }
        case SET_TERM_FOLLOWED: {
            return {
                ...state,
                termFollowed: action.term,
            }
        }
        case SET_LOADING_SEARCH_TERM: {
            return {
                ...state,
                loadingSearchTerm: action.status,
            }
        }

        default: {
            return state;
        }
    }
}
export default usersReducer;
/*ACTIONS C */
export let setLoading = (status) => ({ type: SET_LOADING_STATUS, status });
export let setLoadingOnAddUsers = (status) => ({ type: SET_LOADING_STATUS_ON_ADD_USERS, status });

// allUsers
export let setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS, totalUsersCount });
export let toggleFollowed = (userID) => ({ type: TOGGLE_FOLLOWED, userID });
export let addUsers = (users) => ({ type: ADD_USERS, users });
export let setNewUsers = (users) => ({ type: SET_NEW_USERS, users });
export let setTermAllAC = (term) => ({ type: SET_TERM_ALL, term });
export let setCurrentPage = (payload) => ({ type: SET_CURRENT_PAGE, payload });

export let setTotalUsersCountFollowedAC = (total) => ({ type: SET_TOTAL_USERS_FOLLOWED, total });
export let addUsersFollowedAC = (users) => ({ type: ADD_USERS_FOLLOWED, users });
export let toggleFollowedInFollowedAC = (userId) => ({ type: SET_FOLLOW_STATUS_FOLLOWED, userId });
export let removeUnfollowedFromFollowedAC = () => ({ type: REMOVE_UNFOLLOWED_FROM_FOLLOWED_LIST });
export let setNewUsersFollowedAC = (users) => ({ type: SET_NEW_USERS_FOLLOWED, users });
export let setCurrentPageFollowedAC = (payload) => ({ type: SET_CURRENT_PAGE_FOLLOWED, payload });
export let setTermFollowedAC = (term) => ({ type: SET_TERM_FOLLOWED, term });
export let setLoadingSearchTermAC = (status) => ({ type: SET_LOADING_SEARCH_TERM, status });
// THUNKS
export let followUser = (userId) => (dispatch) => {
    return UserApi.followUser(userId).then(res => {
        if (!res.data.resultCode) {
            dispatch(toggleFollowedInFollowedAC(userId));
            dispatch(toggleFollowed(userId));
            dispatch(setFollowedStatusAC(true));
        }
    });
}
export let unFollowUser = (userId) => (dispatch) => {
    return UserApi.unFollowUser(userId).then(res => {
        if (!res.data.resultCode) {
            dispatch(toggleFollowedInFollowedAC(userId));
            dispatch(toggleFollowed(userId));
            dispatch(setFollowedStatusAC(false));
        }
    });
}

export let getAllUsers = (page = initialState.currentPage, usersCount = initialState.countUserInPage, term = '') => (dispatch) => {
    dispatch(setLoadingSearchTermAC(true));
    page === 1 && dispatch(setLoading(true));
    return UserApi.getAllUsers(page, usersCount, term)
        .then(res => {
            if (!res.data.error) {
                if (page === 1) {
                    dispatch(setNewUsers(res.data.items));
                    dispatch(setTotalUsersCount(res.data.totalCount));
                } else {
                    dispatch(addUsers(res.data.items));
                }
                if (!res.data.items.length) {
                    dispatch(setCurrentPage(page - 1));
                }
            }
        })
        .finally(() => {
            dispatch(setLoadingSearchTermAC(false));
            page === 1 && dispatch(setLoading(false));
        })
}

export let getFriends = (page = initialState.currentPageFollowed, usersCount = initialState.countUserInPageFollowed, term = '') => (dispatch) => {
    page === 1 && dispatch(setLoading(true));
    dispatch(setLoadingSearchTermAC(true));
    return UserApi.getFollowedUsers(page, usersCount, term)
        .then(res => {
            if (!res.data.error) {
                if (!res.data.items.length) {
                    dispatch(setCurrentPageFollowedAC(page - 1));
                }
                if (page === 1) {
                    dispatch(setTotalUsersCountFollowedAC(res.data.totalCount));
                    dispatch(setNewUsersFollowedAC(res.data.items));
                } else {
                    dispatch(addUsersFollowedAC(res.data.items));
                }
            }
        })
        .catch(error => console.dir(error))
        .finally(() => {
            dispatch(setLoadingSearchTermAC(false));
            page === 1 && dispatch(setLoading(false));
        })
}
