import React from 'react';
import { Link } from 'react-router-dom';
// 
import styles from './user.module.scss';
import IMGUser from '../../../../header/user.jpg';
// 
let { user, inner, user_photo, user_name } = styles;
// 
let User = (props) => {
    let { name, photos, id } = props;

    return (
        <div className={user}>
            <div className={inner}>
                <Link to={`/profile/${id}`}>
                    <div className={user_photo}>
                        <img src={photos.small || IMGUser} alt='' />
                    </div>
                    <div className={user_name}>{name}</div>
                </Link>
            </div>
        </div>
    )
}
export default User;