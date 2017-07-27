import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
const store = configureStore();
const {dispatch} = store;


//init("databox","testApp", dispatch);
console.log("ok, in app!");
render(<Root store={store} />,document.getElementById('root'));
