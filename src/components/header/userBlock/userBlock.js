import styles from './userBlock.module.scss';
import React, { useState } from 'react';
import IMGuser from '../user.jpg';
import { Link } from 'react-router-dom';
import MenuUser from './menuUser/menuUser';

// 
let { profile_block, profile_name, avatar, wrap_profile, wrap_profile_btn, wrap_login } = styles;
// 
let UserBlock = (props) => {
    let { auth, logout } = props;
    let { login, isAuthed } = auth;
    let [userBlockVisible, toggleVisible] = useState(false);

    return (
        <div className={profile_block}>
            {isAuthed ?
                <div className={wrap_profile}>
                    <button className={wrap_profile_btn} onClick={() => toggleVisible(!userBlockVisible)}>
                        <div className={profile_name}>{login}</div>
                        <div className={avatar}>
                            <img src={auth.photo ? auth.photo : IMGuser} alt='' />
                        </div>
                    </button>
                    {userBlockVisible && <MenuUser logout={logout}
                        toggleVisible={toggleVisible} />}
                </div> :
                <div className={wrap_login}>
                    <Link to='/login'>Войти</Link>
                </div>
            }
        </div>
    )
}
export default UserBlock;