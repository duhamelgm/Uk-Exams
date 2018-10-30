import axios from "axios";

import {
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  UPDATE_PROFILE
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("api/profiles")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Update profile
export const updateProfile = userProfile => dispatch => {
  dispatch(setProfileLoading());

  axios
    .post("api/profiles", userProfile)
    .then(res => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
