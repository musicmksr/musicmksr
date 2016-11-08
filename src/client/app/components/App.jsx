import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

class App extends React.Component {
	render() {
		return(
			<div>
				<nav className="navbar navbar-default">
	        <div className="container-fluid">
	          <div className="navbar-header">
	            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	              <span className="sr-only">Toggle navigation</span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	            </button>
	            <Link className="navbar-brand" to='/sequencer'>Boot Fader</Link>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav navbar-right">
	              <li><Link to='/sequencer'>Sequencer</Link></li>
	              <li><Link to ='/user'>User</Link></li>
	              <li><Link to ='/upload'>Upload</Link></li>
	              <li><Link to='/login'>Login</Link></li>
	            </ul>
	          </div>
	        </div>
	      </nav>
				{this.props.children}
			</div>
		)
	}
}

export default App;


// <div role='nav'>
// 					<Link to='/' onlyActiveOnIndex>Home</Link>
// 					<Link to='/sequencer'>Sequencer</Link>
// 					<Link to ='/profile'>Profile</Link>
// 					<Link to ='/user'>User</Link>
// 					<Link to ='/upload'>Upload</Link>
// 					<Link to='/login'>Login</Link>
// 					<Link to='/logout'>Logout</Link>
// 				</div>