import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../style/font-awesome/css/font-awesome.min.css';

class Pipsta extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
		const {messages} = this.props;
		
		
		const messagelist = messages.map((message,i)=>{
			
			const printstyle = {
				fontSize: '2em',
				color: 'black',
				fontFamily: `"Courier New", Courier, "Lucida Sans Typewriter"`,
			}	
			
			return <div key={i}>
					 <div className="centered" style={printstyle}>
						{message.printer}		 	
					 </div>
				   </div>
		});
	    return (
	    	<div className="column">
	    		{messagelist}
	    	</div>
	    );
	  }
};

function select(state) {
  return {
     messages: Object.keys(state.pipsta).map(key=>state.pipsta[key]),
  };
}

export default connect(select)(Pipsta);
