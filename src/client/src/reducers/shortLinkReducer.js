import * as actionTypes from "../actions/action-types";

const shortLinkReducer = (state, action) => {
  state = state || {}
  switch (action.type) {
    case actionTypes.SHORTEN_URL:
      return action.payload;
    default:
      return state;
  }
};

export default shortLinkReducer;