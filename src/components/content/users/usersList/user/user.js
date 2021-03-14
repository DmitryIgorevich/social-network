import React, { useEffect, useState } from 'react';
import styles from './user.module.scss';
import EmptyImg from '../../../../header/user.jpg';
import { Link } from 'react-router-dom';
import * as cn from 'classnames';
// 
let { row, little_block, big_block, description, name_class, status_class, settings, btn_add_friend,
    settings_buble, buble_block, buble_block_active } = styles;
// 
let User = (props) => {
    let { followUser, unFollowUser } = props;
    let { name, followed, photos, status, id, uniqueUrlName } = props;
    let [bubleBlockStatus, togglebubleBlock] = useState(false);
    let [timerBuble, toggletimerBuble] = useState(false);
    let [statusChangingFollowed, settatusChangingFollowed] = useState(false);

    let onfollowUser = () => {
        settatusChangingFollowed(true);
        followUser(id);
    }
    let onunFollowUser = () => {
        settatusChangingFollowed(true);
        unFollowUser(id);
    }

    let onOnbubleBlock = (e) => {
        clearTimeout(timerBuble);
        togglebubleBlock(true);
    }
    let onOffbubleBlock = (e) => {
        let timer = setTimeout(() => {
            togglebubleBlock(false);
        }, 100);
        toggletimerBuble(timer);
    }
    useEffect(() => {
        togglebubleBlock(false);
        return () => {
            clearTimeout(timerBuble);
        }
    }, [])
    useEffect(() => {
        settatusChangingFollowed(false);
        if (followed) togglebubleBlock(false);
    }, [followed])

    return (
        <div className={row}>
            <div className={little_block}>
                <div>
                    <img src={photos.small || photos.large || EmptyImg} alt='' />
                </div>
            </div>
            <div className={big_block}>
                <div className={description}>
                    <div className={name_class}><Link to={`/profile/${id}`}>{name}</Link></div>
                    <div className={status_class}>{status}</div>
                </div>
                <div className={settings}>
                    {!followed ?
                        <div className={btn_add_friend}>
                            <button disabled={statusChangingFollowed} onClick={onfollowUser}>Добавить в друзья</button>
                        </div>
                        :
                        <>
                            <div className={settings_buble}
                                onMouseOver={onOnbubleBlock}
                                onMouseLeave={onOffbubleBlock}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div onMouseOver={onOnbubleBlock}
                                onMouseLeave={onOffbubleBlock}
                                className={cn(buble_block, { [buble_block_active]: bubleBlockStatus })}>
                                <ul>
                                    <li>
                                        <button disabled={statusChangingFollowed}
                                            onClick={onunFollowUser}>Отменить подписку</button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default User;
