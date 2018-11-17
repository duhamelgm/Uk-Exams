import { RESET_MSG } from "./types";

export const resetMsg = () => dispatch => {
  dispatch({
    type: RESET_MSG
  });
};
