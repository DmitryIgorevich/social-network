import React from 'react';
import Status from './status/status';
import AboutUser from './aboutUser/aboutUser';
import AboutWork from './aboutWork/aboutWork';
import Contacts from './/contacts/contacts';
//
import styles from './user_info.module.scss';
// 
let { content, information, name } = styles;
// 
let UserInfo = (props) => {
    let { aboutMe, contacts, fullName, lookingForAJob, lookingForAJobDescription, userId, } = props.userInfo;
    let { userStatus, updateUserStatus, myPage } = props;

    return (
        <div className={content}>
            <div className={information}>
                <h1 className={name}>{fullName}</h1>
                <Status status={userStatus} updateUserStatus={updateUserStatus} myPage={myPage} />
                <AboutUser aboutMe={aboutMe} />
                <AboutWork workSearch={lookingForAJob} workDescription={lookingForAJobDescription} />
                <Contacts contacts={contacts} />
            </div>
        </div>
    );
}
export default UserInfo;