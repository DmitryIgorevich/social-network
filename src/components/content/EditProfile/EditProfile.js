import React from 'react';
import styles from './EditProfile.module.scss';
import FormInfo from './formInfo/formInfo';
// 
let { row, big_block, content_big, } = styles;
// 
let EditProfile = (props) => {
    let { updateProfileInfo, userInfo } = props;

    let onSubmitForm = (formdata) => {
        return updateProfileInfo(formdata);
    }

    return (
        <div className={row}>
            <div className={big_block}>
                <div className={content_big}>
                    <FormInfo onSubmit={onSubmitForm}
                        initialValues={userInfo} />
                </div>
            </div>
        </div>
    )
}
export default EditProfile;
