import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SpotDetailPage from "./pages/SpotDetailPage";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <div className="bg-[#FFF6F7] min-h-screen flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/space/:spaceId" element={<SpotDetailPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected chunk: uses the ProtectedRoute (Outlet) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/my-bookings" element={<DashboardPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;