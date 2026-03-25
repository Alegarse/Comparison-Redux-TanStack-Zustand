export const TODOS_FETCH_START = "TODOS_FETCH_START";
export const TODOS_FETCH_SUCCESS = "TODOS_FETCH_SUCCESS";
export const TODOS_FETCH_ERROR = "TODOS_FETCH_ERROR";

export const fetchTodosStart = () => ({
  type: TODOS_FETCH_START
});

export const fetchTodosSuccess = (todos) => ({
  type: TODOS_FETCH_SUCCESS,
  payload: todos
});

export const fetchTodosError = (error) => ({
  type: TODOS_FETCH_ERROR,
  payload: error
});