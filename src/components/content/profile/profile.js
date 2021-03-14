import React from 'react';
import UserPhoto from './userPhoto/userPhoto';
import FollowedUsers from './followedUsers/followedUsers';
import UserInfo from './user_info/user_info';
// 
import styles from './profile.module.scss';
// 
let { row, little_block, big_block, } = styles;
// 
let Profile = (props) => {
    let { profile, followUser, unFollowUser, updateUserPhoto, auth, sixRandomFriends, } = props;
    let { followedStatus, userInfo, } = profile;
    let { photos, userId } = userInfo;
    let myPage = userId === auth.id;

    return (
        <div className={row}>
            <div className={little_block}>
                <UserPhoto {...photos} followedStatus={followedStatus} myPage={myPage} userId={userId}
                    updateUserPhoto={updateUserPhoto} follow={followUser} unFollow={unFollowUser} />
                {myPage && <FollowedUsers friends={sixRandomFriends} />}
            </div>
            <div className={big_block}>
                <UserInfo {...profile} updateUserStatus={props.updateUserStatus} myPage={myPage} />
            </div>
        </div>
    )
}
export default Profile;
