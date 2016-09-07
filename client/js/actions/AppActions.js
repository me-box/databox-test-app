import { APP_REMOVED, APP_MESSAGE } from '../constants/ActionTypes';

export function appRemoved(appId) {
  return {
    type: APP_REMOVED,
    appId,
  };
}
export function newMessage(msg) {

  console.log("got new message");
  console.log(msg);
  const {sourceId, payload, layout} = msg;
  const {id, name, view, data} = payload;
  
 
  return {
    type: APP_MESSAGE,
    id,
    sourceId,
    layout,
    name,
    view,
    data,
  }
}