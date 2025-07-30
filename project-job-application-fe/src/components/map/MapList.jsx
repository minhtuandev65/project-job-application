import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { iconMap } from "@/helpers";
import SearchMap from "./SearchMap";
import { useEffect, useState } from "react";
import UserLocation from "./UserLocation";

function MapList({ data }) {
  const [userCenter, setUserCenter] = useState([10.762622, 106.660172]); // default SG

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Vị trí nhận được:", latitude, longitude);
        setUserCenter([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);
  return (
    <div className="container mb-24 map-wrapper">
      <MapContainer
        center={userCenter}
        zoom={20}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <SearchMap />
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((company) => {
            const icon = iconMap[company.category] || iconMap["other"];
            const lat = +company.lat;
            const lng = +company.lng;

            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={`${company._id}-${lat}-${lng}`}
                position={[lat, lng]}
                icon={icon}
              >
                <Popup>
                  <strong>{company.companyName}</strong>
                  <br />
                  {company.address}
                </Popup>
              </Marker>
            );
          })}

        <UserLocation />
      </MapContainer>
    </div>
  );
}

export default MapList;
