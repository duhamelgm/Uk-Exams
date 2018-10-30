import axios from "axios";
import axiosDefaults from "axios/lib/defaults";

import {
  GET_COURSE,
  UPDATE_COURSE,
  GET_ERRORS,
  GET_COURSES,
  ADD_COURSE
} from "./types";

axiosDefaults.baseURL = "/";

// Get courses
export const getCourses = () => dispatch => {
  axios
    .get("api/courses/")
    .then(res => {
      dispatch({
        type: GET_COURSES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSES,
        payload: null
      });
    });
};

// Get Dashboard courses
export const getDashboardCourses = () => dispatch => {
  axios
    .get("api/courses/dashboard")
    .then(res => {
      dispatch({
        type: GET_COURSES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSES,
        payload: null
      });
    });
};

// Get course
export const getCourse = handle => dispatch => {
  axios
    .get(`api/courses/${handle}`)
    .then(res => {
      dispatch({
        type: GET_COURSE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSE,
        payload: null
      });
    });
};

// Add course
export const addCourse = course => dispatch => {
  axios
    .post("api/courses/", course)
    .then(res => {
      dispatch({
        type: ADD_COURSE,
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

// Update course
export const updateCourse = (course, handle) => dispatch => {
  axios
    .post(`api/courses/${handle}`, course)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE,
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
