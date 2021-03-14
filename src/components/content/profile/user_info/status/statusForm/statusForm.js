import styles from './statusForm.module.scss';
import React, { useEffect, useRef, useState, } from 'react';
import { Field, reduxForm } from 'redux-form';
import WarnErrorImg from '../../../../../../images/warn_error.png';
// 
let { wrap_form, textarea, btn_save, form_error_text, _error_form, input_error, wrap_input, error_img, disabled_btn,
    error_text_warn } = styles;
// 
let StatusForm = (props) => {
    let { status, toggleEditStatus, triggerClass, } = props;
    let { clearSubmitErrors, error, submitting, } = props;
    let formRef = useRef(null);
    let btnRef = useRef(null);
    let inputRef = useRef(null);
    let errorImgRef = useRef(null);
    let errorText = useRef(null);

    useEffect(() => {
        let handlerBlur = (e) => {
            let target = e.target;
            if (target.classList.contains(triggerClass)) return;
            if (target === btnRef.current) return;
            if (target === inputRef.current) return;
            if (target === formRef.current) return;
            if (target === errorImgRef.current) return;
            if (target === errorText.current) return;
            toggleEditStatus();
        };
        document.addEventListener('click', handlerBlur);
        return () => {
            document.removeEventListener('click', handlerBlur);
        }
    }, [errorImgRef, errorText]);
    useEffect(() => {
        if (!error) return;
        let timer = setTimeout(clearSubmitErrors, 3000);
        return () => clearTimeout(timer);
    }, [error, clearSubmitErrors])
    let onInputCalcHeight = (e) => {
        let elem = e.target;
        let width = window.getComputedStyle(elem).width;
        let copy = elem.cloneNode(true);
        copy.style.width = width;
        copy.style.height = '0px';
        document.body.append(copy);
        let height = copy.scrollHeight;
        copy.remove();
        elem.style.height = height + 'px';
    }
    let onChangeForm = () => {
        props.change('status', value => {
            if (value.length >= 300) {
                return value.slice(0, 300);
            }
            return value;
        });
    }

    return (
        <form ref={formRef}
            onSubmit={props.handleSubmit}
            className={`${wrap_form} ${error && _error_form}`}
            onChange={onChangeForm}>
            <Field component={RenderTextarea}
                type="text"
                name="status"
                value={status}
                onChange={onInputCalcHeight}
                autoFocus={true}
                onFocus={onInputCalcHeight}
                inputRef={inputRef}
                errorImgRef={errorImgRef}
                errorText={errorText}
            />
            {props.error && <div className={form_error_text}>{props.error}</div>}
            <button disabled={submitting}
                ref={btnRef}
                className={`${btn_save} ${submitting && disabled_btn}`}>Сохранить</button>
        </form>
    )
    /*Этот эффект проверял, что когда форма отправлена, переключал сверху state, и удалял этот компонент.
    Можно его заменить на функцию onSubmitSuccess, которая передается в этот компонент как пропс сверху , в которой
    вызывается колбэк, что нужно сделать после успешного выполнения
     useEffect(() => {
        if (!submitting && submitSucceeded) {
            toggleEditStatus();
        }
    }, [submitting, submitSucceeded, toggleEditStatus]);*/
}

let RenderTextarea = (props) => {
    let { input, meta, type, autoFocus, inputRef, errorImgRef, errorText } = props;
    let { active, error, } = meta;
    let notActiveAndError = error && !active;

    let [errorVisibylyti, toggleErrorMessage] = useState(false);
    let ontoggleErrorMessage = () => {
        toggleErrorMessage(!errorVisibylyti);
    }
    useEffect(() => {
        if (errorVisibylyti) {
            ontoggleErrorMessage();
        }
    }, [active])

    return (
        <div className={wrap_input}>
            <textarea
                ref={inputRef}
                {...input}
                className={`${textarea} ${notActiveAndError && input_error}`}
                type={type}
                autoFocus={autoFocus} />
            {notActiveAndError &&
                <div className={error_img}>
                    {errorVisibylyti && <div ref={errorText} className={error_text_warn}>{error}</div>}
                    <img src={WarnErrorImg} alt='' ref={errorImgRef} onClick={ontoggleErrorMessage} />
                </div>
            }
        </div>

    )
}
export default reduxForm({
    form: 'statusForm',
    enableReinitializeprop: true,
})(StatusForm);