import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../style/font-awesome/css/font-awesome.min.css';

class Notify extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
	    return (
	    	<div className="column">
	    		<div>
	    			<h1> Notify </h1>
	    		</div>
	    	</div>
	    );
	}
};

function select(state) {
  return {
     
  };
}

export default connect(select)(Notify);