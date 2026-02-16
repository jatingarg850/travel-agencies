'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels } from '@/redux/features/hotelSlice';
import { selectHotels } from '@/redux/features/hotelSlice';
import HotelCard from '@/components/hotels/HotelCard';
import HotelSearchForm from '@/components/common/banner-form/HotelSearchForm';
import hotelData from '@/data/HotelData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const HotelsPage = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(selectHotels);
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 2000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setHotels(hotelData as any));
  }, [dispatch]);

  useEffect(() => {
    let filtered = hotels;

    // Price filter
    filtered = filtered.filter(h => h.pricePerNight >= priceFilter.min && h.pricePerNight <= priceFilter.max);

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(h => h.rating >= ratingFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredHotels(filtered);
  }, [hotels, priceFilter, ratingFilter, sortBy]);

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
                  <h6 className="mb-3">Price per Night</h6>
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

                {/* Rating Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Rating</h6>
                  {[0, 4, 4.5, 4.7, 4.9].map(rating => (
                    <div key={rating} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        id={`rating-${rating}`}
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(rating)}
                      />
                      <label className="form-check-label" htmlFor={`rating-${rating}`}>
                        {rating === 0 ? 'All' : `${rating}+ ⭐`}
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
                <HotelSearchForm />
              </div>

              {/* Sort Options */}
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredHotels.length} Hotels</h5>
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

              {/* Hotel Cards */}
              <div className="tg-hotels-list">
                {filteredHotels.length > 0 ? (
                  filteredHotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))
                ) : (
                  <div className="alert alert-info">No hotels found matching your criteria.</div>
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

export default HotelsPage;
