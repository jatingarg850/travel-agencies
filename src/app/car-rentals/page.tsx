'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from '@/redux/features/carRentalSlice';
import { selectCars } from '@/redux/features/carRentalSlice';
import CarRentalCard from '@/components/carRentals/CarRentalCard';
import CarRentalSearchForm from '@/components/common/banner-form/CarRentalSearchForm';
import carRentalData from '@/data/CarRentalData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const CarRentalsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 300 });
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setCars(carRentalData as any));
  }, [dispatch]);

  useEffect(() => {
    let filtered = cars;

    // Price filter
    filtered = filtered.filter(c => c.pricePerDay >= priceFilter.min && c.pricePerDay <= priceFilter.max);

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCars(filtered);
  }, [cars, priceFilter, typeFilter, sortBy]);

  const carTypes = ['economy', 'compact', 'sedan', 'suv', 'luxury', 'van'];

  return (
    <>
      <HeaderOne />
      <main>
        <div className="container py-5">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="tg-sidebar">
                <h5 className="mb-4">Filters</h5>

                {/* Price Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Price per Day</h6>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="number"
                      min="0"
                      value={priceFilter.min}
                      onChange={(e) => setPriceFilter({ ...priceFilter, min: Number(e.target.value) })}
                      className="form-control form-control-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      value={priceFilter.max}
                      onChange={(e) => setPriceFilter({ ...priceFilter, max: Number(e.target.value) })}
                      className="form-control form-control-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Car Type Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Car Type</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="type-all"
                      checked={typeFilter === null}
                      onChange={() => setTypeFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="type-all">
                      All Types
                    </label>
                  </div>
                  {carTypes.map(type => (
                    <div key={type} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id={`type-${type}`}
                        checked={typeFilter === type}
                        onChange={() => setTypeFilter(type)}
                      />
                      <label className="form-check-label" htmlFor={`type-${type}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {/* Search Form */}
              <div className="mb-4 p-4 bg-light rounded">
                <CarRentalSearchForm />
              </div>

              {/* Sort Options */}
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredCars.length} Cars</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>

              {/* Car Cards */}
              <div className="tg-cars-list">
                {filteredCars.length > 0 ? (
                  filteredCars.map(car => (
                    <CarRentalCard key={car.id} car={car} />
                  ))
                ) : (
                  <div className="alert alert-info">No cars found matching your criteria.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterOne />
    </>
  );
};

export default CarRentalsPage;
