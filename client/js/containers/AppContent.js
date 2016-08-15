import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {HEADER_TOOLBAR_HEIGHT,FOOTER_TOOLBAR_HEIGHT} from '../constants/ViewConstants';
import {TOPPADDING,LEFTPADDING,RIGHTPADDING,CHARTXPADDING,CHARTYPADDING,TICKCOUNT,BARSPACING,YAXISVALUESIZE, AXISLABELSIZE} from '../constants/ChartConstants';

import '../../style/sass/style.scss';
import cx from 'classnames';
import List from '../components/List';
import Chart from '../components/Chart';
import {MAXREADINGS} from '../constants/ChartConstants';
class AppContent extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
	
		const flexcontainer = {
			height: `calc(100vh - ${HEADER_TOOLBAR_HEIGHT+FOOTER_TOOLBAR_HEIGHT}px)`,
			width: `calc(100vw - 5px)`,
		}

		const { apps, dispatch, dimensions } = this.props;
		
		const height = dimensions.h - (HEADER_TOOLBAR_HEIGHT+FOOTER_TOOLBAR_HEIGHT);
		
	    const applist = apps.map((app,i)=>{
	    	
	    	let APPHEIGHT = height / apps.length;
	    	
	    	let style = {
	    		position: 'absolute',
	    		width: dimensions.w,
	    		height: APPHEIGHT,
	    		border: '1px solid',
	    		top:  HEADER_TOOLBAR_HEIGHT + (APPHEIGHT * i),	    		
	    	}
	    	
	    	let dataview;
			
			const data = app.data;
			
	    	switch (app.view){	
	    		
	    		case 'chart':
	    			
	    			const options = {
						TOPPADDING: TOPPADDING,
						LEFTPADDING: LEFTPADDING,
						RIGHTPADDING: RIGHTPADDING,
						CHARTXPADDING:CHARTXPADDING, 
						CHARTYPADDING: CHARTYPADDING,
						TICKCOUNT: TICKCOUNT,
						BARSPACING: BARSPACING,
						AXISLABELSIZE: AXISLABELSIZE,
						YAXISVALUESIZE: YAXISVALUESIZE,				
	    			}
	    			
	    			let [config, ...values] = data;
	    			dataview = 	<div style={style}>
	    							<Chart {...{title: app.name, w: dimensions.w, h: APPHEIGHT, options:options, config: config, data: values.slice(-MAXREADINGS)}} /> 
	    						</div>
	    			break;
	    			
	    		case 'text':
	    			dataview = data || "";
	    			break;
	    			    		
	    		case 'list':
	    			
	    			if (data === Object(data)){ //if this is a valid javascript object
					
						data.keys = data.keys || [];
						data.rows = data.rows || [];
						const props = {title: app.name, keys: data.keys, rows: data.rows};
						dataview = <div style={style}>
									<List {...props}/>
								   </div>
					}
	    			break;
	    	
	    	}


	    	const {view} =  app;

	    	const classname = cx({
	    		flexitem: true,
	    		[view]:true,
	    	})

	    	return <div style={{width:'inherit'}}>
	    				<div key={i} className={classname} style={{width:'inherit'}}>
							{dataview}
	    				</div>
	    				
	    		   </div>
	    });

	    return <ReactCSSTransitionGroup className="container" style={flexcontainer} transitionName="flexitem" transitionEnterTimeout={500} transitionLeaveTimeout={300}>{applist}</ReactCSSTransitionGroup>
         	
         	
	   }
};

function select(state) {
  return {
    apps: state.apps,
    dimensions: state.screen.dimensions,
  };
}

AppContent.contextTypes = {
	store: React.PropTypes.object,
}

export default connect(select)(AppContent);
