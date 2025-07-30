import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

function SearchMap() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    })
      .on("markgeocode", function (e) {
        const bbox = e.geocode.bbox;
        const bounds = L.latLngBounds(bbox);
        map.fitBounds(bounds);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
}

export default SearchMap;
