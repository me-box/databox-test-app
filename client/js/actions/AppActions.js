import { APP_REMOVED, APP_MESSAGE } from '../constants/ActionTypes';

export function appRemoved(appId) {
  return {
    type: APP_REMOVED,
    appId,
  };
}
export function newMessage(msg) {

  const {id, name, view, data} = msg;
 
  return {
    type: APP_MESSAGE,
    //policy: view === "list" ? "replace" : "append", 
    id,
    name,
    view,
    data
  }
}