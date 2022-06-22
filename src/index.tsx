import React from "react";
import ReactDOM from "react-dom/client";

import App from "./core/Root";
import { GlobalStateProvider } from "./utils/useGlobalState";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>
);
