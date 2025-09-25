import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useLocalStorage('bookings', []);

  const addBooking = (newBooking) => {
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
  };

  const value = { bookings, addBooking, cancelBooking };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBookings = () => {
  return useContext(BookingContext);
};