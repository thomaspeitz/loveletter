import { Button } from "@mui/material";
import { doc } from "firebase/firestore";
import * as React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { db } from "../firebaseConfig";
import { InviteToken, Lovepoint } from "../types";

const Invite: React.FC = () => {
  const { id } = useParams();

  const [invite, inviteLoading, inviteError] = useDocumentData<InviteToken>(
    // @ts-ignore
    doc(db, `invites/${id}`)
  );

  if (!invite) {
    return <>Invite not found</>;
  }

  const url = `${window.location.origin}/loveletter/invite/${invite?.id}/accept`;

  return (
    <>
      <h1>Invite {id}</h1>
      Just send the link {url}
      <Button
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
      >
        Copy to clipboard
      </Button>{" "}
      to your friend :)
    </>
  );
};

export default Invite;
