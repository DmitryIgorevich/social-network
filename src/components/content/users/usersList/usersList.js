import React, { useEffect, useRef, } from 'react';
import User from './user/user';
import styles from './usersList.module.scss';
// 
let { wrap } = styles;
// 
let UsersList = (props) => {
    let { follow, unfollow, setCurrentPage, currentPage, users, } = props;
    let RefContent = useRef(null);

    let getUsersByScroll = (e) => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        if (!RefContent.current) return;
        if (document.documentElement.clientHeight + window.pageYOffset >= scrollHeight) {
            setCurrentPage(currentPage + 1);
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', getUsersByScroll);
        return () => { document.removeEventListener('scroll', getUsersByScroll) };
    }, [currentPage]);

    return (
        <div ref={RefContent} className={wrap}>
            {users.map(item => {
                return <User key={item.id}
                    {...item}
                    followUser={follow}
                    unFollowUser={unfollow} />
            })}
        </div>
    )
}
export default UsersList;