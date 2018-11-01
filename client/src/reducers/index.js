import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import profileReducer from "./profileReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  course: courseReducer,
  quiz: quizReducer
});
