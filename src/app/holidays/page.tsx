'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHolidays } from '@/redux/features/holidaySlice';
import { selectHolidays } from '@/redux/features/holidaySlice';
import HolidayCard from '@/components/holidays/HolidayCard';
import HolidaySearchForm from '@/components/common/banner-form/HolidaySearchForm';
import holidayData from '@/data/HolidayData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const HolidaysPage = () => {
  const dispatch = useDispatch();
  const holidays = useSelector(selectHolidays);
  const [filteredHolidays, setFilteredHolidays] = useState(holidays);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 5000 });
  const [durationFilter, setDurationFilter] = useState<number | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setHolidays(holidayData as typeof holidayData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = holidays;

    // Price filter
    filtered = filtered.filter(h => h.price >= priceFilter.min && h.price <= priceFilter.max);

    // Duration filter
    if (durationFilter) {
      filtered = filtered.filter(h => h.duration === durationFilter);
    }

    // Difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter(h => h.difficulty === difficultyFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    }

    setFilteredHolidays(filtered);
  }, [holidays, priceFilter, durationFilter, difficultyFilter, sortBy]);

  const difficulties = ['Easy', 'Moderate', 'Challenging'];

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
                  <h6 className="mb-3">Price per Person</h6>
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

                {/* Duration Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Duration</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="duration"
                      id="duration-all"
                      checked={durationFilter === null}
                      onChange={() => setDurationFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="duration-all">
                      All Durations
                    </label>
                  </div>
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

                {/* Difficulty Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Difficulty</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="difficulty"
                      id="difficulty-all"
                      checked={difficultyFilter === null}
                      onChange={() => setDifficultyFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="difficulty-all">
                      All Levels
                    </label>
                  </div>
                  {difficulties.map(difficulty => (
                    <div key={difficulty} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="difficulty"
                        id={`difficulty-${difficulty}`}
                        checked={difficultyFilter === difficulty}
                        onChange={() => setDifficultyFilter(difficulty)}
                      />
                      <label className="form-check-label" htmlFor={`difficulty-${difficulty}`}>
                        {difficulty}
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
                <HolidaySearchForm />
              </div>

              {/* Sort Options */}
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

              {/* Holiday Cards */}
              <div className="tg-holidays-list">
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map(holiday => (
                    <HolidayCard key={holiday.id} holiday={holiday} />
                  ))
                ) : (
                  <div className="alert alert-info">No holiday packages found matching your criteria.</div>
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
