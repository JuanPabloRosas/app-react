import CardConstraints from "../components/CardConstraints";
import VRPMap from "../components/VRPMap";

export default function Routing() {
  return (
    <div className="hero" style={{ padding: 0}}>
      <img src="/images/back_routing.png" alt="Routing"  className="back-image"/>
      <h1>Optimiza de rutas en retail</h1>
      <p>
          En retail, entregar a tiempo y al menor costo es un reto.  
          Nuestro modelo matemático e inteligencia artificial resuelven el 
          <strong> problema de ruteo de vehículos</strong>, encontrando las 
          mejores rutas para tus entregas.
        </p>
      <h2>Datos necesarios</h2>
      {/* CARD GRID*/}
      <section>
        <h2>Restricciones consideradas</h2>
        <div><CardConstraints /></div>
      </section>
      <h2>Ejemplo</h2>
      <VRPMap/>
    </div>
  );
}
