export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contacto */}
        <div className="footer-contact">
          <p>Teléfono: +52 55 1234 5678</p>
          <p>Correo: contacto@optisolve.com</p>
        </div>

        {/* Redes Sociales */}
        <div className="footer-social">
          <a href="https://github.com/tuusuario" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://twitter.com/tuusuario" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Retail-MVP. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
