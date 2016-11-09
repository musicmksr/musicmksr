import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

	close() {
		this.setState({ showModal: false });
	};

	open() {
		this.setState({ showModal: true });
	};

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
	            <Link className="navbar-brand" to='/sequencer'>SimpletonLive</Link>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav navbar-right">
	              <li><Link to='/sequencer'>Sequencer</Link></li>
	              <li><Link to ='/profile'>Profile</Link></li>
	              <li><Link to ='/upload'>Upload</Link></li>
	              <li onClick={this.open.bind(this)}><a href='javascript:void(0)'>Login</a></li>
	            </ul>


	            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
	            	<Modal.Header closeButton>
            			<Modal.Title>Log In with Facebook</Modal.Title>
          			</Modal.Header>
          			<Modal.Body>
          				<a href="auth/facebook"><Button>Sign In</Button></a>
          				<a href="/logout"><Button>Sign Out</Button></a>
          			</Modal.Body>
	            </Modal>
	          </div>
	        </div>
	      </nav>
	      <div className="container-fluid">
				 {this.props.children}
				</div>
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
