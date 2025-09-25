import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext'; 

import HomePage from './pages/HomePage';
import SpotDetailPage from './pages/SpotDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/space/:spaceId" element={<SpotDetailPage />} />
              <Route path="/dashboard/my-bookings" element={<ProtectedRoute />}>
                <Route index element={<DashboardPage />} />
              </Route>
              {/* Add a not-found route */}
            </Routes>
          </main>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;