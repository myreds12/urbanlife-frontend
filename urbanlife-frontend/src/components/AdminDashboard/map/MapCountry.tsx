import { useEffect, useRef } from "react";
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import 'jsvectormap/dist/css/jsvectormap.min.css'; // Tambahin CSS buat styling

interface MapCountryProps {
  mapColor?: string;
}

const MapCountry: React.FC<MapCountryProps> = ({ mapColor = "#D0D5DD" }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapRef.current.vectorMap) {
      mapRef.current.vectorMap = new jsVectorMap({
        selector: "#mapOne",
        map: "world",
        backgroundColor: "transparent",
        zoomOnScroll: false,
        zoomMax: 12,
        zoomMin: 1,
        zoomAnimate: true,
        zoomStep: 1.5,
        regionStyle: {
          initial: {
            fill: mapColor,
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0,
          },
          hover: {
            fillOpacity: 0.7,
            cursor: "pointer",
            fill: "#465FFF",
          },
          selected: {
            fill: "#465FFF",
          },
        },
        markers: [
          { latLng: [37.2580397, -104.657039], name: "United States" },
          { latLng: [20.7504374, 73.7276105], name: "India" },
          { latLng: [53.613, -11.6368], name: "United Kingdom" },
          { latLng: [-25.0304388, 115.2092761], name: "Sweden" },
        ],
        markerStyle: {
          initial: {
            fill: "#465FFF",
            stroke: "#383f47",
            r: 4,
          },
          hover: {
            fill: "#465FFF",
            stroke: "#383f47",
          },
          selected: {
            fill: "#465FFF",
          },
        },
      });
    }

    return () => {
      if (mapRef.current && mapRef.current.vectorMap) {
        mapRef.current.vectorMap.destroy();
      }
    };
  }, [mapColor]);

  return (
    <div id="mapOne" ref={mapRef} style={{ height: "212px", width: "252px" }}></div>
  );
};

export default MapCountry;