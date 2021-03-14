import React from 'react';
import ImgLoading from '../../../api/loading.svg';
import styles from './searchForm.module.scss';

let { wrap_input } = styles;

let SearchFormUser = (props) => {
    let { onChangeInput, valueInput, loadingStatus, placeholder } = props;

    return (
        <div className={wrap_input}>
            <i className='fas fa-search'></i>
            <input value={valueInput} onChange={onChangeInput} placeholder={placeholder} />
            {loadingStatus && <div><img src={ImgLoading} alt='' /></div>}
        </div>
    )
}
export default SearchFormUser;
