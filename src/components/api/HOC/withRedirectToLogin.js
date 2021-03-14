import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


let withRedirectToLogin = (View) => {
    let Container = (props) => {
        let { isAuthed } = props;
        if (!isAuthed) {
            return <Redirect to='/login' />
        }
        return (
            <View {...props} />
        )
    }
    return connect(mapStateToProps)(Container);
}
let mapStateToProps = (state) => {
    return {
        isAuthed: state.auth.isAuthed,
    }
}
export default withRedirectToLogin;
