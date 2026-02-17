'use client';

import { useState, useRef, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface FlightSearchFormProps {
  onSearch?: (params: Record<string, unknown>) => void;
}

const FlightSearchForm = ({ onSearch }: FlightSearchFormProps) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | Date[]>(new Date());
  const [returnDate, setReturnDate] = useState<Date | Date[]>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [seatClass, setSeatClass] = useState('economy');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengers, setShowPassengers] = useState(false);
  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      from,
      to,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : null,
      tripType,
      seatClass,
      passengers,
    };
    onSearch?.(searchParams);
  };

  const handlePassengerChange = (type: string, action: 'inc' | 'dec') => {
    setPassengers(prev => ({
      ...prev,
      [type]: action === 'inc' ? prev[type as keyof typeof prev] + 1 : Math.max(0, prev[type as keyof typeof prev] - 1),
    }));
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        {/* Trip Type */}
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Trip Type:</span>
          <div className="d-flex gap-3">
            <label className="d-flex align-items-center" style={{ fontSize: '14px' }}>
              <input
                type="radio"
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={(e) => setTripType(e.target.value as 'one-way' | 'round-trip')}
                className="me-2"
              />
              One Way
            </label>
            <label className="d-flex align-items-center" style={{ fontSize: '14px' }}>
              <input
                type="radio"
                value="round-trip"
                checked={tripType === 'round-trip'}
                onChange={(e) => setTripType(e.target.value as 'one-way' | 'round-trip')}
                className="me-2"
              />
              Round Trip
            </label>
          </div>
        </div>

        {/* From */}
        <div className="tg-booking-form-parent-inner flex-grow-1" style={{ minWidth: '150px' }}>
          <span className="tg-booking-form-title">From:</span>
          <input
            type="text"
            placeholder="Departure City"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        {/* To */}
        <div className="tg-booking-form-parent-inner flex-grow-1" style={{ minWidth: '150px' }}>
          <span className="tg-booking-form-title">To:</span>
          <input
            type="text"
            placeholder="Arrival City"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        {/* Departure Date */}
        <div className="tg-booking-form-parent-inner flex-grow-1" style={{ minWidth: '150px' }}>
          <span className="tg-booking-form-title">Departure:</span>
          <Flatpickr
            value={departureDate}
            onChange={(selectedDates) => setDepartureDate(selectedDates)}
            options={{
              dateFormat: 'd/m/Y',
              minDate: 'today',
            }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        {/* Return Date */}
        {tripType === 'round-trip' && (
          <div className="tg-booking-form-parent-inner flex-grow-1" style={{ minWidth: '150px' }}>
            <span className="tg-booking-form-title">Return:</span>
            <Flatpickr
              value={returnDate}
              onChange={(selectedDates) => setReturnDate(selectedDates)}
              options={{
                dateFormat: 'd/m/Y',
                minDate: 'today',
              }}
              className="tg-booking-add-input-field"
              placeholder="dd/mm/yyyy"
            />
          </div>
        )}

        {/* Passengers */}
        <div className="tg-booking-form-parent-inner p-relative flex-grow-1" ref={passengerRef} style={{ minWidth: '150px' }}>
          <span className="tg-booking-form-title">Passengers:</span>
          <div
            onClick={() => setShowPassengers(!showPassengers)}
            className="tg-booking-add-input-field"
            style={{ cursor: 'pointer' }}
          >
            {passengers.adults + passengers.children + passengers.infants} Passenger(s)
          </div>
          {showPassengers && (
            <div className="tg-booking-form-location-list tg-list-open" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
              <ul>
                <li className="d-flex justify-content-between align-items-center p-3">
                  <span>Adults</span>
                  <div className="d-flex gap-2">
                    <button type="button" onClick={() => handlePassengerChange('adults', 'dec')} className="btn btn-sm btn-outline-primary">-</button>
                    <span>{passengers.adults}</span>
                    <button type="button" onClick={() => handlePassengerChange('adults', 'inc')} className="btn btn-sm btn-outline-primary">+</button>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center p-3">
                  <span>Children</span>
                  <div className="d-flex gap-2">
                    <button type="button" onClick={() => handlePassengerChange('children', 'dec')} className="btn btn-sm btn-outline-primary">-</button>
                    <span>{passengers.children}</span>
                    <button type="button" onClick={() => handlePassengerChange('children', 'inc')} className="btn btn-sm btn-outline-primary">+</button>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center p-3">
                  <span>Infants</span>
                  <div className="d-flex gap-2">
                    <button type="button" onClick={() => handlePassengerChange('infants', 'dec')} className="btn btn-sm btn-outline-primary">-</button>
                    <span>{passengers.infants}</span>
                    <button type="button" onClick={() => handlePassengerChange('infants', 'inc')} className="btn btn-sm btn-outline-primary">+</button>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Class */}
        <div className="tg-booking-form-parent-inner flex-grow-1" style={{ minWidth: '120px' }}>
          <span className="tg-booking-form-title">Class:</span>
          <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)} className="tg-booking-add-input-field">
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;
