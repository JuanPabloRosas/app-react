import "../App.css";
import { useNavigate } from "react-router-dom";


export default function CardGrid() {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Timetabling",
      text: "Crea y optimiza horarios para personal y recursos.",
      image: "images/timetabling.jpg",
      link: "/timetabling"
    },
    {
      title: "Routing",
      text: "Encuentra rutas óptimas para tus entregas.",
      image: "images/routing.jpg",
      link: "/routing"
    },
    {
      title: "Location",
      text: "Selecciona ubicaciones estratégicas para tus tiendas.",
      image: "images/location.png",
      link: "/location"
    },
    {
      title: "Scheduling",
      text: "Planifica y organiza procesos clave de tu operación.",
      image: "images/scheduling.png",
      link: "/scheduling"
    },
  ];

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <div key={index} className="card" onClick={() => navigate(card.link)}>
          <img src={card.image} alt={card.title} className="card-img" />
          <div className="card-overlay">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
