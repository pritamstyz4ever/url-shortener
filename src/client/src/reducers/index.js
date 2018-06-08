import { combineReducers } from "redux";
import shortLinkReducer from "./shortLinkReducer";
import linkReducer from "./linkReducer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
    shortLink: shortLinkReducer,
    error: errorReducer,
    link: linkReducer
})

export default rootReducer;