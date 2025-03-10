import { useState, useEffect } from "react";
import { useTareas } from "../TareasContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Form() {
    const { dispatch, tareaEditar, setTareaEditar } = useTareas();
    const [descripcion, setDescripcion] = useState("");
    const [importancia, setImportancia] = useState("Low");

    useEffect(() => {
        if (tareaEditar) {
            setDescripcion(tareaEditar.descripcion);
            setImportancia(tareaEditar.importancia);
        }
    }, [tareaEditar]);

    const handleSubmit = () => {
        if (!descripcion) return;

        const nuevaTarea = {
            id: tareaEditar ? tareaEditar.id : Date.now(),
            descripcion,
            importancia,
            fecha: new Date().toLocaleString()
        };

        if (tareaEditar) {
            dispatch({ type: "EDITAR_TAREA", payload: nuevaTarea });
            setTareaEditar(null);
        } else {
            dispatch({ type: "AGREGAR_TAREA", payload: nuevaTarea });
        }

        setDescripcion("");
        setImportancia("Low");
    };

    return (
        <div className="container mt-4">
            <h2>{tareaEditar ? "Edit Task" : "Add Task"}</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description of task"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    value={importancia}
                    onChange={(e) => setImportancia(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                {tareaEditar ? "Save Changes" : "Add"}
            </button>
        </div>
    );
}

export default Form;
