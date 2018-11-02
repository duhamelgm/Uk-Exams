import axios from "axios";

import {
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  UPDATE_PROFILE,
  ADD_COURSE_TO_PROFILE
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

// Add course to profile
export const addCourseToProfile = handle => dispatch => {
  axios
    .post(`api/profiles/add-course/${handle}`)
    .then(res => {
      dispatch({
        type: ADD_COURSE_TO_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_COURSE_TO_PROFILE,
        payload: {}
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
