import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './usersNavigation.module.scss';
// 
let { content, wrap, slider, active_link } = styles;
//
let UsersNavigation = (props) => {
    let RefSlide = useRef(null);
    let Refarent = useRef(null);
    let [heigthSlide, changeheigthSlide] = useState(null);

    let onClickItemChangePos = (e) => {
        let parent = e.target.closest('ul');
        let allLi = [...parent.children].filter(item => item.nodeName === 'LI');
        allLi.forEach((item, i) => {
            if (e.target.closest('li') && e.target.closest('li') === item) {
                RefSlide.current.style.transform = `translateY(${i * heigthSlide}px)`
            }
        });
    }
    let initSlider = () => {
        let allLi = [...Refarent.current.children].filter(item => item.nodeName === 'LI');
        let heightSlide = allLi[0].scrollHeight;
        changeheigthSlide(heightSlide);
        RefSlide.current.style.height = `${heightSlide}px`;
        let index = allLi.map(item => item.querySelector(`.${active_link}`)).findIndex(item => item);
        RefSlide.current.style.transform = `translateY(${index * heightSlide}px)`
    }
    useEffect(() => {
        initSlider();
    }, [])

    return (
        <div className={content}>
            <div className={wrap}>
                <ul onClick={onClickItemChangePos} ref={Refarent}>
                    <li>
                        <NavLink exact activeClassName={active_link} to='/users'>Все пользователи</NavLink></li>
                    <li>
                        <NavLink exact activeClassName={active_link} to='/users/followed'>Подписки</NavLink></li>
                    <div ref={RefSlide} className={slider}></div>
                </ul>
            </div>
        </div>
    )
}
export default UsersNavigation;