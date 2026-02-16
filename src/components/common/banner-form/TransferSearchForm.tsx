'use client';

import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface TransferSearchFormProps {
  onSearch?: (params: any) => void;
}

const TransferSearchForm = ({ onSearch }: TransferSearchFormProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [time, setTime] = useState('10:00');
  const [passengers, setPassengers] = useState(1);
  const [returnTransfer, setReturnTransfer] = useState(false);
  const [returnDate, setReturnDate] = useState<Date | Date[]>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [returnTime, setReturnTime] = useState('10:00');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      from,
      to,
      date,
      time,
      passengers,
      returnTransfer,
      returnDate: returnTransfer ? returnDate : null,
      returnTime: returnTransfer ? returnTime : null,
    };
    onSearch?.(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="tg-booking-form">
      <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between flex-wrap gap-3">
        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">From:</span>
          <input
            type="text"
            placeholder="Pick-up Location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">To:</span>
          <input
            type="text"
            placeholder="Drop-off Location"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Date:</span>
          <Flatpickr
            value={date}
            onChange={(selectedDates) => setDate(selectedDates)}
            options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
            className="tg-booking-add-input-field"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Time:</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Passengers:</span>
          <input
            type="number"
            min="1"
            max="50"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <label className="d-flex align-items-center">
            <input
              type="checkbox"
              checked={returnTransfer}
              onChange={(e) => setReturnTransfer(e.target.checked)}
              className="me-2"
            />
            Return Transfer
          </label>
        </div>

        {returnTransfer && (
          <>
            <div className="tg-booking-form-parent-inner">
              <span className="tg-booking-form-title">Return Date:</span>
              <Flatpickr
                value={returnDate}
                onChange={(selectedDates) => setReturnDate(selectedDates)}
                options={{ dateFormat: 'd/m/Y', minDate: 'today' }}
                className="tg-booking-add-input-field"
                placeholder="dd/mm/yyyy"
              />
            </div>

            <div className="tg-booking-form-parent-inner">
              <span className="tg-booking-form-title">Return Time:</span>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="tg-booking-add-input-field"
              />
            </div>
          </>
        )}

        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Search Transfers
          </button>
        </div>
      </div>
    </form>
  );
};

export default TransferSearchForm;
