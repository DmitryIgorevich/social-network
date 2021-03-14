import styles from './aboutUser.module.scss';
import React from 'react';
// `
// 
let { wrap, name_info, desciption_info } = styles;
// 
let AboutUser = React.memo(props => {
    let { aboutMe } = props;

    return (
        <div className={wrap}>
            <div className={name_info}>Обо мне:</div>
            <div className={desciption_info}>{aboutMe}</div>
        </div>
    )
});
export default AboutUser;