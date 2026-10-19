import { Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "./pages/onboarding/Onboarding";
import AuthPage from "./pages/auth/AuthPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
