import axios from "axios";

import { GET_QUIZ } from "./types";

// Get course quiz
export const getQuiz = handle => dispatch => {
  axios
    .get(`api/quiz/${handle}`)
    .then(res => {
      dispatch({
        type: GET_QUIZ,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_QUIZ,
        payload: null
      });
    });
};
