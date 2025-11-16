import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const slides = [
  {
    image: "/images/timetabling_slider.png",
    title: "Optimiza tus horarios",
    description: "Crea y gestiona turnos de manera automática con timetabling.",
    link: "/timetabling"
  },
  {
    image: "/images/routing_slider.png",
    title: "Encuentra las mejores rutas",
    description: "Reduce costos con algoritmos de ruteo eficientes.",
    link: "/routing"
  },
  {
    image: "/images/location_slider.png",
    title: "Selecciona ubicaciones estratégicas",
    description: "Elige el mejor lugar para tu negocio con location analysis.",
    link: "/location"
  },
  {
    image: "/images/scheduling_slider.png",
    title: "Programa tu producción eficientemente",
    description: "Mejora tus indicadores de producción, evitando tiempos muertos.",
    link: "/scheduling"
  }
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // cada 6 segundos cambia
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <button onClick={() => navigate(slide.link)}>Ver más</button>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button className="arrow prev" onClick={prevSlide}>&#10094;</button>
      <button className="arrow next" onClick={nextSlide}> &#10095;</button>
    </div>
  );
}
