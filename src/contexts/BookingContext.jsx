import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();                                             //empty context which will hold all of the bookings

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useLocalStorage("bookings", {});                  //to store the bookings per user
  const { user } = useAuth();                                                       //gets the user from AuthContext

  const addBooking = (booking) => {                                                 //gets existing bookings, empty array for users with no bookings, append new booking and update localStorage
    setBookings((prev) => {
      const copy = { ...prev };
      if (!copy[booking.userId]) copy[booking.userId] = [];
      copy[booking.userId] = [...copy[booking.userId], booking];
      return copy;
    });
  };

  const cancelBooking = (bookingId) => {                                            
    if (!user) return;                                                              //if no user logged in, does nothing
    setBookings((prev) => {
      const copy = { ...prev };                                                     //filter the bookings by the same user id
      copy[user.id] = copy[user.id]?.filter((b) => b.id !== bookingId) || [];
      return copy;
    });
  };

  const getUserBookings = (userId) => {                                             //returns user's bookings
    return bookings[userId] || [];
  };

  return (
    <BookingContext.Provider                                                        //makes the data and functions available to any component
      value={{ bookings, addBooking, cancelBooking, getUserBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
