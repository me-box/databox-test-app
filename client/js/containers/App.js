import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import FooterMenu from './FooterMenu';
import '../../style/sass/style.scss';
import NetworkStatus from '../components/NetworkStatus';
import {connect} from 'react-redux';

class App extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
		
		const { status, dispatch } = this.props;

		const networkprops = {
     	 	status,
    	}

	    return (<div>
	    			<NetworkStatus {...networkprops}/>
			    	<div className="container">
			    		<div className="column">
			    			<HeaderMenu/>
			    			<div>
			    				{this.props.children}
			    			</div>
			    			<FooterMenu/>
			    		</div>
			    	</div>
			    </div>
	    );
	}
};

function select(state) {
  return {
    status: state.network,
  };
}

export default connect(select)(App);
