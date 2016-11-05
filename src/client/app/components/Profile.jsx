import React from 'react';
import { render } from 'react-dom';
import Track from './Track.jsx';
import data from '../data.json';

console.log(data.matrix);

class Profile extends React.Component {

  render() {
    return(
    	<div>
	     	{data.matrix.map(track => 
	     		<Track track={track} />
	     	)}
     	</div>
    ); 
  };

}

export default Profile;
