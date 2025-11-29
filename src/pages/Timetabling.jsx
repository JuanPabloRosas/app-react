import { useState } from "react";
import GanttChart from "../components/GanttChart";
import GanttSVG from "../components/GanttSVG";
import { useMemo } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [objective, setObjective] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [capacidad, setCapacidad] = useState(10);
  const [costoPerdida, setCostoPerdida] = useState(1000);
  const [jornada, setJornada] = useState(24);

  const fetchTimetable = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api-timetabling-app-react-671543932444.northamerica-south1.run.app/solve",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sucursal: "DummySucursal",
            staff: [{ empleado: "Ana" }, { empleado: "Luis" }],
            capacidad_atencion: Number(capacidad),
            costo_perdida: Number(costoPerdida),
            jornada_laboral: Number(jornada),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json.timetable);
      setObjective(json.costo_total);
    } catch (err) {
      console.error("Error al llamar la API:", err);
      setError(err.message);
      setData([
        { Empleado: "Ana", Turno: "T1", Dia: 0, Inicio: 6, Fin: 15, Costo: 120 },
        { Empleado: "Luis", Turno: "T2", Dia: 0, Inicio: 9, Fin: 18, Costo: 100 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const totalSemanal = useMemo(() => {
  return data.reduce(
    (acc, row) => acc + row.Costo * jornada, 0);
      }, [data, jornada]);
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
    <div className='hero' style={{ padding: 0 }}>
      <h1>Horarios de Personal (Timetabling)</h1>

      <h2>Datos necesarios</h2>
      <div className="grid gap-6">

        {/* Capacidad */}
        <div className="param-box">
          <label>Capacidad (personas/hora): {capacidad}</label>
          <input
            type="range"
            min="10"
            max="20"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
          <input
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
        </div>

        {/* Costo perdida */}
        <div className="param-box">
          <label>Costo de pérdida ($):</label>
          <input
            type="number"
            value={costoPerdida}
            onChange={(e) => setCostoPerdida(e.target.value)}
          />
        </div>

        {/* Jornada */}
        <div className="param-box">
          <label>Jornada laboral (hrs):</label>
          <input
            type="number"
            min="24"
            max="168"
            value={jornada}
            onChange={(e) => setJornada(e.target.value)}
          />
        </div>

      </div>

      {/* -------------- BOTÓN PARA CALCULAR -------------- */}
      <button
        onClick={fetchTimetable}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Calcular horario
      </button>
      {/* -------------------------------------------------- */}

      <div style={{
      fontSize: "32px",
      fontWeight: "bold",
      margin: "20px 0",
      padding: "20px",
      background: "#f5f5f5",
      borderRadius: "10px",
      textAlign: "center",
    }}>

      Costo Total: {
  typeof objective === "number"
    ? `$ ${objective.toFixed(2)}`
    : "—"
}
    </div>
      <div>
    Costo Semanal: {
      typeof totalSemanal === "number"
        ? `$ ${totalSemanal.toFixed(2)}`
        : "—"
    }
  </div>
      <h1>Horarios de Personal</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#4f46e5", color: "white" }}>
            <th>Empleado</th>
            <th>Turno</th>
            <th>Día</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Costo por hora</th>
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
      {/* Aquí aparece el Gantt */}
      <GanttSVG data={data} width={1000} />
    </div>
  );
}
