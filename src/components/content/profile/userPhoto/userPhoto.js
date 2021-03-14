import React, { useEffect, useState } from 'react';
import styles from './userPhoto.module.scss';
// 
import IMGUser from '../../../header/user.jpg';
import { Link } from 'react-router-dom';
import BubleBlock from './bubleBlock/bubleBlock';
import FormImage from './formImage/formImage';
// 
let { content, img, hidden_block, photo_block, photo, edit_btn, active, wrap_btns } = styles;
// 
let UserPhoto = (props) => {
    let { small, large, updateUserPhoto, followedStatus, follow, unFollow, myPage, userId, } = props;
    let [visibleSettings, togglevisibleSettings] = useState(false);
    let [classul, toggleclassul] = useState('');
    let [timer, toggleTimer] = useState(undefined);
    let [showChooseNewImage, toggleshowChooseNewImage] = useState(false);
    let [progressChangeFollowing, setprogressChangeFollowing] = useState(false);

    useEffect(() => {
        setprogressChangeFollowing(false);
    }, [progressChangeFollowing])

    let ontogglevisibleSettingsOnEnter = () => {
        if (!myPage) return;
        clearTimeout(timer);
        if (visibleSettings) {
            toggleclassul(active);
            return;
        }
        togglevisibleSettings(true);
    }
    let ontogglevisibleSettingsOnLeave = () => {
        if (!myPage) return;
        toggleclassul('');
        timer = setTimeout(() => {
            togglevisibleSettings(false)
        }, 300);
        toggleTimer(timer);
    }
    let onFollow = () => {
        follow(userId);
        setprogressChangeFollowing(true);
    }
    let onUnFollow = () => {
        unFollow(userId);
        setprogressChangeFollowing(true);
    }

    return (
        <div className={content}>
            <div className={photo_block}>
                <div className={photo}>
                    <img className={img} src={small || large || IMGUser} alt='' />
                    {myPage &&
                        <div className={hidden_block}
                            onMouseEnter={ontogglevisibleSettingsOnEnter}
                            onMouseLeave={ontogglevisibleSettingsOnLeave}>
                            {visibleSettings &&
                                <BubleBlock classul={classul}
                                    toggleclassul={toggleclassul}
                                    toggleshowChooseNewImage={toggleshowChooseNewImage}
                                    activeClassBubleBlock={active}
                                    ontogglevisibleSettingsOnLeave={ontogglevisibleSettingsOnLeave} />}
                            {showChooseNewImage &&
                                <FormImage toggleshowChooseNewImage={toggleshowChooseNewImage}
                                    updateUserPhoto={updateUserPhoto}
                                    onSubmitSuccess={() => toggleshowChooseNewImage(false)} />}
                        </div>
                    }
                </div>
                <ul className={wrap_btns}>
                    {myPage ?
                        <li className={edit_btn}>
                            <Link to='/edit' className='hover_btn'>Редактировать</Link>
                        </li>
                        :
                        <li className={edit_btn}>
                            {followedStatus ?
                                <button onClick={onUnFollow} disabled={progressChangeFollowing}
                                    className='hover_btn'>Отписаться</button>
                                : <button onClick={onFollow} disabled={progressChangeFollowing}
                                    className='hover_btn'>Подписаться</button>
                            }
                        </li>
                    }
                </ul>
            </div>
        </div>

    )
}
export default UserPhoto;