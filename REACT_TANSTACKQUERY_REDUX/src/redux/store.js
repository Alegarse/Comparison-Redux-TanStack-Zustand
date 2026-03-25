import { createStore, combineReducers } from "redux";
import { filterReducer } from "./filter/filterReducer";

const rootReducer = combineReducers({
  filterState: filterReducer
});

export const store = createStore(rootReducer);