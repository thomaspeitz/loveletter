import { Button } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router";
import { auth, db } from "../firebaseConfig";
import { InviteToken, Lovepoint } from "../types";

function ListLovepoints() {
  const [user, loading] = useAuthState(auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [points, pointsLoading, pointsError] = useCollectionData<Lovepoint>(
    query<Lovepoint>(
      // @ts-ignore
      collection(db, `/lovepoints`),
      where("createdBy", "==", user?.uid || "")
    )
  );

  const handleDelete = React.useCallback(
    (Lovepoint: Lovepoint) => {
      deleteDoc(doc(collection(db, `/lovepoints`), Lovepoint.id)).catch((e) => {
        enqueueSnackbar(`Error deleting: ${e.message}`, {
          variant: "error",
        });
      });
    },
    [enqueueSnackbar, user]
  );

  const createInviteToken = React.useCallback(
    (lovepoint: Lovepoint) => {
      const inviteToken: InviteToken = {
        id: nanoid(),
        multiple: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lovepointId: lovepoint.id,
      };

      setDoc(doc(collection(db, `/invites`), inviteToken.id), inviteToken)
        .catch((e) => {
          enqueueSnackbar(`Error creating: ${e.message}`, {
            variant: "error",
          });
        })
        .then(() => {
          enqueueSnackbar("Succesfully created new object!", {
            variant: "success",
          });
          navigate("/loveletter/invite/" + inviteToken.id);
        });
    },
    [user, enqueueSnackbar]
  );

  return (
    <>
      {points?.map((point, i) => (
        <React.Fragment key={i}>
          {point.title}
          <Button
            onClick={() => {
              handleDelete(point);
            }}
          >
            Delete again
          </Button>
          <Button
            onClick={() => {
              createInviteToken(point);
            }}
          >
            Share with someone
          </Button>
          <br></br>
        </React.Fragment>
      ))}
    </>
  );
}

export default ListLovepoints;
