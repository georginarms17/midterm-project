import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

const BookingForm = ({ space }) => {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.time_slots ? space.time_slots[0] : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to book");

    const booking = {
      id: "b_" + Date.now(),
      spaceId: space.id,
      spaceName: space.name,
      userId: user.id,
      userName: user.name,
      date,
      timeSlot: slot,
      price: space.price,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    alert("Booking confirmed!");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <h4 className="font-semibold mb-2">Book this space</h4>
      <label className="block mb-2">
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-2 py-1 rounded mt-1"
          required
        />
      </label>
      <label className="block mb-4">
        Time Slot
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="w-full border px-2 py-1 rounded mt-1"
        >
          {space.time_slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {user ? "Confirm Booking" : "Login to Book"}
      </button>
    </form>
  );
};

export default BookingForm;
