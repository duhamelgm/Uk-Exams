import { ADD_MSG, RESET_MSG } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MSG:
      return action.payload;
    case RESET_MSG:
      return initialState;
    default:
      return state;
  }
}
