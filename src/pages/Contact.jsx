export default function Contact() {
  return (
    <div className="hero">
      <h1 >Contáctanos</h1>
      <p>¿Tienes dudas? Rellena el formulario y nos pondremos en contacto.</p>

      <form className="bg-white shadow-md rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Correo</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
          <textarea
            rows="5"
            placeholder="Escribe tu mensaje..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="button"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
