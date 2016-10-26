import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../style/font-awesome/css/font-awesome.min.css';
import {togglePause} from '../actions/AppActions';
import cx from 'classnames';

class Debug extends Component {
	
	constructor(props){
		super(props);	
		this.togglePause  = bindActionCreators(togglePause, props.dispatch);	
	} 

	render() {
	    
	    const {debug,paused} = this.props;
	   
	   const iconstyle = {
            alignSelf: 'center',
            height: '2em',
            width: '2em',
            fontWeight: 'regular',
            background: '#009688',
            border: '2px solid white', 
            lineHeight: '1.6em',
            textAlign: 'center',
            boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.9), 0 6px 20px 0 rgba(0, 0, 0, 0.09)',
            color:'white',
        }
        
        const pauseresume = cx({
        	fa: true,
        	'fa-fw': true,
        	'fa-pause': !paused,
        	'fa-play': paused,
        });
        
        const titlebar = <div style={{maxHeight:40}}>
							<div className="row" style={{background:"#000", color:"white"}}>
								<div onClick={this.togglePause} className="fixed" style={{width:60, color:"white", borderRight:'1px solid white'}}>
									<div className="centered">
										<div><i className={pauseresume}></i></div>
									</div>
								</div>	
								<div className="fixed" style={{width:250, borderRight:'1px solid white'}}>
									<div className="centered">
										timestamp
									</div>
								</div>
								<div className="fixed" style={{width:200, borderRight:'1px solid white'}}>
									<div className="centered">
										name
									</div>
								</div>
								<div>
									<div className="centered">
										message
									</div>
								</div>
							</div>
						</div>
	    
	    const messages = debug.map((msg,i)=>{
	    	return 	<div key={i}>
	    				<div className="row">
							<div className="fixed" style={{width:60, background:'#333333'}}>
	    						<div className="centered">
	    							<div style={iconstyle}><i className={`fa fa-bug fa-fw`}></i></div>
	    						</div>
	    					</div>	
	    					<div className="fixed" style={{width:250, borderRight:'1px solid #dfdfdf', background:'white'}}>
	    						<div className="centered">
	    							{msg.timestamp}
	    						</div>
	    					</div>
	    					<div className="fixed" style={{width:200, borderRight:'1px solid #dfdfdf', background:'white'}}>
	    						<div className="centered">
	    							{msg.name}
	    						</div>
	    					</div>
	    					<div>
	    						<div className="centered">
	    							{msg.payload}
	    						</div>
	    					</div>
	    				</div>
	    			</div>
	    });
	    
	    return (
	    	<div className="column">
	    		{titlebar}
	    		{messages}
	    	</div>
	    );
	  }
};

function select(state) {
  return {
      debug: state.debug.messages,
      paused: state.debug.paused,
  };
}

export default connect(select)(Debug);
