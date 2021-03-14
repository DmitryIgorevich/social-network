import React, { useState } from 'react';
import Contact from './contact/contact';
// 
import styles from './contacts.module.scss';
// 
let { wrap, list, wrap_btn, btn } = styles;
// 
let Contacts = (props) => {
    let { contacts } = props;
    let [infoOpen, toggleinfoOpen] = useState(false);
    let ontoggleinfoOpen = () => { toggleinfoOpen(!infoOpen) };

    return (
        <div className={wrap}>
            <div className={wrap_btn}>
                <button onClick={ontoggleinfoOpen}
                    className={btn}>{infoOpen ? 'Скрыть' : 'Показать'} всю информацию</button>
            </div>
            {infoOpen ?
                <ul className={list}>
                    {Object.entries(contacts).map(item => {
                        return <Contact key={item[0]} contact={item} />
                    })}
                </ul> : null}
        </div>
    )
}
export default Contacts;