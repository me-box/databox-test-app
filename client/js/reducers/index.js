import { combineReducers } from 'redux';
import apps from './apps';
import appstore from './appstore';
import installer from './installer';
import network from './network';
import screen from './screen';
import layout from './layout';

import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  apps,
  layout,
  appstore,
  installer,
  network,
  screen,
  routing: routerReducer,
});

export default rootReducer;
