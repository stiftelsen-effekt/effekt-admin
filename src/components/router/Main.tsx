import React from "react";

import { LoginComponent } from "../login/login.component";
import { PrivateRoute } from "./PrivateRoute";
import { AdminPanel } from "../AdminPanel";
import { HashRouter, Route, Routes } from "react-router-dom";

export const MainRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};
