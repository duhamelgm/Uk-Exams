import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  course: courseReducer,
  notification: notificationReducer
});
