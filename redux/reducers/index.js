import { combineReducers } from "redux";
import migrationReducers from "./migrationReducer";

export default combineReducers({
  migration: migrationReducers
});