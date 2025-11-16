import CardConstraints from "../components/CardConstraints";

export default function Location() {
  return (
    <div className="hero" style={{ padding: 0}}>
      <img src="/images/back_location.png" alt="Location"  className="back-image"/>
      <h1>Ruteo de transporte</h1>
        <p>
          Optimiza tus rutas 
        </p>
        <h1>DEMO</h1>
      <p>Para este ejemplo se busca minimizar el costo de asignar a un empleado en un turno en especifico. Consideramos
        una penalización por no atender a un cliente y una capacidad de 10 clientes por hora por epleado.
      </p>
      <h2>Datos necesarios</h2>
      {/* CARD GRID*/}
      <section>
        <h2>Restricciones consideradas</h2>
        <div><CardConstraints /></div>
      </section>
    </div>
  );
}
