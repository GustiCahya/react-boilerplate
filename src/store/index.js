import notesReducer from "./notes/reducers";
import counterReducer from "./counter/reducers";
import userReducer from "./user/reducers";
import { combineReducers } from "redux";

export default combineReducers({
    notes: notesReducer,
    counter: counterReducer,
    user: userReducer
});