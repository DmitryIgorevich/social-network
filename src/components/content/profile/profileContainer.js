import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { initUserPage, updateUserStatus, updateUserPhoto } from '../../../redux/reducers/profile-reducer';
import { followUser, unFollowUser, } from '../../../redux/reducers/users-reducer';
import Profile from './profile';
import Spinner from '../../api/spinner/spinner';
import withRedirectToLogin from '../../api/HOC/withRedirectToLogin';
import { withRouter } from 'react-router-dom';
import { getAuthInfoS } from '../../../selectors/auth';
import { getProfileInfoS } from '../../../selectors/profile';
import { getSixRandomFriendsS, getUsersInfoS } from '../../../selectors/users';
// 
let ProfileContainer = (props) => {
    let { profile, auth, match } = props;

    useEffect(() => {
        let id = match.params.userId || auth.id;
        props.initUserPage(id);
    }, [match.params.userId, auth.id]);

    if (profile.loading) return <Spinner />
    return <Profile {...props} />
}
let mapStateToProps = (state) => {
    return {
        profile: getProfileInfoS(state),
        auth: getAuthInfoS(state),
        users: getUsersInfoS(state),
        sixRandomFriends: getSixRandomFriendsS(state),
    }
}
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initUserPage, updateUserStatus, updateUserPhoto, followUser, unFollowUser,
    }, dispatch);
}

export default compose(
    withRouter,
    withRedirectToLogin,
    connect(mapStateToProps, mapDispatchToProps),
)(ProfileContainer)
