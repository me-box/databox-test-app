import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Circle,Ellipse,Text,Rect,Line,Path,Group} from '../svg/';
import {init} from '../../../actions/UIBuilderActions';


const _link = (d)=>{
  return "M" + d.source.x + "," + d.source.y
      + "C" + (d.source.x + d.target.x) / 2 + "," + d.source.y
      + " " + (d.source.x + d.target.x) / 2 + "," + d.target.y
      + " " + d.target.x + "," + d.target.y;
}

const _links = (node)=>{
  if (node.children){
      return _flatten(node.children.map((child)=>{
          return [
                  {
                      source: {
                        x:node.x,
                        y:node.y
                      }, 
                      target: {
                        x:child.x, 
                        y:child.y
                      }
                  },
                  ..._links(child)]
      }))
  }
  return [];
}

const _flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? _flatten(b) : b), []
);

class UIBuilder extends Component {

  constructor(props, context){
  	super(props, context);
    this.renderTree = this.renderTree.bind(this);
  }	

  componentDidMount(){
    const {dispatch, sourceId} = this.props;
    dispatch(init(sourceId));
  }

  renderTreeNodes(node){

      const children = node.children ?  node.children.map((child)=>{
          return this.renderTreeNodes(child);       
      }) : null;

      return <g>
                <circle cx={node.x} cy={node.y} r={20} fill="white" stroke="black"/>
                {children}
             </g>  
  }

  renderTreeLinks(node){
      const links = _links(node);
      return links.map((link)=>{
          return <path style={{fill:"none", stroke:"black", strokeWidth:2}} d={_link(link)}/>
      });
  }

  renderTree(){
      const {provenance} = this.props;
    
      return <g>
                <g transform={"translate(0,100)"}>
                  {this.renderTreeLinks(provenance)}
                </g>
                <g transform={"translate(0,100)"}>
                  {this.renderTreeNodes(provenance)}
                </g>
                
            </g>
  }

  renderNode(sourceId, node){
     
     
      const {nodesById} = this.props;


      const shapeprops = {
        id: node.id,
        sourceId,
      }

      switch(node.type){
          
          case "circle":
            return <Circle key={node.id} {...shapeprops}/>

          case "ellipse":
            return <Ellipse key={node.id} {...shapeprops}/>

          case "rect":
            return <Rect key={node.id} {...shapeprops}/>
          
          case "text":
            return <Text key={node.id} {...shapeprops}/>

          case "path":
            return <Path key={node.id} {...shapeprops}/>
          
          case "line":
            return <Line key={node.id} {...shapeprops}/>

          case "group":
            return <Group key={node.id} {...{
                id: node.id,
                sourceId,
                nodesById,
            }}/>

       }
       return null;
  }

  renderNodes(){
      //eventually can just pass in the id, and nodes will do the rest themselves.
  
      const {nodes, nodesById, sourceId} = this.props;
   
      return nodes.map((id)=>{
        return this.renderNode(sourceId, nodesById[id]);
      });
  }

  render() {

  	const {canvasdimensions, dimensions:{w,h}} = this.props;
    
    return  <div>
              <div className="canvas" style={{width:"100%", height:"100%"}}>
                <svg id="svgchart" viewBox={`0 0 ${canvasdimensions.w} ${canvasdimensions.h}`} width={w} height={h} preserveAspectRatio="xMinYMin slice">
    		          {this.renderNodes()}	
    	          </svg>
              </div>
              <div style={{top: 0, right: 0, background:"grey", opacity:0.8, position:"absolute", height:h, w:500}}>
                  <svg width={500} height={h}>
                    {this.renderTree()}
                  </svg>
              </div>
            </div>
  }
}


function select(state, newProps) {

  return {
    dimensions: state.screen.dimensions,
    canvasdimensions: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].canvasdimensions : {w:0,h:0},
    nodes: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].nodes : [],
    provenance: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].provenance : {},
    nodesById: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].nodesById : {},
  };
}

UIBuilder.contextTypes = {
  store: React.PropTypes.object,
}

export default connect(select)(UIBuilder);