import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import TrainingLogin from "./features/cybersecurity/pages/TrainingLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/training" replace />} />
          <Route path="/training" element={<TrainingLogin />} />
          <Route path="*" element={<Navigate to="/training" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
