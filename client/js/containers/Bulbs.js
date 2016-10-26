import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../style/font-awesome/css/font-awesome.min.css';

class Bulbs extends Component {
	
	constructor(props){
		super(props);		
	} 

	render() {
		const {bulbs} = this.props;
		
		
		const bulblist = bulbs.map((bulb,i)=>{
			
			let colour = "black"
			if (bulb['set-bulb-on']){
				if (bulb['set-bulb-on'] === "on"){
					if (bulb['set-bulb-hue']){
						
						const hue = Math.max(0,Math.min(360, Number(bulb['set-bulb-hue'])));
						console.log(`hsl(${hue},100%, 50%)`);
						colour = `hsl(${hue},100%, 50%)`;
					}else{
						colour = "#ffcc00";
					}
				}
			}
			
			const bulbstyle = {
				color: colour,
			}
			
			return <div key={i}>
					 <div className="centered" style={bulbstyle}>
						<i className="fa fa-lightbulb-o fa-fw" style={{fontSize: '8em'}}> </i>		 	
					 </div>
				   </div>
		});
	    return (
	    	<div className="column">
	    		{bulblist}
	    	</div>
	    );
	  }
};

function select(state) {
  return {
     bulbs: Object.keys(state.bulbs).map(key=>state.bulbs[key]),
  };
}

export default connect(select)(Bulbs);
