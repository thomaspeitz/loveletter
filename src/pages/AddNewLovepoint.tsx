import { Button, TextField } from "@mui/material";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { auth, db } from "../firebaseConfig";
import { Lovepoint, Position } from "../types";

type MapControllerProp = {
  setPosition: (position: Position) => void;
};

function MapController({ setPosition }: MapControllerProp) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      const position: Position = { lat: lat, lng: lng };
      setPosition(position);
    });
  }, [map]);

  return <></>;
}

function AddNewLovepoint() {
  const [user, loading] = useAuthState(auth);
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [position, setPosition] = useState<Position | null>(null);

  const center = [51.0457638, 6.2446997];

  const addLoveLetter = useCallback(() => {
    console.log("test");

    if (position === null) {
      enqueueSnackbar("Error finding position during add", {
        variant: "error",
      });
      return;
    }

    if (user === undefined || user?.uid === undefined) {
      enqueueSnackbar("User not logged in", {
        variant: "error",
      });
      return;
    }

    const point: Lovepoint = {
      id: nanoid(),
      position: position,
      title: title,
      text: text,
      createdBy: user.uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    setDoc(doc(collection(db, `/lovepoints`), point.id), point)
      .catch((e) => {
        enqueueSnackbar(`Error creating: ${e.message}`, {
          variant: "error",
        });
      })
      .then(() => {
        enqueueSnackbar("Succesfully created new object!", {
          variant: "success",
        });
        setTitle("");
        setText("");
      });
  }, [user, title, text, position, enqueueSnackbar]);

  return (
    <>
      <MapContainer
        style={{ height: "500px", width: "800px" }}
        // @ts-ignore
        center={center}
        zoom={18}
        scrollWheelZoom={false}
      >
        <MapController setPosition={(position) => setPosition(position)} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position !== null && (
          <Marker autoPan={true} position={[position.lat, position.lng]}>
            <Popup>Your Love Letter Point</Popup>
          </Marker>
        )}
      </MapContainer>
      {position !== null ? (
        <>
          Point: {position.lat} / {position.lng}
          <br />
          Title:
          <br />
          <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          Text:
          <br />{" "}
          <TextField value={text} onChange={(e) => setText(e.target.value)} />
          <br />
          <Button
            onClick={() => {
              addLoveLetter();
            }}
          >
            Save to DB
          </Button>
        </>
      ) : (
        <>Click on the map to make your first point</>
      )}
    </>
  );
}

export default AddNewLovepoint;
