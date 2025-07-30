import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { iconMap } from "@/helpers";
import React from "react";
import SearchMap from "./SearchMap";

function Map({ data }) {
  const icon = iconMap[data.category] || iconMap["other"];
  const lat = +data.lat;
  const lng = +data.lng;

  if (isNaN(lat) || isNaN(lng)) return null;
  return (
    <div className="container map-wrapper">
      <h3 className="map-title">Company location</h3>
      <MapContainer
        key={`${lat}-${lng}`}
        center={[lat, lng]}
        zoom={20}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <SearchMap />
        <Marker
          key={`${data._id}-${lat}-${lng}`}
          position={[lat, lng]}
          icon={icon}
        >
          <Popup>
            <strong>{data.companyName}</strong>
            <br />
            {data.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
