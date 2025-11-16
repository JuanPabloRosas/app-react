import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function TimetablingGantt() {
  const [ganttData, setGanttData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/timetabling/gantt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setGanttData(data))
      .catch((err) => console.error("Error fetching Gantt:", err));
  }, []);

  if (!ganttData) return <p>Cargando Gantt...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Gantt de Turnos</h2>
      <Plot data={ganttData.data} layout={ganttData.layout} style={{ width: "100%" }} />
    </div>
  );
}
