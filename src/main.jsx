import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TestCaseProvider } from "./context/TestCaseContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TestCaseProvider>
      <App />
    </TestCaseProvider>
  </StrictMode>,
);
