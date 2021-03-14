import './App.scss';
import Content from './components/content/content';
import Header from './components/header/header';
// 
// 
function App(props) {
	let { auth, logout } = props;

	return (
		<div className='App'>
			<div className='wrapper'>
				<Header auth={auth} logout={logout} />
				<Content />
			</div>
		</div>
	);
}
export default App;
