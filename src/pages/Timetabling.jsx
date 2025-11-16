import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(
          "https://timetabling-api-671543932444.northamerica-south1.run.app/solve",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sucursal: "DummySucursal",
              staff: [{ empleado: "Ana" }, { empleado: "Luis" }]
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json.timetable); // tu API devuelve {"timetable": [...]}
      } catch (err) {
        console.error("Error al llamar la API:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

    if (loading) return (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{
      border: "8px solid #f3f3f3",
      borderTop: "8px solid #4f46e5",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite"
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

  return (
    <div className='hero' style={{ padding: 0}}>
      <h1>Horarios de Personal (Timetabling)</h1>
        <p>
          Optimiza y visualiza los turnos de tu equipo de manera clara e interactiva. 
          Los horarios se muestran en una <strong>tabla</strong> y un <strong>diagrama de Gantt</strong>, 
          permitiendo identificar rápidamente la distribución de turnos y la cobertura del personal. 
          Esta sección es un ejemplo de cómo se puede gestionar la planificación de recursos humanos 
          de manera eficiente, con posibilidad de expandirse en el futuro a roles de usuario, sucursales y reglas avanzadas.
        </p>
      <h1>DEMO</h1>
      <p>Para este ejemplo se busca minimizar el costo de asignar a un empleado en un turno en especifico. Consideramos
        una penalización por no atender a un cliente y una capacidad de 10 clientes por hora por epleado.
      </p>
      <h2>Datos necesarios</h2>
      
      <h1>Horarios de Personal</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#4f46e5", color: "white" }}>
            <th>Empleado</th>
            <th>Turno</th>
            <th>Día</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{row.Empleado}</td>
              <td>{row.Turno}</td>
              <td>{row.Dia}</td>
              <td>{row.Inicio}</td>
              <td>{row.Fin}</td>
              <td>{row.Costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
