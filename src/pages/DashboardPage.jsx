import React, { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import ConfirmationModal from "../components/ConfirmationModal";

const DashboardPage = () => {
  const { getUserBookings, cancelBooking } = useBookings();
  const { user } = useAuth();
  const [toCancel, setToCancel] = useState(null);

  const bookings = getUserBookings(user?.id);

  const handleCancel = (id) => setToCancel(id);
  const confirmCancel = () => {
    cancelBooking(toCancel);
    setToCancel(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{b.spaceName}</div>
                <div className="text-sm text-gray-600">
                  {b.date} · {b.timeSlot}
                </div>
                <div className="text-sm">
                  Booked: {new Date(b.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleCancel(b.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {toCancel && (
        <ConfirmationModal
          title="Cancel booking"
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          onConfirm={confirmCancel}
          onCancel={() => setToCancel(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
