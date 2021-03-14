import { createSelector } from 'reselect';
import { getRandomInt } from '../helpers/helpFunctions';

export let getUsersInfoS = (state) => {
    return state.users;
}
export let getFriendsS = (state) => {
    return state.users.usersFollowed;
}
export let getSixRandomFriendsS = createSelector(getFriendsS, (friends) => {
    if (friends.length < 6) return friends;

    let getDifferentFriends = (array) => {
        let arr = [...new Set(array)];
        if (arr.length < 6) {
            arr.push(getRandomInt(0, friends.length));
            return getDifferentFriends(arr);
        }
        return arr.map(item => friends[item]);

    }
    return getDifferentFriends();
});