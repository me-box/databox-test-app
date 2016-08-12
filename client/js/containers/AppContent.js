import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {HEADER_TOOLBAR_HEIGHT,FOOTER_TOOLBAR_HEIGHT} from '../constants/ViewConstants';
import '../../style/sass/style.scss';
import cx from 'classnames';
import List from '../components/List';

class AppContent extends Component {
	
	constructor(props){
		super(props);
	} 

	render() {
	
		const flexcontainer = {
			height: `calc(100vh - ${HEADER_TOOLBAR_HEIGHT+FOOTER_TOOLBAR_HEIGHT}px)`,
			width: `calc(100vw - 5px)`,
		}

		const { apps, dispatch } = this.props;

	    const applist = apps.map((app,i)=>{
	    	
	    	let dataview;
			
			const data = app.data;
			
	    	switch (app.view){	
	    	
	    		case 'text':
	    			dataview = data || "";
	    			break;
	    			    		
	    		case 'list':
	    			
	    			if (data === Object(data)){ //if this is a valid javascript object
					
						data.keys = data.keys || [];
						data.rows = data.rows || [];
						const props = {title: app.name, keys: data.keys, rows: data.rows};
						dataview = <List {...props}/>
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
    apps: state.apps
  };
}

AppContent.contextTypes = {
	store: React.PropTypes.object,
}

export default connect(select)(AppContent);
