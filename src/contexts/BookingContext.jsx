import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useLocalStorage("bookings", []);
  const { user } = useAuth();

  const addBooking = (booking) => setBookings((prev) => [...prev, booking]);
  const cancelBooking = (id) =>
    setBookings((prev) => prev.filter((b) => b.id !== id));
  const getUserBookings = (userId) =>
    bookings.filter((b) => b.userId === userId);

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, getUserBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
