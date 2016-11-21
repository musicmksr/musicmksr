import React from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import request from 'axios';

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loggedIn: false
    };
  }
  componentWillMount() {
  	this.getCookie.call(this);
  }
	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	getCookie() {
		request.get('/api/session')
			.then((response) =>{
				if(response.data.userID === undefined){
					console.log('not logged in');
					window.newCookie = undefined;

					this.setState({
						showModal: true
					});
				} else {
					window.newCookie = response.data.passport;
					console.log('logged in', window.newCookie);

					this.setState({
						loggedIn: true
					});

					//
				}
			})
			.then(() =>{
				browserHistory.push('/sequencer');
			})
			.catch((error) =>{
		    console.log(error);
		  });
	}

	notLoggedIn() {
		alert('Login to upload your beats');
	}

	render() {
		let profileLink;
		let login;
		let upload;
		let fbLogin;

		if(this.state.loggedIn){
			profileLink = <Link to='/profile' activeClassName='active'>Profile</Link>;
			login = 'Logout';
			upload = <a href='/upload/upload.html'>Upload</a>;
			fbLogin = <a href='/logout'><Button>Sign Out</Button></a>;
		}else{
			profileLink = '';
			login = 'Login';
			upload = <a href='javascript:void(0)' onClick={this.notLoggedIn.bind(this)}>Upload</a>;
			fbLogin = <a href='auth/facebook'><img id='loginImg' src="/imgs/login.png"/></a>;
		}

		return(
			<div>
				<nav className="navbar navbar-default">
	        <div className="container-fluid">
						<Link className="logo navbar-brand navbar-right" to='/sequencer'><p className='logo'>STEP</p>{<br/>}{<br/>}<p className='logo' id='s160'>S160</p></Link>
	          <div className="navbar-header">
	            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false" aria-controls="navbar">
	              <span className="sr-only">Toggle navigation</span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	            </button>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav">
	              <li><Link to='/sequencer' activeClassName='active'>Sequencer</Link></li>
	              <li>{profileLink}</li>
	              <li>{upload}</li>
	              <li onClick={this.open.bind(this)} activeClassName='active'><a href='javascript:void(0)'>{login}</a></li>
	            </ul>
              <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
	            	<Modal.Header id='modalHeader' closeButton>
            			<Modal.Title id='modalTitle'>Welcome</Modal.Title>
          			</Modal.Header>
          			<Modal.Body id='modalBody'>
          				<span>
          					<br/>
          					<p id='loginLogo'>STEP</p>
          					<p id='loginLogo'>S160</p>
          					<br/>
          					<p id='loginBody'>Your Personal Sequencer and Audio Sampler</p>
          				</span>
          			</Modal.Body>
          			<div className='modal-footer' id='loginBtn'>
          				<span>{fbLogin}</span>
          			</div>
	            </Modal>
	          </div>
	        </div>
	      </nav>
	      <div className="scrollbox container-fluid">
				 {this.props.children && React.cloneElement(this.props.children, {
            loggedIn: this.state.loggedIn
          })}
				</div>
			</div>
		)
	}
}

export default App;
