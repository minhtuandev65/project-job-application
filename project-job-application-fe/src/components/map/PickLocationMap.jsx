import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { Modal } from "antd";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import SearchMap from "./SearchMap";
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // Force Leaflet re-render tile
    }, 100); // Delay một chút để đảm bảo DOM đã sẵn sàng
  }, [map]);

  return null;
}
function LocationSelector({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onSelect({ lat, lng });
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

function PickLocationMap({ visible, onClose, onPick }) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      title="📍 Select coordinates"
      okText="Done"
    >
      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <FixMapSize />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationSelector onSelect={onPick} />
        <SearchMap />
      </MapContainer>
    </Modal>
  );
}

export default PickLocationMap;
