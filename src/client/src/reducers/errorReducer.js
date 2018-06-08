import * as actionType from "../actions/action-types";

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.DISPLAY_ERR:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;