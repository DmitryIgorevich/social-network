import React, { useEffect } from 'react';
import Spinner from '../../../api/spinner/spinner';
import UsersList from '../usersList/usersList';
import withRedirectToLogin from '../../../api/HOC/withRedirectToLogin';
import SearchFormUser from '../searchForm/searchForm';

let UsersFollowedContainer = (props) => {
    let { setCurrentPageFollowedAC, setTermFollowedAC, followUser, unFollowUser, removeUnfollowedFromFollowedAC,
        getFriends, } = props;
    let { loading, usersFollowed, currentPageFollowed, loadingOnAddingUsers, termFollowed, loadingSearchTerm } = props.usersPage;

    useEffect(() => {
        removeUnfollowedFromFollowedAC();
        return () => removeUnfollowedFromFollowedAC();
    }, []);
    useEffect(() => {
        getFriends(currentPageFollowed, null, termFollowed);
    }, [currentPageFollowed, termFollowed]);

    let onSetNewTerm = (e) => {
        let term = e.target.value;
        setCurrentPageFollowedAC(1);
        setTermFollowedAC(term);
    }

    return (
        <>
            <SearchFormUser onChangeInput={onSetNewTerm} valueInput={termFollowed}
                loadingStatus={loadingSearchTerm} placeholder='поиск друзей' />
            {loading ? <Spinner />
                :
                <UsersList users={usersFollowed}
                    setCurrentPage={setCurrentPageFollowedAC}
                    currentPage={currentPageFollowed}
                    follow={followUser}
                    unfollow={unFollowUser}
                    loadingOnAddingUsers={loadingOnAddingUsers} />
            }
        </>
    )
}
export default withRedirectToLogin(UsersFollowedContainer);