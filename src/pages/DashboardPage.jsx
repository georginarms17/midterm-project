import React, { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import ConfirmationModal from "../components/ConfirmationModal";

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const userBookings = useMemo(
    () => bookings.filter((b) => b.userEmail === user.email),
    [bookings, user]
  );

  const handleCancelClick = (booking) => {
    setSelected(booking);
    setModalOpen(true);
  };

  const confirmCancel = () => {
    if (selected) cancelBooking(selected.id);
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      {userBookings.length === 0 ? (
        <p className="text-slate-600">
          You have no bookings yet. Browse spaces and make one!
        </p>
      ) : (
        <div className="space-y-4">
          {userBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded shadow flex items-start justify-between"
            >
              <div>
                <h3 className="font-semibold">{b.spaceName}</h3>
                <p className="text-sm text-slate-600">When: {b.datetime}</p>
                <p className="text-sm text-slate-600">Guests: {b.guests}</p>
                {b.notes && (
                  <p className="text-sm text-slate-600">Notes: {b.notes}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleCancelClick(b)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
                <small className="text-xs text-slate-400">
                  Booked: {new Date(b.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm cancellation"
      >
        <p>
          Are you sure you want to cancel booking for{" "}
          <strong>{selected?.spaceName}</strong> on{" "}
          <strong>{selected?.datetime}</strong>?
        </p>
        <div className="mt-4 flex gap-3 justify-end">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setModalOpen(false)}
          >
            No
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={confirmCancel}
          >
            Yes, cancel
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
}
