// frontend/src/components/VRPMap.jsx
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Crear íconos para cada vehículo
const vehicleIcons = [
  L.icon({
    iconUrl: "images/camion.png",
    iconSize: [32, 32],
  }),
  L.icon({
    iconUrl: "images/camion.png",
    iconSize: [32, 32],
  }),
  L.icon({
    iconUrl: "images/camion.png",
    iconSize: [32, 32],
  }),
];

export default function VRPMap() {
  // Definir rutas de ejemplo
  const routes = [
    [
      [19.432491973718328,-99.13292697121217],
      [19.438734373921548,-99.155249338996],
      [19.424436955601564,-99.16271272869864],
      [19.414360126608855,-99.15877674718743],
      [19.41375172406522,-99.13583631342435],
      [19.432491973718328,-99.13292697121217],
    ],
    [
      [19.43240468189572,-99.13287458850758],
      [19.42022015976977,-99.0964302526709],
      [19.417669156027117,-99.06966812590207],
      [19.44517529563805,-99.08740889794366],
      [19.450281670837526,-99.10365069530444],
      [19.474669057316262,-99.11177065887522],
      [19.463608759362387,-99.13101766996321],
      [19.43240468189572,-99.13287458850758]
    ],
    [
      [19.43247807876311,-99.1329137747424],
      [19.413412326658772,-99.12858107014114],
      [19.402710607588688,-99.1304860514835],
      [19.39862135770767,-99.11352284493562],
      [19.376363523938878,-99.09821769090566,],
      [19.397779443177285,-99.08406090342996],
      [19.407402936267417,-99.10791025397265],
      [19.4224431370164,-99.12066985016526],
      [19.43247807876311,-99.1329137747424]
    ],
  ];

  // Posiciones actuales de los vehículos
  const [positions, setPositions] = useState(routes.map(r => r[0]));

  // Animación de movimiento
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      setPositions(routes.map(r => r[step % r.length]));
      step++;
    }, 2000); // cada 2 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[19.4326, -99.1332]}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Dibujar rutas */}
      {routes.map((route, idx) => (
        <Polyline key={idx} positions={route} color={["blue", "green", "red"][idx]} />
      ))}

      {/* Dibujar vehículos */}
      {positions.map((pos, idx) => (
        <Marker key={idx} position={pos} icon={vehicleIcons[idx]} />
      ))}
    </MapContainer>
  );
}
