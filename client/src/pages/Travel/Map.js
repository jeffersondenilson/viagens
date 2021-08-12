import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
} from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../../images/marker-icon.png";

const MarkerIcon = new Icon({
  iconUrl: marker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/*const origin.position = [-5.8054, -35.2081];
const destination.position = [-8.05428, -34.8813];

const center = [
  (origin.position[0] + destination.position[0]) / 2,
  (origin.position[1] + destination.position[1]) / 2,
];*/

function getZoomLevel(dist) {
  if (dist <= 200) {
    return 10;
  } else if (dist > 200 && dist <= 800) {
    return 7;
  } else if (dist > 800 && dist <= 1000) {
    return 5;
  } else {
    return 3;
  }
}

export default function Map({ origin, destination, distance }) {
  const center = [
    (origin.position[0] + destination.position[0]) / 2,
    (origin.position[1] + destination.position[1]) / 2,
  ];

  const zoom = getZoomLevel(distance);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      placeholder={<div>Carregando mapa...</div>}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        tileSize={512}
        zoomOffset={-1}
      />
      <Polyline
        pathOptions={{ color: "red" }}
        positions={[origin.position, destination.position]}
      />
      <Marker position={origin.position} icon={MarkerIcon}>
        <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
          {origin.cityName}
        </Tooltip>
      </Marker>
      <Marker position={destination.position} icon={MarkerIcon}>
        <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
          {destination.cityName}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
