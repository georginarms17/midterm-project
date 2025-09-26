import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ space }) => {
  const { user } = useAuth();                                                           //gets user from AuthContext
  const { bookings, addBooking } = useBookings();                                       //custom hook to get the bookings and use the function to add booking
  const [date, setDate] = useState("");                                                 //date as a state which is initialized to ("")
  const [slot, setSlot] = useState(space.time_slots ? space.time_slots[0] : "");        //state for the timeslots, default: 1st timeslot
  const navigate = useNavigate();                                                       //hook to navigate between pages

  const today = new Date();                                                             //current date
  const todayStr = today.toISOString().split("T")[0];                                   // YYYY-MM-DD, converts to string        

  const parseTime = (dateStr, timeStr) => {                                             //used to check time
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

  const isSlotTaken = (slotCheck) => {                                                  //check if the slot is taken
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
    e.preventDefault();                                                                 //
    
    //if not logged in, alert will appear then navigate to login page
    if (!user) {
      alert(
        "You must be logged in to book a study space. Redirecting to login page..."
      );
      navigate("/login");
      return;
    }

    if (!date) return alert("Please select a date!");                         //alert for notifying user if date is not selected

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate < new Date(todayStr)) {                                  //alert when booking before current date is attempted
      return alert("You cannot book a date before today.");
    }

    if (date === todayStr) {                                                  //alert when time slot to be booked is already passed
      const slotStartStr = slot.split("-")[0].trim();
      const slotDateTime = parseTime(date, slotStartStr);
      if (slotDateTime && slotDateTime < now) {
        return alert("You cannot book a time slot that has already passed.");
      }
    }

    if (isSlotTaken(slot)) {                                                  //alert when trying to book a booked time slot
      return alert(
        "This time slot has already been booked. Please choose another time slot."
      );
    }

    const booking = {                                                         //creation of a booking
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
    
    // add booking, alert then navigate to the dashboard after confirmation
    addBooking(booking);
    alert("Booking confirmed!");
    navigate("/dashboard/my-bookings"); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl p-10 rounded-2xl mb-20">
      <h4 className="text-[#004A3F] text-center text-[30px] font-bold mb-4">BOOK THE SPACE</h4>
      <label className="text-[#004A3F] block mb-6 px-8 text-[18px]">
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
      <label className="text-[#004A3F] block mb-6 px-8 text-[18px]">
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
        className={`px-4 py-2 rounded-xl ${
          user ? "bg-[#004A3F] text-white" : "bg-[#F2CD76] text-white "
        }`}
      >
        {user ? "Confirm Booking" : "Login to Book"}
      </button>
    </form>
  );
};

export default BookingForm;