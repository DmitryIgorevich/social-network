import React from 'react';
// 
import styles from './aboutWork.module.scss';
// 
let { wrap, name_info, desciption_info, emty_field } = styles;
// 
let AboutWork = (props) => {
    let { workDescription, workSearch } = props;

    return (
        <>
            <div className={wrap}>
                <div className={name_info}>Ищу ли я работу?</div>
                <div className={desciption_info}>{workSearch ? 'ДА!' : 'НЕТ!'}</div>
            </div>
            <div className={wrap}>
                <div className={name_info}>Описание по работе:</div>
                <div className={desciption_info}>
                    {workSearch ?
                        (workDescription || 'нет описания') :
                        <span className={emty_field}></span>
                    }
                </div>
            </div>
        </>


    )
}
export default AboutWork;