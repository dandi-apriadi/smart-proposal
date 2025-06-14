import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider dari react-redux
import { store } from './store/index.js';
import AdminLayout from "layouts/admin";
import ReviewerLayout from "layouts/reviewer";
import DosenLayout from "layouts/dosen";
import BendaharaLayout from "layouts/bendahara";
import WadirLayout from "layouts/wadir";
import AuthLayout from "layouts/auth";

const App = () => {
  return (
    // Bungkus aplikasi dengan Provider dan berikan store Redux
    <Provider store={store}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="reviewer/*" element={<ReviewerLayout />} />
        <Route path="dosen/*" element={<DosenLayout />} />
        <Route path="bendahara/*" element={<BendaharaLayout />} />
        <Route path="wadir/*" element={<WadirLayout />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </Provider>
  );
};

export default App;
