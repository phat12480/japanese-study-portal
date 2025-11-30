// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Google Login Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="168235074386-nh4sjl27t8fls62gvllbgpsgfqvv69j4.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
