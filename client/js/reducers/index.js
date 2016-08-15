import { combineReducers } from 'redux';
import apps from './apps';
import appstore from './appstore';
import installer from './installer';
import network from './network';
import screen from './screen';

import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  apps,
  appstore,
  installer,
  network,
  screen,
  routing: routerReducer,
});

export default rootReducer;
