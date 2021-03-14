import React from 'react';
import EditProfile from './EditProfile';
import { updateProfileInfo, getUserInfo } from '../../../redux/reducers/profile-reducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../api/spinner/spinner';
import { getAuthInfoS } from '../../../selectors/auth';
import { getProfileInfoUserS } from '../../../selectors/profile';

let EditProfileContainer = (props) => {
    let { authInfo, userInfo, getUserInfo } = props;

    if (authInfo.id !== userInfo.userId) {
        getUserInfo(authInfo.id);
        return <Spinner />
    }
    return (
        <EditProfile {...props} />
    )
}
let mapStateToProps = (state) => {
    return {
        authInfo: getAuthInfoS(state),
        userInfo: getProfileInfoUserS(state),
    };
}
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateProfileInfo, getUserInfo }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);