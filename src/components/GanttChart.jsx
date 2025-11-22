import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label
} from "recharts";

const COLORS = [
  "#4f46e5", // Indigo
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
];

function GanttChart({ data }) {
  if (!data) return null;

  // Convertimos los datos del API a formato Gantt
  const ganttData = data.map((row, i) => ({
    empleado: row.Empleado,
    turno: row.Turno,
    dia: `Día ${row.Dia}`,
    start: row.Inicio,
    end: row.Fin,
    length: row.Fin - row.Inicio,
    color: COLORS[i % COLORS.length]
  }));

  const diasUnicos = [...new Set(ganttData.map((d) => d.dia))];
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Diagrama de Gantt</h2>

      <BarChart
        width={1000}
        height={500}
        data={ganttData}
        layout="vertical"
        margin={{ top: 20, right: 50, left: 100, bottom: 20 }}
      >

        {/* Fondo con separadores */}
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />

        {/* Eje X = horas */}
        <XAxis type="number" domain={[0, 24]}>
          <Label value="Horas del día" offset={0} position="insideBottom" />
        </XAxis>

        {/* Eje Y = días */}
        
            <YAxis
        type="category"
        dataKey="dia"
        categories={diasUnicos}
        tickFormatter={(value) => value}
      />


        {/* Tooltip personalizado */}
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const d = payload[0].payload;
            return (
              <div style={{
                background: "white",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px"
              }}>
                <strong>{d.empleado} – {d.turno}</strong><br />
                Día: {d.dia}<br />
                Inicio: {d.start}:00<br />
                Fin: {d.end}:00<br />
                Duración: {d.length} h
              </div>
            );
          }}
        />

        {/* Barras */}
        <Bar
          dataKey="length"
          barSize={30}
          animationDuration={600}
          background={{ fill: "#f0f0f0" }}
          radius={[4, 4, 4, 4]}
          shape={(props) => {
          const { x, y, width, height, payload } = props;

          // Las barras deben extenderse dentro de su fila (día)
          const barX = x + payload.start * (width / 24);
          const barWidth = payload.length * (width / 24);

          return (
            <rect
              x={barX}
              y={y + 4}          // pequeño margen para separación
              width={barWidth}
              height={height - 8} // ajusta para que la barra no ocupe toda la altura
              fill={payload.color}
              rx={6}
            />
          );
        }}

        />
      </BarChart>
    </div>
  );
}

export default GanttChart;
