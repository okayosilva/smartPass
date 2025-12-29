import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-blue-600 border-blue-700 text-white shadow-2xl rounded-xl",
          description: "text-blue-100 font-light",
          actionButton: "bg-blue-800 text-white",
          cancelButton: "bg-slate-100 text-slate-900",
          // Se você ainda quiser usar .success mas com cor azul:
          success: "bg-blue-600 border-blue-700 text-white",
        },
      }}
    />
  </StrictMode>,
);
