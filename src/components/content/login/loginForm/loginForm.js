import styles from './loginForm.module.scss';
import React, { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { email, required } from '../../../../helpers/form-validators';
import ImgError from '../../../../images/warn_error.png';
// 
let { form, wrap_input, innner_input, wrap_img, wrap_btn, error_class, captcha_wrap, error_text } = styles;
// 
let LoginForm = (props) => {
    let { captcha, } = props;

    return (
        <form className={form} onSubmit={props.handleSubmit}>
            <Field component={RenderInput}
                name='email'
                placeholder='Введите ваш E-mail'
                type='email'
                validate={[required, email]} />
            <Field component={RenderInput}
                name='password'
                placeholder='Введите ваш пароль'
                type='password'
                validate={[required]} />
            {captcha && <>
                <div className={captcha_wrap}><img src={captcha} alt='' /></div>
                <Field component={RenderInput}
                    name='captcha'
                    placeholder='Введите текст с картинки'
                    type='text'
                    validate={[required]} />
                <Field component={RenderInput} name='rememberMe' type='checkbox' />
            </>}
            <div className={wrap_btn}>
                <button>Войти</button>
            </div>
        </form>
    )
}
let RenderInput = (props) => {
    let { input, meta, placeholder, type } = props;
    let { active, error, touched, } = meta;
    let errors = touched && error;
    let [errorTextVisible, seterrorTextVisible] = useState(false);
    let toggleShowErrorText = () => { seterrorTextVisible(!errorTextVisible); };

    return (
        <div className={wrap_input}>
            <div className={innner_input}>
                <input className={errors && !active ? error_class : null}
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    autoComplete='false' />
                {errors && !active && <div className={wrap_img}>
                    <img onMouseOver={toggleShowErrorText}
                        onMouseLeave={toggleShowErrorText}
                        src={ImgError} alt='' />
                </div>}
                {errorTextVisible && <div className={error_text}>{error}</div>}
            </div>
        </div>
    )
}
export default reduxForm({ form: 'login_form' })(LoginForm);