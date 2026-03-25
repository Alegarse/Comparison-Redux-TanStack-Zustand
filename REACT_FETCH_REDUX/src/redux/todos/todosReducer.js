import {
  TODOS_FETCH_START,
  TODOS_FETCH_SUCCESS,
  TODOS_FETCH_ERROR
} from "./todosActions";

const initialState = {
  todos: [],
  loading: false,
  error: null
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOS_FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TODOS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload
      };

    case TODOS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};