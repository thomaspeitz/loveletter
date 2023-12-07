import { collection, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { auth, db } from "../firebaseConfig";
import { LovePoint, Position } from "../types";
import Loveletter from "./Loveletter";

const loveletterDistance = 10;

type position = {
  lat: number;
  lng: number;
};

type currentPositionType = position | null;

function LoveletterSearch() {
  const [user, loading] = useAuthState(auth);
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] =
    useState<currentPositionType>(null);

  const center = [51.0457638, 6.2446997];

  const [points, pointsLoading, pointsError] = useCollectionData<LovePoint>(
    // @ts-ignore
    query<LovePoint>(collection(db, `/lovepoints//${user?.uid}/`))
  );

  useEffect(() => {
    if (!map) return;

    // @ts-ignore
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      // @ts-ignore
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `click marker, move`;
      return div;
    };

    legend.addTo(map);
  }, [map]);

  navigator.geolocation.watchPosition(function (position) {
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });

  function calculateMeters(position: Position) {
    if (currentPosition === null) {
      return 100000000;
    }
    const lat1 = currentPosition.lat;
    const lon1 = currentPosition.lng;
    const lat2 = position.lat;
    const lon2 = position.lng;
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  }

  (pointsLoading || pointsError) && <>Not ready yet</>;

  return (
    <>
      <MapContainer
        style={{ height: "500px", width: "800px" }}
        whenCreated={setMap}
        // @ts-ignore
        center={center}
        zoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {(points ?? []).map(({ position, text, title }, index) => (
          <Marker key={index} autoPan={true} position={position}>
            <Popup>
              {calculateMeters(position) <= loveletterDistance ? (
                <Loveletter text={text} title={title} />
              ) : (
                <h1>You have to much distance to that point</h1>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {currentPosition === null && <>Current loading your position...</>}

      {currentPosition !== null &&
        (points ?? []).map((point, i) => {
          return (
            <React.Fragment key={i}>
              <h1>Loveletter {point.title}</h1>
              {currentPosition && (
                <>Distance to yourself: {calculateMeters(point.position)}</>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default LoveletterSearch;
