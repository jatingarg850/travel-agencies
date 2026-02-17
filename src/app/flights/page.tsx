'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFlights } from '@/redux/features/flightSlice';
import { selectFlights } from '@/redux/features/flightSlice';
import FlightCard from '@/components/flights/FlightCard';
import FlightSearchForm from '@/components/common/banner-form/FlightSearchForm';
import flightData from '@/data/FlightData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const FlightsPage = () => {
  const dispatch = useDispatch();
  const flights = useSelector(selectFlights);
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const [stopsFilter, setStopsFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setFlights(flightData as typeof flightData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = flights;

    // Price filter
    filtered = filtered.filter(f => f.price >= priceFilter.min && f.price <= priceFilter.max);

    // Stops filter
    if (stopsFilter !== null) {
      filtered = filtered.filter(f => f.stops === stopsFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      filtered = [...filtered].sort((a, b) => {
        const aDuration = parseInt(a.duration);
        const bDuration = parseInt(b.duration);
        return aDuration - bDuration;
      });
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredFlights(filtered);
  }, [flights, priceFilter, stopsFilter, sortBy]);

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
                  <h6 className="mb-3">Price Range</h6>
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

                {/* Stops Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Stops</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stops"
                      id="stops-all"
                      checked={stopsFilter === null}
                      onChange={() => setStopsFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="stops-all">
                      All Flights
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stops"
                      id="stops-0"
                      checked={stopsFilter === 0}
                      onChange={() => setStopsFilter(0)}
                    />
                    <label className="form-check-label" htmlFor="stops-0">
                      Non-stop
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="stops"
                      id="stops-1"
                      checked={stopsFilter === 1}
                      onChange={() => setStopsFilter(1)}
                    />
                    <label className="form-check-label" htmlFor="stops-1">
                      1 Stop
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {/* Search Form */}
              <div className="mb-4 p-4 bg-light rounded">
                <FlightSearchForm />
              </div>

              {/* Sort Options */}
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredFlights.length} Flights</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>

              {/* Flight Cards */}
              <div className="tg-flights-list">
                {filteredFlights.length > 0 ? (
                  filteredFlights.map(flight => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))
                ) : (
                  <div className="alert alert-info">No flights found matching your criteria.</div>
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

export default FlightsPage;
