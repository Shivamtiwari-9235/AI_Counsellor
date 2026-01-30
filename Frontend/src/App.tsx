import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import OnboardingPage from "./routes/OnboardingPage";
import DashboardPage from "./routes/DashboardPage";
import CounsellorPage from "./routes/CounsellorPage";
import UniversitiesPage from "./routes/UniversitiesPage";
import ApplicationsPage from "./routes/ApplicationsPage";
import ProfilePage from "./routes/ProfilePage";
import { AuthGuard } from "./hooks/useAuthGuard";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/onboarding"
        element={
          <AuthGuard>
            <OnboardingPage />
          </AuthGuard>
        }
      />

      {/* Protected app routes with layout */}
      <Route
        path="/app"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="counsellor" element={<CounsellorPage />} />
        <Route path="universities" element={<UniversitiesPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
