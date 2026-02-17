'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisas } from '@/redux/features/visaSlice';
import { selectVisas } from '@/redux/features/visaSlice';
import VisaCard from '@/components/visa/VisaCard';
import VisaSearchForm from '@/components/common/banner-form/VisaSearchForm';
import visaData from '@/data/VisaData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const VisaPage = () => {
  const dispatch = useDispatch();
  const visas = useSelector(selectVisas);
  const [filteredVisas, setFilteredVisas] = useState(visas);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const [processingFilter, setProcessingFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setVisas(visaData as typeof visaData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = visas;

    // Price filter
    filtered = filtered.filter(v => v.price >= priceFilter.min && v.price <= priceFilter.max);

    // Processing time filter
    if (processingFilter) {
      filtered = filtered.filter(v => v.processingTime === processingFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'processing') {
      filtered = [...filtered].sort((a, b) => {
        const aDays = parseInt(a.processingTime);
        const bDays = parseInt(b.processingTime);
        return aDays - bDays;
      });
    }

    setFilteredVisas(filtered);
  }, [visas, priceFilter, processingFilter, sortBy]);

  const processingTimes = ['3-5 Days', '5-7 Days', '7-10 Days', '10-15 Days'];

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

                {/* Processing Time Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Processing Time</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="processing"
                      id="processing-all"
                      checked={processingFilter === null}
                      onChange={() => setProcessingFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="processing-all">
                      All Times
                    </label>
                  </div>
                  {processingTimes.map(time => (
                    <div key={time} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="processing"
                        id={`processing-${time}`}
                        checked={processingFilter === time}
                        onChange={() => setProcessingFilter(time)}
                      />
                      <label className="form-check-label" htmlFor={`processing-${time}`}>
                        {time}
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
                <VisaSearchForm />
              </div>

              {/* Sort Options */}
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredVisas.length} Visa Options</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="processing">Sort by Processing Time</option>
                </select>
              </div>

              {/* Visa Cards */}
              <div className="tg-visas-list">
                {filteredVisas.length > 0 ? (
                  filteredVisas.map(visa => (
                    <VisaCard key={visa.id} visa={visa} />
                  ))
                ) : (
                  <div className="alert alert-info">No visa options found matching your criteria.</div>
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

export default VisaPage;
