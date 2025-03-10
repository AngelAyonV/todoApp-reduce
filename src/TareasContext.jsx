import { createContext, useReducer, useContext, useState } from "react";

// Función para obtener tareas desde Local Storage
const obtenerTareasGuardadas = () => {
  const tareasGuardadas = localStorage.getItem("tareas");
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
};

// Estado inicial (ahora carga desde Local Storage)
const initialState = {
  tareas: obtenerTareasGuardadas()
};

// Reducer para manejar las tareas
function tareasReducer(state, action) {
  let nuevoEstado;
  
  switch (action.type) {
    case "AGREGAR_TAREA":
      nuevoEstado = {
        ...state,
        tareas: [...state.tareas, action.payload]
      };
      break;

    case "EDITAR_TAREA":
      nuevoEstado = {
        ...state,
        tareas: state.tareas.map(tarea =>
          tarea.id === action.payload.id ? action.payload : tarea
        )
      };
      break;

    case "ELIMINAR_TAREA":
      nuevoEstado = {
        ...state,
        tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
      };
      break;

    default:
      return state;
  }

  // Guardar el nuevo estado en Local Storage
  localStorage.setItem("tareas", JSON.stringify(nuevoEstado.tareas));
  return nuevoEstado;
}

// Crear el contexto
const TareasContext = createContext();

// Proveedor del contexto
export function TareasProvider({ children }) {
  const [state, dispatch] = useReducer(tareasReducer, initialState);
  const [tareaEditar, setTareaEditar] = useState(null);

  return (
    <TareasContext.Provider value={{ state, dispatch, tareaEditar, setTareaEditar }}>
      {children}
    </TareasContext.Provider>
  );
}

// Hook para usar el contexto en los componentes
export function useTareas() {
  return useContext(TareasContext);
}
