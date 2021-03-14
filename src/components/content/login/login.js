import styles from './login.module.scss';
import React from 'react';
import LoginForm from './loginForm/loginForm';
// 
let { wrap, form_wrap } = styles;
// 
let Login = (props) => {
    let { captcha } = props.auth;

    return (
        <div className={wrap}>
            <div className={form_wrap}>
                <LoginForm onSubmit={props.login} captcha={captcha} />
            </div>
        </div>
    )
}

export default Login;