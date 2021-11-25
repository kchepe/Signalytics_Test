import { combineReducers } from "redux";
import contactReducer from "./ContactReducer";

const reducers = combineReducers({
  contact: contactReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
