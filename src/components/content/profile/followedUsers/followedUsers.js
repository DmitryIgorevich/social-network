import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// 
import styles from './followedUsers.module.scss';
import User from './user/user';
// 
let { content, label_block, users } = styles;
// 
let FollowedUsers = (props) => {
    let { friends } = props;

    return (
        <div className={content}>
            <div className={label_block}><Link to='/users/followed'>Друзья</Link></div>
            <div className={users}>
                {friends.map(item => <User key={item.id} {...item} />)}
            </div>
        </div>
    )
}
export default FollowedUsers;