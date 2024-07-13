import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login/Login.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { TokenProvider, useToken } from "./pages/Token/TokenContext";

const RequireAuth = ({ children }) => {
  const { token } = useToken();
  return token ? children : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <TokenProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <App />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </TokenProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
