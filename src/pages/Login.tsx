import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebaseConfig";

const Login: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  (loading || error) && <>loading..</>;

  return (
    <>
      <h1>Hello world</h1>
      {user === null ? (
        <Button
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Login with Google
        </Button>
      ) : (
        <>
          <h1>Logged in as {user?.displayName}</h1>
          <Button
            onClick={() => {
              signOut(auth);
            }}
          >
            Log out
          </Button>
        </>
      )}
    </>
  );
};

export default Login;
