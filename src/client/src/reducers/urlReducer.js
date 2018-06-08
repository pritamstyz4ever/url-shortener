import * as actionTypes from "../actions/action-types";

const urlReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SHORTEN_URL:
      return action.payload;
    default:
      return state;
  }
};

export default urlReducer;