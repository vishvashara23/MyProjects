import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "29842855657-763dq9004du1lkdi4cm65eh2prgss9lu.apps.googleusercontent.com"; // ⬅️ Replace this with your actual client ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
