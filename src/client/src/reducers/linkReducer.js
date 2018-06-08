import * as actionTypes from "../actions/action-types";

const linkReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LINK_FETCHED:
            return action.payload;  
        default:
            return state;
    };
}
export default linkReducer;