import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { isUrlAdress, required } from '../../../../helpers/form-validators';
import styles from './formInfo.module.scss';
import IMGError from '../../../../images/warn_error.png';
// 
let { wrap, form, form_error, button, btn_disabled, row_input, label_input, wrap_input, wrap_btn, input_error,
    form_error_text, inner_btn, error_img, error_img_title } = styles;
// 
let FormInfo = (props) => {
    let { submitting, error, clearSubmitErrors, reset } = props;

    useEffect(() => {
        let timer = setTimeout(() => {
            clearSubmitErrors();
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [error])

    return (
        <div className={wrap}>
            <form className={`${error ? form_error : ''} ${form}`} onSubmit={props.handleSubmit}>
                <Field component={RenderInput}
                    name='fullName'
                    labelInput='Полное имя'
                    validate={[required]} />
                <Field component={RenderInput}
                    name='aboutMe'
                    labelInput='Обо мне'
                    validate={[required]} />
                <Field component={RenderSelect}
                    name='lookingForAJob'
                    labelInput='Ищу ли я работу?' />
                <Field component={RenderInput}
                    name='lookingForAJobDescription'
                    labelInput='Описание к работе'
                    validate={[required]} />

                <Field component={RenderInput}
                    name='contacts.github'
                    labelInput='Github'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.vk'
                    labelInput='Vk'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.facebook'
                    labelInput='Facebook'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.instagram'
                    labelInput='Instagram'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.website'
                    labelInput='Website'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.youtube'
                    labelInput='Youtube'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.mainLink'
                    labelInput='MainLink'
                    validate={[isUrlAdress]} />
                <Field component={RenderInput}
                    name='contacts.twitter'
                    labelInput='Twitter'
                    validate={[isUrlAdress]} />
                <div className={form_error_text}>{error}</div>
                <div className={wrap_btn}>
                    <div className={inner_btn}>
                        <button className={`${button} ${submitting ? btn_disabled : ''}`}
                            disabled={submitting}>Сохранить</button>
                    </div>
                    <div className={inner_btn}>
                        <button className={`${button} ${submitting ? btn_disabled : ''}`}
                            disabled={submitting}
                            type='button'
                            onClick={reset}>Сбросить</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
let RenderInput = (props) => {
    let { input, meta, type, labelInput } = props;
    let { active, error, } = meta;
    let notActiveAndError = error && !active;

    let [visibleTitleError, togglevisibleTitleError] = useState(false);
    let ontogglevisibleTitleError = () => {
        togglevisibleTitleError(!visibleTitleError);
    }

    return (
        <div className={row_input}>
            <div className={label_input}>{labelInput}:</div>
            <div className={wrap_input}>
                <input
                    className={notActiveAndError ? input_error : ''}
                    {...input}
                    type={type} />
                {notActiveAndError ?
                    <div className={error_img}>
                        <img src={IMGError} alt=' '
                            onMouseEnter={ontogglevisibleTitleError}
                            onMouseLeave={ontogglevisibleTitleError} />
                        {visibleTitleError && <div className={error_img_title}>{error}</div>}
                    </div> : null
                }
            </div>
        </div>
    )
}
let RenderSelect = (props) => {
    let { input, meta, type, labelInput } = props;
    let { error, active } = meta;
    let notActiveAndError = error && !active;

    return (
        <div className={row_input}>
            <div className={label_input}>{labelInput}:</div>
            <div className={wrap_input}>
                <select {...input}
                    type={type}>
                    <option></option>
                    <option value='true'>Да, конечно!</option>
                    <option value='false'>Нет, уже есть!</option>
                </select>
                {notActiveAndError ?
                    <div className={error_img}>
                        <img src={IMGError} alt=' ' title={error} />
                    </div> : null
                }
            </div>
        </div>
    )
}
export default reduxForm({ form: 'form_info', })(FormInfo);