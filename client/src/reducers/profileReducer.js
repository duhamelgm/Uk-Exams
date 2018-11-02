import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  UPDATE_PROFILE,
  ADD_COURSE_TO_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COURSE_TO_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
