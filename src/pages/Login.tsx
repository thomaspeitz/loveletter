import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoveletterSearch from "./LoveletterSearch";
import MapLeafletCreate from "./AddNewLovepoint";
import { auth, signInWithGoogle } from "../firebaseConfig";

function Login() {
  const [user, loading, error] = useAuthState(auth);

  (loading || error) && <>loading..</>;

  return (
    <>
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
          <Box sx={{ width: "200px", height: "200px" }}>
            <MapLeafletCreate />
          </Box>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
}

export default Login;
