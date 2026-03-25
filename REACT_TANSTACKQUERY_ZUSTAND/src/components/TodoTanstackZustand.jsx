import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../store/useFilterStore";

function TodosTanstackZustand() {
  const { filter, setFilter } = useFilterStore();

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
      <h2>React + TanStack Query + Zustand</h2>

      <p><strong>Filter global (Zustand):</strong> {filter}</p>

      <button onClick={() => setFilter("all")}>Todos</button>
      <button onClick={() => setFilter("completed")}>Completados</button>
      <button onClick={() => setFilter("pending")}>Pendientes</button>

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

export default TodosTanstackZustand;