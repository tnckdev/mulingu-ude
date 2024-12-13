import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <Navbar>
          <Routes>
            <Route
              path="*"
              element={<App />}
            />
          </Routes>
        </Navbar>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
