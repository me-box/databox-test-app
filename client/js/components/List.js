import React, { Component } from 'react';
import cx from 'classnames';

class List extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
		
		const mobilecontainer = {
			width: 375,
			height: 667,
			color: "black",
		}
		
		const titlebar = {
            height: 40,
            width: '100%',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            background: '#445662',
            display: 'flex',
            flex: '0 1 auto',
            color: 'white',
            fontSize: '1.3em',
        }
		
		const heading = this.props.keys.map((item,i)=>{
			const className = cx({
				title: i==0,
			});
			
			return <div className={className}><div className="centered">{item}</div></div>
		});
		
		
		const rows = this.props.rows.map((item, i)=>{
			var items = this.props.keys.map((key,i)=>{
				const className = cx({
					title: i==0,
				});
				return <div className={className}><div className="centered">{item[key]}</div></div>
			});
			return <div>
				<div className="row">
					{items}
				</div>
			</div>
		});	
		
		return 	<div className="column">
						<div style={titlebar}>
							<div className="centered">{this.props.title}</div>
						</div>
						<div>
							<div className="row">{heading}</div>
						</div>
						{rows}
					</div>
				
	}
};

List.defaultProps = {
	rows : [],
    keys : [],	
};

export default List;