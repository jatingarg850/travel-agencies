'use client';

import { useState } from 'react';

interface EsimSearchFormProps {
  onSearch?: (params: any) => void;
}

const EsimSearchForm = ({ onSearch }: EsimSearchFormProps) => {
  const [destination, setDestination] = useState('');
  const [dataAmount, setDataAmount] = useState('10GB');
  const [validity, setValidity] = useState('7');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = {
      destination,
      dataAmount,
      validity,
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
            placeholder="Country or Region"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="tg-booking-add-input-field"
          />
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Data Amount:</span>
          <select value={dataAmount} onChange={(e) => setDataAmount(e.target.value)} className="tg-booking-add-input-field">
            <option value="5GB">5 GB</option>
            <option value="10GB">10 GB</option>
            <option value="15GB">15 GB</option>
            <option value="20GB">20 GB</option>
            <option value="unlimited">Unlimited</option>
          </select>
        </div>

        <div className="tg-booking-form-parent-inner">
          <span className="tg-booking-form-title">Validity:</span>
          <select value={validity} onChange={(e) => setValidity(e.target.value)} className="tg-booking-add-input-field">
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>

        <div className="tg-booking-form-search-btn">
          <button type="submit" className="bk-search-button">
            Find eSIM
          </button>
        </div>
      </div>
    </form>
  );
};

export default EsimSearchForm;
