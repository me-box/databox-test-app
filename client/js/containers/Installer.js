import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as InstallerActions from '../actions/InstallerActions';
import {HEADER_TOOLBAR_HEIGHT, FOOTER_TOOLBAR_HEIGHT} from '../constants/ViewConstants';
import '../../style/font-awesome/css/font-awesome.min.css';

class Installer extends Component {
	
	constructor(props){
		super(props);
		Object.assign(this, ...bindActionCreators(InstallerActions, props.dispatch));	
	} 

	componentDidMount(){

		this.selectApptoInstall(this.props.params.appId);	
	}
	
	render() {	

		const container = {
	    	width: '100vw',
	    	height: `calc(100vh - ${HEADER_TOOLBAR_HEIGHT + FOOTER_TOOLBAR_HEIGHT}px)`,
	    }

	    const condensedrow = {
			flex: '0 0 auto',
			height: HEADER_TOOLBAR_HEIGHT,
		}
 		const headerstyle ={
 			WebkitFlex: '0 0 auto',
	    	flex: '0 0 auto',
	    	height: 60,
	    	background: '#f2f2f2'
	    }
	    const checkwidth ={
	    	WebkitFlex: '0 0 auto',
	    	flex: '0 0 auto',
	    	width: 50,
	    }

	    const stars = {
	    	color: 'red',
	    	WebkitFlex: '0 0 auto',
	    	flex: '0 0 auto',
	    	width: 180,
	    	fontSize: '1.3em',
	    }

	    const textleft ={
	    	textAlign:'left',
	    }
		const {app, dispatch} = this.props;

		const wider = {
			width: 200,
		}

		let author, description, packages, resources, packageheaders;

		if (app) {
		
			author = `publisher: ${app.author.username}` || "";
		
			description = app.manifest.description;
		
			packageheaders = <div style={headerstyle}> 
								<div className="row">
									<div style={checkwidth}>
										<div className="centered">
											
										</div>
									</div>
									<div className="title" style={wider}>
										<div className="centered">
											package name
										</div>
									</div>
									<div>
										<div className="centered">
											purpose
										</div>
									</div>
									<div>
										<div className="centered">
											benefits
										</div>
									</div>
									<div>
										<div className="centered">
											risk
										</div>
									</div>
								</div>
							</div>

			packages = app.manifest.packages.map((p,i)=>{

				const row = <div className="row">
								<div style={checkwidth}>
									<div className="centered">
										<input type="checkbox"></input>
									</div>
								</div>
								<div className="title" style={wider}>
									<div className="centered">
										{p.name}
									</div>
								</div>
								
								<div>
									<div className="centered">
										{p.purpose}
									</div>
								</div>
								
								<div>
									<div className="centered">
										{p.benefits}
									</div>
								</div>

								<div>
									<div className="centered">
										this has a <strong>medium</strong> risk
									</div>
								</div>
							</div>

				return <div key={i}>
							{row} 
						</div>

			});


			//get a dedup list of all resources

			const r = Object.keys(app.manifest.packages.reduce((acc, p)=>{
				p['driver-permissions'].forEach((resource)=>{
					acc[resource] = resource;
				},{})
				return acc;
			},{}));

			resources = r.map((resource,i)=>{
				return <div key={i}>
							<div className="centered" onClick={this.toggleResource.bind(this, resource)}>
								{resource}
							</div>
						</div>
			})
		} 

		return <div style={container}>
					<div className="column">
						{/* select how comprehensive the overview is */}
						<div style={condensedrow}>
							<div className="row">
								<div>
									<div className="centered">
										<div className="button selected">short</div>
									</div>
								</div>
								<div>
									<div className="centered">
										<div className="button">condensed</div>
									</div>
								</div>
								<div>
									<div className="centered">
										<div className="button">full</div>
									</div>
								</div>
							</div>
						</div>

						{/* header for app details */}
						<div className="contentheader">
							<div className="centered">
								app details
							</div>
						</div>

					{/* dteails of the author and app */}
						<div style={condensedrow}>
							<div className="row">
								<div>
									<div className="centered">
										<div style={textleft}>
											{author}
										</div>
									</div>
								</div>
								<div style={stars}>
									<div className="centered">
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star-half"></i>
									</div>
								</div>
							</div>
						</div>

					{/* app description*/}
						<div>
							<div className="row">
								<div>
									<div className="centered">
										{description}
									</div>
								</div>
							</div>
						</div>
					
					{/* header for package install combinations */}
						<div className="contentheader">
							<div className="centered">
								package install combinations
							</div>
						</div>


					{ /* package selection */ }
						{packageheaders}
						{packages}


					{/* header for  resource combinations */}
						<div className="contentheader">
							<div className="centered">
								resources used
							</div>
						</div>

					{/* resources selection */}
						<div>
							<div className="row">
								{resources}
							</div>
						</div>

					{/* app install! */}
						<div style={condensedrow}>
							<div className="row">
								<div>
									<div className="centered">
										<div className="button selected">CANCEL</div>
									</div>
								</div>
								<div>
									<div className="centered">
										<div className="button selected" onClick={this.install.bind(this,app)}>INSTALL!</div>
									</div>
								</div>
							</div>
						</div>

					</div>
			   </div>
	}
};

function select(state) {
  return {
    app: state.installer.app,
  };
}

export default connect(select)(Installer);
