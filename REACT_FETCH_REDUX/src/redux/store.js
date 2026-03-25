import { createStore, combineReducers } from "redux";
import { todosReducer } from "./todos/todosReducer";
import { filterReducer } from "./filter/filterReducer";

const rootReducer = combineReducers({
  todosState: todosReducer,
  filterState: filterReducer
});

export const store = createStore(rootReducer);