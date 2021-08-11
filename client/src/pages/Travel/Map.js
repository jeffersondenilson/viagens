import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

const center = [-13.752, -52.553];
const originPosition = [-5.8054, -35.2081];
const destinationPosition = [-7.9986, -34.846];

export default function Map() {
  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      placeholder={<div>Carregando mapa...</div>}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
      />
      <Marker position={originPosition}>
        <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent>
          Origin
        </Tooltip>
      </Marker>
      <Marker position={destinationPosition}>
        <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent>
          Destination
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

/*
const center = [-13.752, -52.553]
const zoom = 5
*/
