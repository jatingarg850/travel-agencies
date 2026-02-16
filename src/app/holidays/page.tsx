'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHolidays } from '@/redux/features/holidaySlice';
import { selectHolidays } from '@/redux/features/holidaySlice';
import HolidaySearchForm from '@/components/common/banner-form/HolidaySearchForm';
import holidayData from '@/data/HolidayData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import Link from 'next/link';
import { useDispatch as useDispatchCart } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

const HolidaysPage = () => {
  const dispatch = useDispatch();
  const dispatchCart = useDispatchCart();
  const holidays = useSelector(selectHolidays);
  const [filteredHolidays, setFilteredHolidays] = useState(holidays);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 5000 });
  const [durationFilter, setDurationFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setHolidays(holidayData as any));
  }, [dispatch]);

  useEffect(() => {
    let filtered = holidays;

    filtered = filtered.filter(h => h.price >= priceFilter.min && h.price <= priceFilter.max);

    if (durationFilter) {
      filtered = filtered.filter(h => h.duration === durationFilter);
    }

    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    }

    setFilteredHolidays(filtered);
  }, [holidays, priceFilter, durationFilter, sortBy]);

  return (
    <>
      <HeaderOne />
      <main>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3">
              <div className="tg-sidebar">
                <h5 className="mb-4">Filters</h5>
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
                <div className="mb-4">
                  <h6 className="mb-3">Duration</h6>
                  {[3, 4, 5, 6, 7].map(days => (
                    <div key={days} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="duration"
                        id={`duration-${days}`}
                        checked={durationFilter === days}
                        onChange={() => setDurationFilter(days)}
                      />
                      <label className="form-check-label" htmlFor={`duration-${days}`}>
                        {days} Days
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="mb-4 p-4 bg-light rounded">
                <HolidaySearchForm />
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredHolidays.length} Holiday Packages</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="duration">Sort by Duration</option>
                </select>
              </div>

              <div className="tg-holidays-list row">
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map(holiday => (
                    <div key={holiday.id} className="col-md-6 mb-4">
                      <div className="tg-holiday-card card h-100">
                        <img src={holiday.image} alt={holiday.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                          <h5 className="card-title">{holiday.title}</h5>
                          <p className="text-muted mb-2">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {holiday.destination}
                          </p>
                          <div className="mb-2">
                            <span className="badge bg-success me-2">{holiday.rating} ⭐</span>
                            <small className="text-muted">({holiday.totalReviews} reviews)</small>
                          </div>
                          <p className="text-muted mb-2">
                            <small>{holiday.duration} Days • {holiday.difficulty}</small>
                          </p>
                          <div className="mb-3">
                            {holiday.originalPrice && (
                              <small className="text-muted text-decoration-line-through d-block">
                                ${holiday.originalPrice}
                              </small>
                            )}
                            <h4 className="mb-0 text-primary">${holiday.price}</h4>
                          </div>
                          <div className="d-flex gap-2">
                            <Link href={`/holidays/${holiday.id}`} className="btn btn-sm btn-outline-primary flex-grow-1">
                              Details
                            </Link>
                            <button
                              onClick={() => dispatchCart(addToCart({
                                id: holiday.id.toString(),
                                title: holiday.title,
                                quantity: 1,
                              }))}
                              className="btn btn-sm btn-primary flex-grow-1"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info">No holiday packages found matching your criteria.</div>
                  </div>
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

export default HolidaysPage;
