import styles from './menuUser.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// 
let { wrap_user_settings, active, user_settings_list, user_list_item, list_item, } = styles;
// 
let MenuUser = (props) => {
    let { toggleVisible, logout } = props;
    let RefWrap = useRef(null);
    let [classBuble, setclassBuble] = useState(wrap_user_settings);
    let [timer, settimer] = useState(wrap_user_settings);

    useEffect(() => {
        let timerid = setTimeout(() => {
            setclassBuble(`${wrap_user_settings} ${active}`);
        }, 10);
        settimer(timerid);
        document.addEventListener('click', oncloseBlockClickedNotThis);

        return () => {
            document.removeEventListener('click', oncloseBlockClickedNotThis);
            clearTimeout(timer);
        }
    }, [])

    let onLogout = (e) => {
        e.preventDefault();
        logout();
        toggleVisible(false);
    }
    let oncloseBlockClickedNotThis = (e) => {
        if (e.target !== RefWrap.current) {
            toggleVisible(false);
        }
    }

    return (
        <div ref={RefWrap} className={classBuble}>
            <ul className={user_settings_list}>
                <li className={user_list_item + ' hover_btn'}>
                    <Link className={list_item} to='/edit'>Редактировать</Link>
                </li>
                <li className={user_list_item + ' hover_btn'}>
                    <a href=' ' onClick={onLogout} className={list_item}>Выйти</a>
                </li>
            </ul>
        </div>
    )
}
export default MenuUser;