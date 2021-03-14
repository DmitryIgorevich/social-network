import React from 'react';
// 
import IMGlogo from './React.webp';
import styles from './header.module.scss';
import UserBlock from './userBlock/userBlock';
import { Link } from 'react-router-dom';
// 
let { header, container, row, logo_block, logo, logo_text, logo_wrap } = styles;
// 
let Header = (props) => {
    let { auth, logout } = props;

    return (
        <header className={header}>
            <div className={`container ${container}`}>
                <div className={row}>
                    <div className={logo_block}>
                        <Link to='/profile' className={logo_wrap}>
                            <div className={logo}>
                                <img src={IMGlogo} alt=' ' />
                            </div>
                            <div className={logo_text}>ВReact'e</div>
                        </Link>
                    </div>
                    <UserBlock auth={auth} logout={logout} />
                </div>
            </div>
        </header>
    )
}
export default Header;