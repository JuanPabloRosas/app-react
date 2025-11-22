import React, { useMemo, useState } from "react";

/**
 * Props:
 *  - data: array de objetos con keys:
 *      Empleado (string), Turno, Dia (number 0..6), Inicio (number 0..24), Fin (number 0..24)
 *
 * Uso:
 *  <GanttSVG data={data} />
 */

const COLORS = [
  "#4f46e5", // Indigo
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#06b6d4", // cyan
  "#f97316", // orange
];

function getColorForEmployee(emp, employeesList) {
  const idx = employeesList.indexOf(emp);
  if (idx === -1) return COLORS[0];
  return COLORS[idx % COLORS.length];
}

export default function GanttSVG({ data = [], width = 1000, rowHeight = 56, hourWidth = null }) {
  // día labels (0..6) — puedes cambiar a ['Lun','Mar',...] si prefieres nombres
  const days = [0,1,2,3,4,5,6];

  // Normalize data (asegurar tipos numéricos)
  const tasks = useMemo(() => (data || []).map(d => ({
    empleado: d.Empleado ?? d.empleado ?? d.name,
    turno: d.Turno ?? d.turno,
    dia: Number(d.Dia ?? d.dia ?? 0),
    start: Number(d.Inicio ?? d.start ?? 0),
    end: Number(d.Fin ?? d.end ?? 0),
    raw: d
  })), [data]);

  // lista única de empleados para asignar colores
  const employees = useMemo(() => {
    const set = [];
    tasks.forEach(t => {
      if (t.empleado != null && !set.includes(t.empleado)) set.push(t.empleado);
    });
    return set;
  }, [tasks]);

  // dimensiones
  const leftColumnWidth = 140; // espacio para etiquetas de día
  const svgWidth = width;
  const chartWidth = svgWidth - leftColumnWidth - 20;
  const svgHeight = days.length * rowHeight + 60;
  const pxPerHour = hourWidth ?? (chartWidth / 24);

  // tooltip state
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });

  // Helper: convertir hora -> x dentro del área del chart
  const hourToX = (hour) => {
    return leftColumnWidth + (hour * pxPerHour);
  };

  // Agrupar tareas por día (para dibujar en esa fila)
  const tasksByDay = useMemo(() => {
    const map = {};
    days.forEach(d => map[d] = []);
    tasks.forEach(t => {
      const dd = (Number.isFinite(t.dia) && t.dia >= 0 && t.dia <= 6) ? t.dia : 0;
      map[dd].push(t);
    });
    return map;
  }, [tasks]);

  // Draw grid lines for each hour
  const hourLines = [];
  for (let h = 0; h <= 24; h++) {
    const x = hourToX(h);
    hourLines.push({ h, x });
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={svgWidth} height={svgHeight} style={{ display: "block", background: "#fff" }}>
        {/* Title */}
        <text x={svgWidth/2} y={20} textAnchor="middle" fontSize={16} fontWeight={700}>Diagrama de Gantt (horas 0-24 por día 0-6)</text>

        {/* Hour vertical grid lines & labels */}
        {hourLines.map(line => (
          <g key={`hl-${line.h}`}>
            <line
              x1={line.x} y1={40}
              x2={line.x} y2={svgHeight - 20}
              stroke="#eee"
            />
            {/* hour label at top */}
            <text x={line.x} y={34} textAnchor="middle" fontSize={11} fill="#666">{line.h}</text>
          </g>
        ))}

        {/* Rows per day */}
        {days.map((d, i) => {
          const yTop = 40 + i * rowHeight;
          const yMid = yTop + rowHeight / 2;

          return (
            <g key={`day-${d}`}>
              {/* Day background stripe */}
              <rect x={leftColumnWidth} y={yTop} width={chartWidth} height={rowHeight} fill={i % 2 === 0 ? "#fafafa" : "#ffffff"} />

              {/* Left day label */}
              <text x={leftColumnWidth - 12} y={yMid} textAnchor="end" dominantBaseline="middle" fontSize={13} fontWeight={700}>
                Día {d}
              </text>

              {/* horizontal separator */}
              <line x1={leftColumnWidth} y1={yTop + rowHeight} x2={leftColumnWidth + chartWidth} y2={yTop + rowHeight} stroke="#e6e6e6" />
            </g>
          );
        })}

        {/* Task rectangles (for each day, draw all tasks in that day row) */}
        {days.map((d, i) => {
          const yTop = 40 + i * rowHeight;
          const innerPadding = 8;
          const barHeight = rowHeight - innerPadding * 2;

          // tasks in this day
          const tlist = tasksByDay[d] || [];

          return (
            <g key={`tasks-day-${d}`}>
              {tlist.map((t, idx) => {
                // handle wrap-around shifts (end <= start) by treating end as next day (end += 24)
                let start = t.start;
                let end = t.end;
                let wrapped = false;
                if (end <= start) {
                  end = end + 24;
                  wrapped = true;
                }

                // clip to 0..24 for drawing on this chart (we won't draw beyond range)
                const drawStart = Math.max(0, start);
                const drawEnd = Math.min(24, end);

                const x = hourToX(drawStart);
                const widthPx = (drawEnd - drawStart) * pxPerHour;

                const color = getColorForEmployee(t.empleado, employees);

                const tooltipContent = (
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.empleado} — {t.turno ?? ""}</div>
                    <div>Día: {t.dia}</div>
                    <div>Inicio: {t.start}:00</div>
                    <div>Fin: {t.end}:00 {wrapped ? "(siguiente día)" : ""}</div>
                  </div>
                );

                return (
                  <g key={`task-${d}-${idx}`}>
                    <rect
                      x={x}
                      y={yTop + innerPadding}
                      width={Math.max(2, widthPx)} // mínimo visible
                      height={barHeight}
                      rx={6}
                      fill={color}
                      stroke="#3333"
                      onMouseEnter={(e) => {
                        const bbox = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          visible: true,
                          x: bbox.x + bbox.width/2,
                          y: bbox.y - 10,
                          content: tooltipContent
                        });
                      }}
                      onMouseLeave={() => setTooltip({ visible: false, x:0, y:0, content:null })}
                    />

                    {/* Label inside bar if espacio */}
                    {widthPx > 50 && (
                      <text
                        x={x + 8}
                        y={yTop + innerPadding + barHeight/2}
                        fontSize={12}
                        fill="#fff"
                        dominantBaseline="middle"
                      >
                        {t.empleado}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Left vertical divider */}
        <line x1={leftColumnWidth} y1={30} x2={leftColumnWidth} y2={svgHeight - 20} stroke="#ddd" />
      </svg>

      {/* Tooltip (HTML absolute) */}
      {tooltip.visible && (
        <div style={{
          position: "fixed",
          left: tooltip.x,
          top: tooltip.y,
          transform: "translate(-50%, -100%)",
          background: "white",
          padding: "8px 10px",
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          pointerEvents: "none",
          zIndex: 9999,
          fontSize: 13,
          lineHeight: "1.2"
        }}>
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
