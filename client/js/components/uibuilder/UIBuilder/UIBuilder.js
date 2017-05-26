import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Circle,Ellipse,Text,Rect,Line,Path,Group} from '../svg/';
import {init} from '../../../actions/UIBuilderActions';
import {TREEPADDING, TREEMARGIN, NODEWIDTH, NODEHEIGHT} from '../../../constants/ViewConstants';

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
                        y:node.y, 
                        nid: node.data.node.nid,
                      }, 
                      target: {
                        x:child.x, 
                        y:child.y,
                        nid:child.data.node.nid,
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


const _datafor = (link, datapath)=>{
  return datapath.hops.reduce((acc, item)=>{
    //console.log(`checking ${link.target.nid}->${link.source.nid} against ${item.source}->${item.target}`)
    if (item.source === link.target.nid && item.target === link.source.nid){
      return datapath.data[item.msg];
    }
    return acc;
  },{});
}

class UIBuilder extends Component {

  constructor(props, context){
  	super(props, context);
    this.renderTrees = this.renderTrees.bind(this);
    this.state = {datalink:{}};
  }	

  componentDidMount(){
    const {dispatch, sourceId} = this.props;
    dispatch(init(sourceId));
  }

  renderTrees(){
      const {provenance, dimensions:{w,h}} = this.props;
      const containerheight = (h-TREEMARGIN)/provenance.length;
      const treeheight = (containerheight-TREEPADDING) + NODEHEIGHT;

      const trees = provenance.map((p, i)=>{

        const datastyle = {
          position : 'absolute',
          background: 'blue',
          margin:0,
          padding: 0,
          top : TREEMARGIN  + (i * containerheight) + treeheight,
          width: 500,
          height: containerheight - treeheight,
          opacity: 0.6,
        }

        const link = this.state.datalink[p.mappingId];
        let data = null;

        if (link && this.props.datapath[p.sourceId]){
            data = _datafor(link,  this.props.datapath[p.sourceId].path);
        }

        return  <div style={{background:'green'}}>
                  <svg key={i} width={500} height={containerheight}>
                      <g key={p.mappingId} transform={`translate (0,${NODEHEIGHT/2})`}>
                       {this.renderTreeLinks(p.tree)}
                       {this.renderTreeNodes(p.tree)}
                       {this.renderTreeData(p.tree, p.mappingId)}
                      </g>  
                  </svg>
                  <div style={datastyle}>
                      <pre>
                        {data && JSON.stringify(data.payload ? data.payload:data, null, 4)}
                      </pre>
                  </div>
                </div>
                
      });      
      
      return  <div style={{marginTop:TREEMARGIN}}>
                {trees}
              </div>

      

  }
  renderTreeNodes(node){

      const children = node.children ?  node.children.map((child)=>{
          return this.renderTreeNodes(child);       
      }) : null;

      const mainrectprops = {
        fill:  node.data ? node.data.node.color : 'black',
        width: NODEWIDTH,
        height: NODEHEIGHT,
        x: node.x - NODEWIDTH /2,
        y: node.y - NODEHEIGHT/2,
        stroke: "#fff",
        strokeWidth:2,
      };

      const textprops = {
        y: node.y + 10,
        x: node.x,
      }

      const icontxt = node.data ? node.data.node.unicode : '\uf040'
      
      const iconstyle = {
          fontFamily: 'FontAwesome',
          fontSize: 30,
          fill: 'white',
          textAnchor: 'middle',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',   
          KhtmlUserSelect: 'none',   
          MozUserSelect: 'none',   
          MsUserSelect: 'none',       
          userSelect: 'none',  
      }
    
      return  <g key={node.data.node.nid}>
                  <rect className="node" {...mainrectprops}></rect>
                  <text style={iconstyle} {...textprops}>{icontxt}</text>
                  {children}
              </g>

  }

  renderTreeLinks(node){
      const links = _links(node);
      return links.map((link, i)=>{
          return <path key={i} style={{fill:"none", stroke:"black", strokeWidth:2}} d={_link(link)}/>
      });
  }

  renderTreeData(node, mappingId){
     
     const links = _links(node);

     return links.map((link, i)=>{
  
        const props = {
          cx: link.target.x + (link.source.x-link.target.x)/2,
          cy: link.target.y + (link.source.y-link.target.y)/2,
          r:10,
        }

        const style ={
          fill: 'white',
          stroke: 'black',
        }

        return <circle onClick={()=>{this.setState({datalink:{[mappingId]:link}})}} key={i} {...props} style={style}></circle>
     });
  }

  

  renderData(){
    if (this.state.datalink){
      const {datapath: {path, result}} = this.props; 
      const data = _datafor(this.state.datalink, path);

      const datastr = JSON.stringify(data.payload ? data.payload : data, null, 4);
      const finalstr = JSON.stringify(result.payload, null, 4);
      return <div>
                  <pre>{datastr}</pre>
                  <pre>{finalstr}</pre>
              </div>
    }
    return null;
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

    //just need the actual data here as this is the final thing to come out!
  	const {canvasdimensions, dimensions:{w,h}, provenance} = this.props;
    
    return  <div>
              <div className="canvas" style={{width:"100%", height:"100%"}}>
                <svg id="svgchart" viewBox={`0 0 ${canvasdimensions.w} ${canvasdimensions.h}`} width={w} height={h} preserveAspectRatio="xMinYMin slice">
    		          {this.renderNodes()}	
    	          </svg>
              </div>
              {provenance.length > 0 && <div style={{top: 0, right: 0, background:"#e3e3e3", opacity:0.95, position:"absolute", height:h, w:500}}>
                  {this.renderTrees()}
              </div>}
            </div>
  }
}


function select(state, newProps) {

  return {
    dimensions: state.screen.dimensions,
    canvasdimensions: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].canvasdimensions : {w:0,h:0},
    nodes: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].nodes : [],
    provenance: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].provenance : [],
    nodesById: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].nodesById : {},
    datapath: state.uibuilder[newProps.sourceId] ? state.uibuilder[newProps.sourceId].datapath : {},
  };
}

UIBuilder.contextTypes = {
  store: React.PropTypes.object,
}

export default connect(select)(UIBuilder);