import { combineReducers } from "redux";
import urlReducer from "./urlReducer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
    url: urlReducer,
    error: errorReducer
})

export default rootReducer;