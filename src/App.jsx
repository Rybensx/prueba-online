import { useEffect, useState } from "react";

const API_URL = "https://backend-prueba-production-a3c3.up.railway.app/tareas";

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const cargarTareas = async () => {
    const res = await fetch(`${API_URL}/tareas`);
    const data = await res.json();
    setTareas(data);
  };

  const agregarTarea = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) return;

    await fetch(`${API_URL}/tareas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });

    setTitulo("");
    cargarTareas();
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "40px", background: "#0f172a", color: "white" }}>
      <h1>App Full Stack 🚀</h1>

      <form onSubmit={agregarTarea}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe una tarea"
          style={{ padding: "12px", width: "300px", marginRight: "10px" }}
        />
        <button style={{ padding: "12px" }}>Agregar</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;