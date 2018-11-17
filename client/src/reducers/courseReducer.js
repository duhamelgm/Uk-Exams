import {
  GET_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  ADD_COURSE,
  COURSES_LOADING,
  BUY_COURSE_SUBSCRIPTION,
  GET_EXAM_INFO,
  GET_EXAM_QUESTIONS
} from "../actions/types";

const intialState = {
  courses: [],
  course: {},
  info: [],
  exam: [],
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_EXAM_QUESTIONS:
      return {
        ...state,
        exam: action.payload,
        loading: false
      };
    case GET_EXAM_INFO:
      return {
        ...state,
        info: action.payload,
        loading: false
      };
    case BUY_COURSE_SUBSCRIPTION:
      return {
        ...state
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
    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
