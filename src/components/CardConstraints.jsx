import "../App.css";

export default function CardConstraints() {
  const cards = [
    {
      title: "Un solo turno",
      text: "Cada empleado puede tener solamente un turno por día.",
      image: "images/constraints.jpg",
    },
    {
      title: "Jornada Laboral",
      text: "Los empleados deben de trabajar exactamente 48 hrs.",
      image: "images/constraints.jpg",
    },
    {
      title: "Día de descanso",
      text: "Los empleados trabajan a lo más 6 días.",
      image: "images/constraints.jpg",
    },
    {
      title: "Demanda cubierta",
      text: "Se garantiza la cobertura de la demanda con el personal asignado.",
      image: "images/constraints.jpg",
    },
    {
      title: "Un turno por seman",
      text: "Una vez asignado un turno, se mantiene durante la programación.",
      image: "images/constraints.jpg",
    },
    {
      title: "Restricción ",
      text: "Descripción ...",
      image: "images/constraints.jpg",
    },
  ];

  return (
    <div className="card-grid-const">
      {cards.map((card, index) => (
        <div key={index} className="card-const">
          <img src={card.image} alt={card.title} className="card-img-const" />
          <div className="card-overlay-const">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
