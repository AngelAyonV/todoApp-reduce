import { useTareas } from "../TareasContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Table() {
    const { state, dispatch, setTareaEditar } = useTareas();

    const getRowStyle = (importance) => {
        switch (importance) {
            case 'High':
                return "table-danger"; // Rojo claro
            case 'Medium':
                return "table-warning"; // Amarillo claro
            case 'Low':
                return "table-success"; // Verde claro
            default:
                return "";
        }
    };

    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            {state.tareas.length === 0 ? (
                <p>No tasks registered.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Description</th>
                                <th>Importance</th>
                                <th>Date and Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.tareas.map((tarea) => (
                                <tr key={tarea.id} className={getRowStyle(tarea.importancia)}>
                                <td>{tarea.descripcion}</td>
                                    <td>{tarea.importancia}</td>
                                    <td>{tarea.fecha}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2 me-3" onClick={() => setTareaEditar(tarea)}>Edit</button>
                                        <button className="btn btn-success btn-sm" onClick={() => dispatch({ type: "ELIMINAR_TAREA", payload: tarea.id })}>Task Complete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Table;
