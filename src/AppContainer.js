import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "./App";
import Spinner from "./components/api/spinner/spinner";
import { initializeApplication } from './redux/reducers/app-reducer';
import { logout } from './redux/reducers/auth-reducer';
// 
function AppContainer(props) {
	let { state, logout } = props;
	let { loading } = state.app;

	useEffect(() => {
		props.initializeApplication();
	}, []);

	if (loading) {
		return <Spinner />
	}
	return (
		<App {...state} logout={logout} />
	);
}
let mapStateToProps = (state) => {
	return { state };
}
let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ initializeApplication, logout }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
