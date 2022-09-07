// import { combineReducers } from "redux";
// import streamReducers from "./streamReducers";
// import authReducers from "./authReducers";
// import { reducer as formReducer } from "redux-form";
// export default combineReducers({
//   auth: authReducers,
//   form: formReducer,
//   streams: streamReducers,
// });

import { combineReducers } from "redux";

import authReducers from "./authReducers";
import streamReducers from "./streamReducers";

export default combineReducers({
  auth: authReducers,
  streams: streamReducers,
});
