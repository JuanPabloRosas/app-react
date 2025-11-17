import ImageSlider from "../components/ImageSlider";
import CardGrid from "../components/CardGrid";

export default function Home() {
  return (
    <div>
      {/* SLIDER*/}
      <section>
        <div><ImageSlider /></div>
      </section>
      {/* Hero */}
      <section className="hero">
        <h1>Retail MVP Test</h1>
        <p>
          Soluciones en la nube para problemas complejos de retail:
          Timetabling, Routing, Location y Scheduling.
        </p>
        <button className="button" onClick="/about">Ver más</button>
      </section>

      {/* CARD GRID*/}
      <section>
        <div><CardGrid /></div>
      </section>
      
      {/* CONTACTO */}
      <section className="hero">
        <h2>¿Listo para empezar?</h2>
        <button className="button" onClick="/contact">Contactanos</button>
      </section>
    </div>
  );
}
