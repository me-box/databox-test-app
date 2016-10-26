import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../style/font-awesome/css/font-awesome.min.css';

class Plug extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
	    return (
	    	<div className="column">
	    		<div>
	    			<h1> Plug </h1>
	    		</div>
	    	</div>
	    );
	}
};

function select(state) {
  return {
     plugs: state.plugs
  };
}

export default connect(select)(Plug);