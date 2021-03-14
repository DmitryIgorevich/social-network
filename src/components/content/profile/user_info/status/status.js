import React from 'react';
import { useState } from 'react';
import StatusForm from './statusForm/statusForm';
// 
import styles from './status.module.scss';
// 
let { wrap, status_wrap, statusText, whenNotStatus, status_hover_my_page } = styles;
// 
let Status = (props) => {
    let { status, updateUserStatus, myPage } = props;
    let [editStatus, toggleEditStatus] = useState(false);

    let ontoggleEditStatus = () => {
        toggleEditStatus(!editStatus);
    }
    let onSubmit = (formdata) => {
        if (formdata.status === status) {
            return;
        }
        return updateUserStatus(formdata);
    }
    let contentOwnerPage = editStatus ?
        <StatusForm
            onSubmit={onSubmit}
            initialValues={{ 'status': status }}
            toggleEditStatus={toggleEditStatus}
            triggerClass={statusText}
            onSubmitSuccess={ontoggleEditStatus}
        />
        : <div className={`${statusText} ${status_hover_my_page} ${status ? '' : whenNotStatus}`}
            onClick={ontoggleEditStatus}>
            {status || 'Обновить статус...'}
        </div>;

    return (
        <div className={wrap}>
            <div className={status_wrap}>
                {myPage ? contentOwnerPage : <div className={`${statusText}`}>{status || ''}</div>}
            </div>
        </div>
    )
}
export default Status;