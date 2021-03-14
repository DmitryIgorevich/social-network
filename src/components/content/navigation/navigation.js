import React from 'react';
import { NavLink } from 'react-router-dom';
// 
import styles from './navigation.module.scss';
// 
let { navigation, navigation_list } = styles;
// 
let Navigation = (props) => {
    return (
        <div className={navigation}>
            <ul className={navigation_list}>
                <li><NavLink className='hover_btn' to='/profile'>Моя страница</NavLink></li>
                <li><NavLink className='hover_btn' to='/dialogs'>Диалоги</NavLink></li>
                <li><NavLink className='hover_btn' to='/users'>Все пользователи</NavLink></li>
            </ul>
        </div>
    )
}
export default Navigation;