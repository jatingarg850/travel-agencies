'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface VisaSearchFormProps {
  onSearch?: (params: Record<string, unknown>) => void;
}

const VisaSearchForm = ({ onSearch }: VisaSearchFormProps) => {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [visaType, setVisaType] = useState('tourist');
  const [travelDate, setTravelDate] = useState<Date | Date[]>(new Date());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      nationality,
      destination,
      visaType,
      travelDate,
    };
    onSearch?.(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Your Nationality:</span>
          <input
            type="text"
            placeholder="Your Country"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Destination Country:</span>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Visa Type:</span>
          <select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="tg-booking-add-input-field">
            <option value="tourist">Tourist</option>
            <option value="business">Business</option>
            <option value="student">Student</option>
            <option value="work">Work</option>
          </select>
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Travel Date:</span>
          <Flatpickr
            value={travelDate}
            onChange={(selectedDates) => setTravelDate(selectedDates)}
            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Check Visa
          </button>
        </div>
      </div>
    </form>
  );
};

export default VisaSearchForm;
