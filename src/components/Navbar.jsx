import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>Retail MVP</h1>

      {/* Botón hamburguesa */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menú */}
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Conocenos</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/timetabling">Horarios</Link></li>
        <li><Link to="/routing">Ruteo</Link></li>
        <li><Link to="/location">Localización</Link></li>
        <li><Link to="/scheduling">Secuenciación</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
