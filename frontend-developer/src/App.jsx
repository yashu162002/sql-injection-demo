import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import DeveloperDashboard from "./features/cybersecurity/pages/DeveloperDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DeveloperDashboard />} />
          <Route path="/developer" element={<DeveloperDashboard />} />
          <Route path="*" element={<Navigate to="/developer" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
