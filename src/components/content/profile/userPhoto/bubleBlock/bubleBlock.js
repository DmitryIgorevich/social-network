import React, { useEffect } from 'react';

let BubleBlock = (props) => {
    let { toggleclassul, classul, activeClassBubleBlock, toggleshowChooseNewImage, ontogglevisibleSettingsOnLeave } = props;

    useEffect(() => {
        let timer = setTimeout(() => {
            toggleclassul(activeClassBubleBlock);
        }, 50);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    let onOpenModalChooseImage = () => {
        toggleshowChooseNewImage(true);
        ontogglevisibleSettingsOnLeave();
    }

    return (
        <ul className={classul}>
            <li onClick={onOpenModalChooseImage}>Обновить фотографию</li>
        </ul>
    )
}
export default BubleBlock;