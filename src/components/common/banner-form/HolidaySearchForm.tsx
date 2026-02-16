'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface HolidaySearchFormProps {
  onSearch?: (params: any) => void;
}

const HolidaySearchForm = ({ onSearch }: HolidaySearchFormProps) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[]>(new Date());
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState(1);
  const [minBudget, setMinBudget] = useState(500);
  const [maxBudget, setMaxBudget] = useState(5000);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      destination,
      startDate,
      duration,
      travelers,
      budget: { min: minBudget, max: maxBudget },
    };
    onSearch?.(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Destination:</span>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Start Date:</span>
          <Flatpickr
            value={startDate}
            onChange={(selectedDates) => setStartDate(selectedDates)}
            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Duration (Days):</span>
          <input
            type="number"
            min="1"
            max="30"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Travelers:</span>
          <input
            type="number"
            min="1"
            max="20"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Budget Range:</span>
          <div className="d-flex gap-2">
            <input
              type="number"
              min="0"
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
              className="tg-booking-add-input-field"
              placeholder="Min"
              style={{ width: '100px' }}
            />
            <span>-</span>
            <input
              type="number"
              min="0"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="tg-booking-add-input-field"
              placeholder="Max"
              style={{ width: '100px' }}
            />
          </div>
        </div>

        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Search Holidays
          </button>
        </div>
      </div>
    </form>
  );
};

export default HolidaySearchForm;
