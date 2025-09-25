import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ space }) => {
  const { user } = useAuth();
  const { bookings, addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.time_slots ? space.time_slots[0] : "");
  const navigate = useNavigate();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Parse "5PM" etc into a Date object
  const parseTime = (dateStr, timeStr) => {
    const match = timeStr.match(/(\d{1,2})(AM|PM)/i);
    if (!match) return null;
    let hour = parseInt(match[1], 10);
    const meridian = match[2].toUpperCase();

    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    const dt = new Date(dateStr);
    dt.setHours(hour, 0, 0, 0);
    return dt;
  };

  const isSlotTaken = (slotCheck) => {
    return Object.values(bookings).some(
      (userBookings) =>
        Array.isArray(userBookings) &&
        userBookings.some(
          (b) =>
            b.spaceId === space.id &&
            b.date === date &&
            b.timeSlot === slotCheck
        )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!date) return alert("Please select a date");

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate < new Date(todayStr)) {
      return alert("You cannot book a date before today");
    }

    if (date === todayStr) {
      const slotStartStr = slot.split("-")[0].trim();
      const slotDateTime = parseTime(date, slotStartStr);
      if (slotDateTime && slotDateTime < now) {
        return alert("You cannot book a time slot that has already passed");
      }
    }

    if (isSlotTaken(slot)) {
      return alert(
        "This time slot has already been booked. Please choose another."
      );
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
          min={todayStr}
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
            <option key={s} value={s} disabled={date && isSlotTaken(s)}>
              {s}
              {date && isSlotTaken(s) ? " (Booked)" : ""}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className={`px-4 py-2 rounded ${
          user ? "bg-green-600 text-white" : "bg-blue-600 text-white"
        }`}
      >
        {user ? "Confirm Booking" : "Login to Book"}
      </button>
    </form>
  );
};

export default BookingForm;
