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
      <div className="text-center">
        <h1 className="bg-[#F2CD76] text-[#004A3F] text-[50px] inline-block rounded-full font-bold mb-4 px-10">My Bookings</h1>
      </div>
      
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="text-[#004A3F] bg-white space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="border p-6 rounded-xl flex justify-between items-center shadow-xl m"
            >
              <div>
                <div className="text-[25px] font-bold">{b.spaceName}</div>
                <div className="text-[18px] text-gray-600">
                  {b.date} · {b.timeSlot}
                </div>
                <div className="text-[18px]">
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