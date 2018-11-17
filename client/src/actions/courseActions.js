import axios from "axios";
import axiosDefaults from "axios/lib/defaults";

import {
  GET_COURSE,
  UPDATE_COURSE,
  GET_ERRORS,
  GET_COURSES,
  ADD_COURSE,
  COURSES_LOADING,
  GET_EXAM_INFO,
  BUY_COURSE_SUBSCRIPTION,
  GET_EXAM_QUESTIONS
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

// Buy subscription course
export const buyCourseSubscription = (handle, data) => dispatch => {
  axios
    .post(`api/courses/${handle}/buy`, data)
    .then(res => {
      window.location.href = res.data.url;
    })
    .catch(err => {
      dispatch({
        type: BUY_COURSE_SUBSCRIPTION,
        payload: {}
      });
    });
};

//
//    EXAM ACTIONS
//

// Get exam info
export const getExamInfo = handleCourse => dispatch => {
  dispatch(setCourseLoading());

  axios
    .get(`api/courses/${handleCourse}/exam/info`)
    .then(res => {
      dispatch({
        type: GET_EXAM_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
};

// Get exam questions
export const getExamQuestions = (handleCourse, examRequest) => dispatch => {
  dispatch(setCourseLoading());

  axios
    .post(`api/courses/${handleCourse}/exam/questions`, examRequest)
    .then(res => {
      dispatch({
        type: GET_EXAM_QUESTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
};

//
//    ADMIN ACTIONS
//

// Add course
export const addCourse = course => dispatch => {
  dispatch(setCourseLoading());

  axios
    .post("api/courses/", course)
    .then(res => {
      dispatch({
        type: ADD_COURSE,
        payload: res.data,
        msg: "created"
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
  dispatch(setCourseLoading());

  axios
    .post(`api/courses/${handle}`, course)
    .then(res => {
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data,
        msg: "updated"
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//
//    UTILS ACTIONS
//

// Course loading
export const setCourseLoading = () => {
  return {
    type: COURSES_LOADING
  };
};
