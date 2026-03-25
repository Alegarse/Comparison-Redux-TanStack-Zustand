import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/filter/filterActions";

function TodosTanstackRedux() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.filterState);

  const {
    data: todos = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");

      if (!response.ok) {
        throw new Error("Error al obtener los todos");
      }

      const data = await response.json();
      console.log("Datos devueltos: ", data);
      
      // Aqui nos quedamos solo con los 10 primeros resultados
      return data.slice(0, 10);
    }
  });

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div>
      <h2>React + TanStack Query + Redux</h2>

      <p><strong>Filter global (Redux):</strong> {filter}</p>

      <button onClick={() => dispatch(setFilter("all"))}>Todos</button>
      <button onClick={() => dispatch(setFilter("completed"))}>Completados</button>
      <button onClick={() => dispatch(setFilter("pending"))}>Pendientes</button>

      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error.message}</p>}

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

export default TodosTanstackRedux;