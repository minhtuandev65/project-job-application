import L from "leaflet";

export const iconMap = {
  RESTAURANT: L.divIcon({
    html: '<i class="fas fa-utensils fa-2x" style="color: #e74c3c;"></i>',
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  HOTEL: L.divIcon({
    html: '<i class="fas fa-hotel fa-2x" style="color: #2980b9;"></i>',
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  TECHNOLOGY: L.divIcon({
    html: '<i class="fas fa-microchip fa-2x" style="color: #8e44ad;"></i>',
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  STORE: L.divIcon({
    html: '<i class="fas fa-store fa-2x" style="color: #27ae60;"></i>',
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  OTHER: L.divIcon({
    html: '<i class="fas fa-map-marker-alt fa-2x" style="color: #34495e;"></i>',
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
};
