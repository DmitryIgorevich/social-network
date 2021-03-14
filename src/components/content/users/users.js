import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import styles from './users.module.scss';
import UsersContainer from './containersLists/usersContainer';
import UsersNavigation from './usersNavigation/usersNavigation';
import UsersFollowedContainer from './containersLists/usersFollowedContainer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
    followUser, unFollowUser, setCurrentPage, setCurrentPageFollowedAC, removeUnfollowedFromFollowedAC,
    getFriends, setTermFollowedAC, setTermAllAC, getAllUsers,
} from '../../../redux/reducers/users-reducer';
// 
let { row, little_block, big_block, content } = styles;
// 
let Users = (props) => {
    return (
        <div className={row}>
            <div className={big_block}>
                <div className={content}>
                    <Switch>
                        <Route path='/users/followed' render={() => <UsersFollowedContainer {...props} />} />
                        <Route path='/users/' render={() => <UsersContainer {...props} />} />
                    </Switch>
                </div>
            </div>
            <div className={little_block}>
                <UsersNavigation />
            </div>
        </div>
    )
}
let mapStateToProps = (state) => {
    return {
        usersPage: state.users,
    };
}
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        followUser, unFollowUser, setCurrentPage, removeUnfollowedFromFollowedAC, getFriends, setTermFollowedAC,
        setTermAllAC, getAllUsers, setCurrentPageFollowedAC,
    }, dispatch);
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Users)
