import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // bookings is stored as { userId1: [...], userId2: [...] }
  const [bookings, setBookings] = useLocalStorage("bookings", {});
  const { user } = useAuth();

  const addBooking = (booking) => {
    setBookings((prev) => {
      const copy = { ...prev };
      if (!copy[booking.userId]) copy[booking.userId] = [];
      copy[booking.userId] = [...copy[booking.userId], booking];
      return copy;
    });
  };

  const cancelBooking = (bookingId) => {
    if (!user) return;
    setBookings((prev) => {
      const copy = { ...prev };
      copy[user.id] = copy[user.id]?.filter((b) => b.id !== bookingId) || [];
      return copy;
    });
  };

  const getUserBookings = (userId) => {
    return bookings[userId] || [];
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, getUserBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
