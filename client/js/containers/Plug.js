import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../style/font-awesome/css/font-awesome.min.css';

class Plug extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {

		const {plugs} = this.props;
		console.log("have plugs!!", plugs);
		
		const pluglist = plugs.map((plug,i)=>{
			
			
			const plugstyle = {
				color: red,
			}
			
			return <div key={i}>
					 <div className="centered" style={plugstyle}>
						<i className="fa fa-plug fa-fw" style={{fontSize: '8em'}}> </i>		 	
					 </div>
				   </div>
		});
	    return (
	    	<div className="column">
	    		{pluglist}
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