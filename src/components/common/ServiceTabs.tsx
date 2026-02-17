'use client';

import { useState } from 'react';
import FlightSearchForm from './banner-form/FlightSearchForm';
import HotelSearchForm from './banner-form/HotelSearchForm';
import CarRentalSearchForm from './banner-form/CarRentalSearchForm';
import TransferSearchForm from './banner-form/TransferSearchForm';
import HolidaySearchForm from './banner-form/HolidaySearchForm';
import VisaSearchForm from './banner-form/VisaSearchForm';
import EsimSearchForm from './banner-form/EsimSearchForm';
import FlightIcon from '@/svg/FlightIcon';
import HotelIcon from '@/svg/HotelIcon';
import CarIcon from '@/svg/CarIcon';
import TransferIcon from '@/svg/TransferIcon';
import HolidayIcon from '@/svg/HolidayIcon';
import VisaIcon from '@/svg/VisaIcon';
import EsimIcon from '@/svg/EsimIcon';

type ServiceType = 'flights' | 'hotels' | 'cars' | 'transfers' | 'holidays' | 'visa' | 'esim';

interface ServiceTab {
  id: ServiceType;
  label: string;
  icon: React.ReactNode;
}

const services: ServiceTab[] = [
  { id: 'flights', label: 'Flights', icon: <FlightIcon /> },
  { id: 'hotels', label: 'Hotels', icon: <HotelIcon /> },
  { id: 'cars', label: 'Car Rentals', icon: <CarIcon /> },
  { id: 'transfers', label: 'Transfers', icon: <TransferIcon /> },
  { id: 'holidays', label: 'Holidays', icon: <HolidayIcon /> },
  { id: 'visa', label: 'Visa', icon: <VisaIcon /> },
  { id: 'esim', label: 'eSIM', icon: <EsimIcon /> },
];

const ServiceTabs = () => {
  const [activeService, setActiveService] = useState<ServiceType>('flights');

  const handleSearch = (params: Record<string, unknown>) => {
    console.log(`Searching ${activeService}:`, params);
    // Handle search based on service type
  };

  const renderForm = () => {
    switch (activeService) {
      case 'flights':
        return <FlightSearchForm onSearch={handleSearch} />;
      case 'hotels':
        return <HotelSearchForm onSearch={handleSearch} />;
      case 'cars':
        return <CarRentalSearchForm onSearch={handleSearch} />;
      case 'transfers':
        return <TransferSearchForm onSearch={handleSearch} />;
      case 'holidays':
        return <HolidaySearchForm onSearch={handleSearch} />;
      case 'visa':
        return <VisaSearchForm onSearch={handleSearch} />;
      case 'esim':
        return <EsimSearchForm onSearch={handleSearch} />;
      default:
        return null;
    }
  };

  return (
    <div className="tg-service-tabs">
      <div className="tg-service-tabs-header">
        <div className="tg-service-tabs-nav">
          <div className="tg-service-tabs-nav-inner d-flex justify-content-center gap-3 flex-wrap">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`tg-service-tab-btn ${activeService === service.id ? 'active' : ''}`}
              >
                <span className="tg-service-tab-icon">
                  {service.icon}
                </span>
                <span className="tg-service-tab-label">{service.label}</span>
                <span className="tg-service-tab-border"></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="tg-service-tabs-content mt-4">
        {renderForm()}
      </div>
    </div>
  );
};

export default ServiceTabs;
