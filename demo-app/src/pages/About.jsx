export default function About() {
  return (
    <div>
      <div className="hero">
        <h1>Sobre Nosotros</h1>
        <p>En <span className="font-semibold">Retail MVP</span> transformamos el retail con soluciones de optimización modernas y fáciles de usar.</p>
      </div>

      {/* Mission & Vision */}
      <div>
        <div className="hero">
          <h3>Misión</h3>
          <p>Facilitar la toma de decisiones en retail con tecnología accesible y escalable.</p>
        </div>
        <div className="hero">
          <h3>Visión</h3>
          <p> Ser el estándar de optimización en retail en toda Latinoamérica.</p>
        </div>
      </div>
    </div>
  );
}

