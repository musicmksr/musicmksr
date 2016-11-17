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
			profileLink = <Link to ='/profile'>Profile</Link>;
			login = 'Logout';
			upload = <a href ='/upload/upload.html'>Upload</a>;
			fbLogin = <a href='/logout'><Button>Sign Out</Button></a>;
		}else{
			profileLink = '';
			login = 'Login';
			upload = <a href='javascript:void(0)' onClick={this.notLoggedIn.bind(this)}>Upload</a>;
			fbLogin = <a href='auth/facebook'><Button>Sign In</Button></a>;
		}

		return(
			<div>
				<nav className="navbar navbar-default">
	        <div className="container-fluid">
						<Link id='logo' className="navbar-brand navbar-right" to='/sequencer'>STEP{<br/>}{<br/>}S160</Link>
	          <div className="navbar-header">
	            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	              <span className="sr-only">Toggle navigation</span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	              <span className="icon-bar"></span>
	            </button>
	          </div>
	          <div id="navbar" className="navbar-collapse collapse">
	            <ul className="nav navbar-nav navbar-left">
	              <li><Link to='/sequencer'>Sequencer</Link></li>
	              <li>{profileLink}</li>
	              <li>{upload}</li>
	              <li onClick={this.open.bind(this)}><a href='javascript:void(0)'>{login}</a></li>
	            </ul>
	            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
	            	<Modal.Header closeButton>
            			<Modal.Title>Title for Modal goes here</Modal.Title>
          			</Modal.Header>
          			<Modal.Body>
          				<p>Bacon ipsum dolor amet pig fatback andouille, chicken prosciutto boudin cow short loin jowl. Shankle shank short ribs frankfurter beef ribs. Ham fatback pork flank ball tip porchetta pork loin sirloin shankle bresaola beef ribs landjaeger cupim bacon. Shoulder tenderloin pork alcatra brisket turducken cupim pastrami hamburger tri-tip rump chuck spare ribs kevin pig. Beef ribs pork loin chicken bresaola, capicola pastrami filet mignon boudin t-bone.</p>
          				<p>Ham bacon biltong sirloin, beef ribs venison jowl short ribs tri-tip sausage drumstick bresaola chicken. Filet mignon jerky fatback pastrami burgdoggen turducken rump. Filet mignon sirloin doner alcatra, pork loin short ribs pastrami leberkas shankle picanha. Fatback sausage cupim beef ribs, meatloaf flank jowl rump ham hock pastrami andouille ball tip cow pork chop. Boudin chuck pancetta pork loin.</p>
          			</Modal.Body>
          			<Modal.Footer>
          				<span>{fbLogin}</span>
          			</Modal.Footer>
	            </Modal>
	          </div>
	        </div>
	      </nav>
	      <div className="scrollbox container-fluid">
				 {this.props.children}
				</div>
			</div>
		)
	}
}

export default App;
