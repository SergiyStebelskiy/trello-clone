import { combineReducers } from "redux";
import boards from "./boards";
import popup from "./popup";
import photos from "./photos";

const rootReducer = combineReducers({
  boards,
  popup,
  photos,
});

export default rootReducer;
