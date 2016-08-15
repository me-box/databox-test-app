import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import FooterMenu from './FooterMenu';
import '../../style/sass/style.scss';
import NetworkStatus from '../components/NetworkStatus';
import {connect} from 'react-redux';
import {fetchChannelId} from '../actions/ChannelActions';
import {windowResize} from '../actions/WindowActions';
import { bindActionCreators } from 'redux';

class App extends Component {
	
	constructor(props){
		super(props);	
		this.windowResize  = bindActionCreators(windowResize, props.dispatch);	
		this._handleResize = this._handleResize.bind(this);
	} 
	
	componentDidMount(){
		this.props.dispatch(fetchChannelId());
  		window.addEventListener('resize', this._handleResize);
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
	
	_handleResize(e){
      const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.windowResize(w,h);
    }
};

function select(state) {
  return {
      status: state.network,
  };
}

export default connect(select)(App);
