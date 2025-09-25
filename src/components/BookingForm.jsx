import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

export default function BookingForm({ space }) {
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(space.time_slots?.[0] || "");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [statusMsg, setStatusMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setStatusMsg("You must be logged in to make a booking.");
      return;
    }
    if (!date || !timeSlot) {
      setStatusMsg("Please select both date and timeslot.");
      return;
    }

    const datetime = `${date} ${timeSlot}`;

    const booking = {
      userEmail: user.email,
      userName: user.name,
      spaceId: String(space.id),
      spaceName: space.name,
      datetime,
      guests,
      notes,
    };

    addBooking(booking);
    setStatusMsg("Booking successful! Check your dashboard to manage it.");

    setDate("");
    setTimeSlot(space.time_slots?.[0] || "");
    setGuests(1);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-6">
      <h4 className="text-lg font-semibold mb-3">Book this space</h4>

      {!user && (
        <p className="text-sm text-red-600">
          You must <strong>login</strong> before booking.
        </p>
      )}

      <label className="block mb-2">
        <span className="text-sm text-slate-600">Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1"
        />
      </label>

      <label className="block mb-2">
        <span className="text-sm text-slate-600">Time slot</span>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1"
        >
          {space.time_slots?.map((t, idx) => (
            <option key={idx} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        <span className="text-sm text-slate-600">Guests</span>
        <input
          type="number"
          min={1}
          max={space.capacity || 20}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-24 border rounded px-2 py-1"
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm text-slate-600">Notes (optional)</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Book
        </button>
        <span className="text-sm text-slate-500">
          ₱{space.price}/hr • {space.hours}
        </span>
      </div>

      {statusMsg && (
        <p className="mt-3 text-sm text-green-600">{statusMsg}</p>
      )}
    </form>
  );
}
