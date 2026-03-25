import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosError
} from "../redux/todos/todosActions";
import { setFilter } from "../redux/filter/filterActions";

function TodosReduxFetch() {
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector((state) => state.todosState);
  const { filter } = useSelector((state) => state.filterState);

  useEffect(() => {
    const getTodos = async () => {
      dispatch(fetchTodosStart());

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        if (!response.ok) {
          throw new Error("Error al obtener los todos");
        }

        const data = await response.json();
        dispatch(fetchTodosSuccess(data.slice(0, 10)));
      } catch (err) {
        dispatch(fetchTodosError(err.message));
      }
    };

    getTodos();
    
  }, [dispatch]);

  useEffect(() => {
    console.log("Filter: ",filter)
  },[filter])

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div>
      <h2>React + Fetch + Redux</h2>

      <p><strong>Filter global (Redux):</strong> {filter}</p>

      <button onClick={() => dispatch(setFilter("all"))}>Todos</button>
      <button onClick={() => dispatch(setFilter("completed"))}>Completados</button>
      <button onClick={() => dispatch(setFilter("pending"))}>Pendientes</button>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "✔" : "✘"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosReduxFetch;