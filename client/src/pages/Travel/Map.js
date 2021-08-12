import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../../images/marker-icon.png";

const MarkerIcon = new Icon({
  iconUrl: marker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const originPosition = [-5.8054, -35.2081];
const destinationPosition = [-8.05428, -34.8813];

const center = [
  (originPosition[0] + destinationPosition[0]) / 2,
  (originPosition[1] + destinationPosition[1]) / 2,
];

export default function Map() {
  return (
    <MapContainer
      center={center}
      zoom={7}
      placeholder={<div>Carregando mapa...</div>}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        tileSize={512}
        zoomOffset={-1}
      />
      <Marker position={originPosition} icon={MarkerIcon}>
        <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
          Natal
        </Tooltip>
      </Marker>
      <Marker position={destinationPosition} icon={MarkerIcon}>
        <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
          Recife
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

/*
const center = [-13.752, -52.553]
const zoom = 5
*/
