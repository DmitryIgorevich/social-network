import React from 'react';
import styles from './contact.module.scss';
// 
let { wrap, name_info, desciption_info, emty_field } = styles;
// 
let Contact = (props) => {
    let { contact: [name, value] } = props;

    return (
        <li className={wrap}>
            <div className={name_info}>{name}</div>
            <div className={desciption_info}>
                {value ? <a href={value}>{value}</a> : <span className={emty_field}></span>}
            </div>
        </li>
    )
}
export default Contact;
