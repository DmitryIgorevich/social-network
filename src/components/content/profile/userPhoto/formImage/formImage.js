import React, { useRef } from 'react';
import { useState } from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import styles from './formImage.module.scss';

let { wrap_popup, inner_popup, title_popup, text_title, close_popup, form, error_form, error_form_text,
    wrap_content, content_text, btn_trigger_file, preview_img, wrap_btn, cursorNotAllowed, btnDisabled } = styles;

let FormImage = (props) => {
    let { toggleshowChooseNewImage, updateUserPhoto } = props;
    let { submitting } = props;
    let RefClose = useRef(null);
    let RefPopup = useRef(null);
    let RefInputFile = useRef(null);
    let RefImage = useRef(null);
    let [previewSrcImg, changepreviewSrcImg] = useState(null);
    let [savedFileToUpload, changesavedFileToUpload] = useState(null);

    let onCloseModal = (e) => {
        if (e.target !== RefClose.current && e.target !== RefPopup.current) return;
        toggleshowChooseNewImage(false);
    };
    let onClickChooseNewImg = (e) => {
        e.preventDefault();
        RefInputFile.current.click();
    }
    let onImgChoosed = (e) => {
        let file = e.target.files[0];
        let src = URL.createObjectURL(file);
        changesavedFileToUpload(file);
        changepreviewSrcImg(src);
    }
    let onSaveNewImg = () => {
        let formdata = new FormData();
        formdata.append('image', savedFileToUpload);
        return updateUserPhoto(formdata);
    }
    let stepBackward = (e) => {
        changepreviewSrcImg(null);
        props.reset();
    }

    return (
        <div className={wrap_popup} onClick={onCloseModal} ref={RefPopup}>
            <div className={inner_popup}>
                <div className={title_popup}>
                    <div className={text_title}>{previewSrcImg ? 'Сохрание' : 'Загрузка'} новой фотографии</div>
                    <div className={close_popup} ref={RefClose}>✖</div>
                </div>
                <form className={form}>
                    {previewSrcImg &&
                        <div className={preview_img}>
                            <img ref={RefImage}
                                src={previewSrcImg}
                                alt=''
                                className={props.error ? error_form : ''} />
                        </div>
                    }
                    <div className={wrap_content}>
                        <div className={content_text}>
                            Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
                        </div>
                        <div className={btn_trigger_file}>
                            <div className={wrap_btn}>
                                <button className={submitting ? `${cursorNotAllowed} ${btnDisabled}` : ''}
                                    disabled={submitting}
                                    onClick={!previewSrcImg ? onClickChooseNewImg :
                                        props.handleSubmit(onSaveNewImg)}>
                                    {previewSrcImg ? 'Сохранить' : 'Загрузить'} новый файл
                                </button>
                            </div>
                            {previewSrcImg &&
                                <div className={wrap_btn}>
                                    <button className={submitting ? `${cursorNotAllowed} ${btnDisabled}` : ''}
                                        disabled={submitting}
                                        onClick={stepBackward} type='button'>Шаг назад</button>
                                </div>
                            }
                        </div>
                    </div>
                    {props.error && <div className={error_form_text}>{props.error}</div>}
                    <Field
                        onChange={onImgChoosed}
                        component={renderInputImg}
                        name='image'
                        type='file'
                        RefInputFile={RefInputFile} />
                    <div className={title_popup}>
                        Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера.
                    </div>
                </form>
            </div>
        </div>
    )
}
let renderInputImg = (props) => {
    let { input, type, RefInputFile } = props;

    return (
        <input {...input}
            ref={RefInputFile}
            value=''
            type={type} />
    )
}
export default reduxForm({ form: 'form_image_avatar' })(FormImage)