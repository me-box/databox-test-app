import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import Apps from './Apps';
import Debug from './Debug';
import DevTools from './DevTools';
import { IndexRedirect, Router, Route, hashHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';


export default class Root extends Component {
  
  render(){
	
    const { store } = this.props;
    const history = syncHistoryWithStore(hashHistory, store);
 
    return (
      <Provider store={store}>
        <div>  
        	<Router history={history}>
              <Route path="/" component={App}>
            	<Route path="app" component={Apps}/>
                <Route path="debugger" component={Debug}/>
                <IndexRedirect to="app" />
                <Route path="*" component={Apps}/>
              </Route>
          	</Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

