import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

const BookingForm = ({ space }) => {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.time_slots ? space.time_slots[0] : "");

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to book");

    if (!date) return alert("Please select a date");

    const selectedDate = new Date(date);
    const now = new Date();

    // Reject if date is before today
    if (selectedDate < new Date(todayStr)) {
      return alert("You cannot book a date before today");
    }

    // If booking today, check time slot vs current time
    if (date === todayStr) {
      // Assume slot format like "09:00 AM - 11:00 AM"
      const slotStart = slot.split("-")[0].trim();
      const slotDateTime = new Date(`${date} ${slotStart}`);
      if (slotDateTime < now) {
        return alert("You cannot book a time slot that has already passed");
      }
    }

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
          min={todayStr} // Prevents picking dates before today
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
