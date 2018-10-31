import {
  GET_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  ADD_COURSE,
  GET_COURSE_QUIZ
} from "../actions/types";

const intialState = {
  courses: [],
  course: {},
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_COURSE_QUIZ:
      return {
        ...state,
        course: action.payload
      };
    case ADD_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case UPDATE_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload
      };
    default:
      return state;
  }
}
