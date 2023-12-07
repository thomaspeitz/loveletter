import { Button } from "@mui/material";
import { Timestamp, setDoc, doc, collection } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { auth, db } from "../firebaseConfig";
import { Grant, InviteToken, Lovepoint } from "../types";

const InviteAccept: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [invite, inviteLoading, inviteError] = useDocumentData<InviteToken>(
    // @ts-ignore
    doc(db, `invites/${id}`)
  );

  console.log(invite);

  const [point, pointLoading, pointError] = useDocumentData<Lovepoint>(
    // @ts-ignore
    doc(db, `lovepoints/${invite?.lovepointId}`)
  );

  console.log(point);

  const acceptInvite = React.useCallback(() => {
    if (point === undefined || user?.uid === undefined) {
      enqueueSnackbar(`Error creating: User or Point undefined`, {
        variant: "error",
      });
      return;
    }

    const grant: Grant = {
      id: nanoid(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId: user?.uid,
    };

    setDoc(
      doc(collection(db, `/lovepoints/${point.id}/shared`), grant.id),
      grant
    )
      .catch((e) => {
        enqueueSnackbar(`Error creating: ${e.message}`, {
          variant: "error",
        });
      })
      .then(() => {
        enqueueSnackbar("Succesfully created new object!", {
          variant: "success",
        });
      });
  }, [user, point, enqueueSnackbar]);

  return (
    <>
      <h1>Invite {id}</h1>
      Hey your friend bla has a loveletter for you :)
      <Button
        onClick={() => {
          acceptInvite();
        }}
      >
        Add to my collection
      </Button>
    </>
  );
};

export default InviteAccept;
