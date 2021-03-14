import React, { useEffect } from 'react';
import Spinner from '../../../api/spinner/spinner';
import SearchFormUser from '../searchForm/searchForm';
import UsersList from '../usersList/usersList';

let UsersContainer = (props) => {
    let { followUser, unFollowUser, setTermAllAC, getAllUsers, setCurrentPage } = props;
    let { loading, currentPage, users, loadingOnAddingUsers, termAll, loadingSearchTerm } = props.usersPage;

    useEffect(() => {
        getAllUsers(currentPage, null, termAll);
    }, [currentPage, termAll]);

    let onSetNewTerm = (e) => {
        let term = e.target.value;
        setCurrentPage(1);
        setTermAllAC(term);
    }

    return (
        <>
            <SearchFormUser onChangeInput={onSetNewTerm} valueInput={termAll}
                loadingStatus={loadingSearchTerm} placeholder='поиск среди пользователей' />
            {loading ? <Spinner />
                :
                <UsersList users={users}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    follow={followUser}
                    unfollow={unFollowUser}
                    loadingOnAddingUsers={loadingOnAddingUsers}
                />
            }
        </>
    )
}
export default UsersContainer;