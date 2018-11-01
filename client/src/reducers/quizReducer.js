import { GET_QUIZ } from "../actions/types";

const intialState = {
  quiz: [],
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_QUIZ:
      return {
        ...state,
        quiz: action.payload
      };
    default:
      return state;
  }
}
