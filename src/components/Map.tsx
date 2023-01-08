import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.0457638,
  lng: 6.2446997,
};

function LoveletterMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB7Kzv_ibmBJ9nAeq9ZldtWFbiUz02XzUI",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);

    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Box sx={{ width: "800px", height: "800px" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      <PosititionDetection />
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(LoveletterMap);
