import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import Howler from 'react-howler';

class App extends React.Component {
	render() {
		return(
			<div>
				<h1>MusicMKSr</h1>
				<div role='nav'>
					<Link to='/' onlyActiveOnIndex>Home</Link>
					<Link to='/sequencer'>Sequencer</Link>
					<Link to ='/profile'>Profile</Link>
					<Link to ='/user'>User</Link>
					<Link to ='/upload'>Upload</Link>
					<Link to='/login'>Login</Link>
					<Link to='/logout'>Logout</Link>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default App;
