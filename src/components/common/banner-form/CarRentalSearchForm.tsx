'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface CarRentalSearchFormProps {
  onSearch?: (params: Record<string, unknown>) => void;
}

const CarRentalSearchForm = ({ onSearch }: CarRentalSearchFormProps) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | Date[]>(new Date());
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffDate, setDropoffDate] = useState<Date | Date[]>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [dropoffTime, setDropoffTime] = useState('10:00');
  const [driverAge, setDriverAge] = useState(25);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      pickupLocation,
      dropoffLocation: dropoffLocation || pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverAge,
    };
    onSearch?.(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Pick-up Location:</span>
          <input
            type="text"
            placeholder="Pick-up City"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Drop-off Location:</span>
          <input
            type="text"
            placeholder="Drop-off City (Optional)"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Pick-up Date:</span>
          <Flatpickr
            value={pickupDate}
            onChange={(selectedDates) => setPickupDate(selectedDates)}
            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Pick-up Time:</span>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Drop-off Date:</span>
          <Flatpickr
            value={dropoffDate}
            onChange={(selectedDates) => setDropoffDate(selectedDates)}
            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Drop-off Time:</span>
          <input
            type="time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Driver Age:</span>
          <input
            type="number"
            min="18"
            max="100"
            value={driverAge}
            onChange={(e) => setDriverAge(Number(e.target.value))}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Search Cars
          </button>
        </div>
      </div>
    </form>
  );
};

export default CarRentalSearchForm;
