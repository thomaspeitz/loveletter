import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
/*
v18
import ReactDOM from "react-dom/client";
*/
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Create } from "./pages/Home";
import DebugTexts from "./pages/DebugTexts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
]);

/*
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  */
const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <Link href="/" style={{ color: "white" }}>
                  Test
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Container>
    </React.Fragment>
  </React.StrictMode>,
  container
);
