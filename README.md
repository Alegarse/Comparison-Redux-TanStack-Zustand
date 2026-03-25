# Comparativa React con Redux, TanStackQuery y Zustand
Aquí teneís una comparativa rápida de uso de estado global con peticiones fetch en React.   
Veremos desde la forma clásica (Redux) hasta la más actual (TanStack + Zustand) en comparativa.   
En este repositorio tendréis un ejemplo completo de una carga de datos desde la API pública <a href="https://jsonplaceholder.typicode.com/">{JSON} Placeholder</a>.   
El código está disponible para cada casuística en su carpeta correspondiente.   
Si te gusta mi contenido, estrellita :)   


## Guías de uso de cada caso

### React + Fetch clásico + Redux

#### Instalación
Vite [React - Javascript] + npm install react-redux redux

#### Casuística
La estructura base sería:
```
src/
  main.jsx
  App.jsx
  redux/
    store.js
    todos/
      todosActions.js
      todosReducer.js
    filter/
      filterActions.js
      filterReducer.js
  components/
    TodosReduxFetch.jsx
```
En este caso Redux guarda:
- Datos de API
- Loading
- Error
- Filter global
Redux está haciendo de gestor de estado remoto y de estado global de cliente al mimso tiempo.
<hr>

### React + TanstackQuery + Redux

#### Instalación
Vite [React - Javascript] + npm install react-redux redux @tanstack/react-query

#### Casuística
En este caso: 
- **Tanstack Query** guarda los datos remotos
- **Redux** guarda solo es estado global del cliente (filter)
TanStack sustituye la parte de fetch + loading + error + almacenamiento manual remoto en Redux.

#### Guía configuración
La estructura base sería:
```
src/
  main.jsx
  App.jsx
  redux/
    store.js
    filter/
      filterActions.js
      filterReducer.js
  components/
    TodosTanstackRedux.jsx
```
Dentro del provider de Redux, tenemos que meter el **QueryClientProvider** como si fuera un compoenente, teniendo de parámetro **client** que es el queryCliente que se crea de TanStack:
```
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
```
Luego, la petición de datos no se maneja por estado de Redux, sino a través de TanStack usando su hook **useQuery**.
La petición devolverá los elementos:
- `data`: Datos devueltos de la petición fetch,
- `isLoading`: Estado de cuando está aún cargando,
- `isError`: Estado de que ha habido un error,
- `error`: Objeto de error si ha sucedido este
En código, su uso sería el siguiente:
```
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
  ```
  Donde renombramos la propiedad `data` a `todos` para usarla en el componente o página, que generalmente es un array de objetos. [{},{},...].
<hr>

### React + TanstackQuery + Zustand

#### Instalación
Vite [React - Javascript] + npm install @tanstack/react-query zustand

#### Casuística
En este caso: 
- **Tanstack Query**gestiona los datos remotos
- **Zustand** gestiona el estado global del cliente
- Desaparecen actions, reducers y provider de Redux
La arquitectura es más ligera que con Redux, pero conceptualmente se separan responsabilidades igual de bien.

#### Guía configuración
La estructura base sería:
```
src/
  main.jsx
  App.jsx
  store/
    useFilterStore.js
  components/
    TodosTanstackZustand.jsx
```
En la carga inicial, desaparece el provider de Redux y solo cargamos envolviendo la SPA con **QueryClientProvider**
```
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```
En este caso desaparece el core de redux y solo necesitamos el store, con el del use que vayamos a usar, en este caso se llama filter, asi que usaremos **useFilterStore**.
En este Store, se aunan la definición del valor por defecto y el set de darle el valor. Es como un actions y reducer juntos.
Aquí la clave está en la función **create** de Zustand, que se encarga de meter ese estado global.
```
import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filter: "all",
  setFilter: (newFilter) => set({ filter: newFilter })
}));
```
Luego, a la hora de usarlo en el comnponente, cargaríamos los datos a través de su hook **useFilterStore**, que se usa parecido a un estado local.
```
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
```
<br><br>

### Créditos
- Uso de la API pública <a href="https://jsonplaceholder.typicode.com/">{JSON} Placeholder</a> de <a href="https://github.com/typicode">Typicode</a> para las respuestas fetch.