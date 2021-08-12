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

export default function Map({ origin, destination, distance }) {
  const bounds = [
    [origin.position[0] + 2, origin.position[1] + 2],
    [destination.position[0] - 2, destination.position[1] - 2],
  ];

  return (
    <MapContainer
      bounds={bounds}
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

/*function getZoomLevel(dist) {
  if (dist <= 100) {
    return 9;
  } else if (dist > 100 && dist <= 300) {
    return 7;
  } else if (dist > 300 && dist <= 500) {
    return 6;
  } else if (dist > 500 && dist <= 1000) {
    return 5;
  } else {
    return 3;
  }
}*/
