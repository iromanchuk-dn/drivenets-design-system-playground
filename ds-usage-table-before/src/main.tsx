import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@drivenets/design-system/index.min.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
