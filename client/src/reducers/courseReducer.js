import {
  GET_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  ADD_COURSE,
  COURSES_LOADING,
  RESET_MSG
} from "../actions/types";

const intialState = {
  courses: [],
  course: {},
  loading: false,
  msg: ""
};

export default function(state = intialState, action) {
  switch (action.type) {
    case RESET_MSG:
      return {
        ...state,
        msg: ""
      };
    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_COURSE:
      return {
        ...state,
        course: action.payload,
        msg: action.msg,
        loading: false
      };
    case UPDATE_COURSE:
      return {
        ...state,
        course: action.payload,
        msg: action.msg,
        loading: false
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
