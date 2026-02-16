'use client';

import { useState, useRef, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface HotelSearchFormProps {
  onSearch?: (params: any) => void;
}

const HotelSearchForm = ({ onSearch }: HotelSearchFormProps) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | Date[]>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | Date[]>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [showGuests, setShowGuests] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuests(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      location,
      checkInDate,
      checkOutDate,
      rooms,
      adults: guests.adults,
      children: guests.children,
    };
    onSearch?.(searchParams);
  };

  const handleGuestChange = (type: string, action: 'inc' | 'dec') => {
    setGuests(prev => ({
      ...prev,
      [type]: action === 'inc' ? prev[type as keyof typeof prev] + 1 : Math.max(0, prev[type as keyof typeof prev] - 1),
    }));
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        {/* Location */}
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Location:</span>
          <input
            type="text"
            placeholder="City or Hotel Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        {/* Check-in Date */}
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Check-in:</span>
          <Flatpickr
            value={checkInDate}
            onChange={(selectedDates) => setCheckInDate(selectedDates)}
            options={{
              dateFormat: 'd/m/Y',
              minDate: 'today',
            }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        {/* Check-out Date */}
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Check-out:</span>
          <Flatpickr
            value={checkOutDate}
            onChange={(selectedDates) => setCheckOutDate(selectedDates)}
            options={{
              dateFormat: 'd/m/Y',
              minDate: 'today',
            }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        {/* Rooms */}
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Rooms:</span>
          <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="tg-booking-add-input-field">
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div className="tg-booking-form-parent-inner p-relative" ref={guestRef}>
          <span className="tg-booking-form-title">Guests:</span>
          <div
            onClick={() => setShowGuests(!showGuests)}
            className="tg-booking-add-input-field"
            style={{ cursor: 'pointer' }}
          >
            {guests.adults + guests.children} Guest(s)
          </div>
          {showGuests && (
            <div className="tg-booking-form-location-list tg-list-open" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
              <ul>
                <li className="d-flex justify-content-between align-items-center p-3">
                  <span>Adults</span>
                  <div className="d-flex gap-2">
                    <button type="button" onClick={() => handleGuestChange('adults', 'dec')} className="btn btn-sm btn-outline-primary">-</button>
                    <span>{guests.adults}</span>
                    <button type="button" onClick={() => handleGuestChange('adults', 'inc')} className="btn btn-sm btn-outline-primary">+</button>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center p-3">
                  <span>Children</span>
                  <div className="d-flex gap-2">
                    <button type="button" onClick={() => handleGuestChange('children', 'dec')} className="btn btn-sm btn-outline-primary">-</button>
                    <span>{guests.children}</span>
                    <button type="button" onClick={() => handleGuestChange('children', 'inc')} className="btn btn-sm btn-outline-primary">+</button>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Search Hotels
          </button>
        </div>
      </div>
    </form>
  );
};

export default HotelSearchForm;
