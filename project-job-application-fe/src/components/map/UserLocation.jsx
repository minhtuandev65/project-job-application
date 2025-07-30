import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";

const userLocationIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png", // icon người dùng
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function FlyToUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position, map]);
  return null;
}
function UserLocation() {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Lỗi định vị:", err.message);
        }
      );
    }
  }, []);
  return (
    <div>
      {/* Marker cho người dùng */}
      {userPosition && (
        <>
          <FlyToUser position={userPosition} />
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Bạn đang ở đây</Popup>
          </Marker>
        </>
      )}
    </div>
  );
}

export default UserLocation;
