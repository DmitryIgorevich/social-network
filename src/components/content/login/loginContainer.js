import React from 'react';
import Login from './login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../../redux/reducers/auth-reducer';
import { Redirect } from 'react-router-dom';
import Spinner from '../../api/spinner/spinner';
import { getAuthInfoS } from '../../../selectors/auth';
// 
// 
let LoginContainer = (props) => {
    let { loading, isAuthed, } = props.auth;

    if (isAuthed) {
        return <Redirect to='/profile' />
    }
    if (loading) {
        return <Spinner />
    }
    return (
        <Login {...props} />
    )
}
let mapStateToProps = (state) => {
    return {
        auth: getAuthInfoS(state),
    }
}
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);