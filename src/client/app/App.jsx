import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<div> Hello World </div>
		)
	}
}



render(<App />, document.getElementById('app'));