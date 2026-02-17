'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisas } from '@/redux/features/visaSlice';
import { selectVisas } from '@/redux/features/visaSlice';
import VisaSearchForm from '@/components/common/banner-form/VisaSearchForm';
import visaData from '@/data/VisaData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import Link from 'next/link';
import { useDispatch as useDispatchCart } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

const VisaPage = () => {
  const dispatch = useDispatch();
  const dispatchCart = useDispatchCart();
  const visas = useSelector(selectVisas);
  const [filteredVisas, setFilteredVisas] = useState(visas);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setVisas(visaData as typeof visaData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = visas;

    filtered = filtered.filter(v => v.price >= priceFilter.min && v.price <= priceFilter.max);

    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'processing') {
      filtered = [...filtered].sort((a, b) => {
        const aDays = parseInt(a.processingTime);
        const bDays = parseInt(b.processingTime);
        return aDays - bDays;
      });
    }

    setFilteredVisas(filtered);
  }, [visas, priceFilter, sortBy]);

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
              </div>
            </div>

            <div className="col-lg-9">
              <div className="mb-4 p-4 bg-light rounded">
                <VisaSearchForm />
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredVisas.length} Visa Options</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="processing">Sort by Processing Time</option>
                </select>
              </div>

              <div className="tg-visas-list row">
                {filteredVisas.length > 0 ? (
                  filteredVisas.map(visa => (
                    <div key={visa.id} className="col-md-6 mb-4">
                      <div className="tg-visa-card card h-100">
                        <img src={visa.image} alt={visa.destinationCountry} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                        <div className="card-body">
                          <h5 className="card-title">{visa.destinationCountry}</h5>
                          <p className="text-muted mb-2">
                            <small>{visa.visaType}</small>
                          </p>
                          <div className="mb-3">
                            <small className="d-block mb-1">
                              <strong>Processing:</strong> {visa.processingTime}
                            </small>
                            <small className="d-block mb-1">
                              <strong>Validity:</strong> {visa.validity}
                            </small>
                            <small className="d-block">
                              <strong>Stay:</strong> {visa.stayDuration}
                            </small>
                          </div>
                          <div className="mb-3">
                            <h4 className="mb-0 text-primary">${visa.price}</h4>
                            <small className="text-muted">Application Fee: ${visa.applicationFee}</small>
                          </div>
                          <div className="d-flex gap-2">
                            <Link href={`/visa/${visa.id}`} className="btn btn-sm btn-outline-primary flex-grow-1">
                              Details
                            </Link>
                            <button
                              onClick={() => dispatchCart(addToCart({
                                id: visa.id.toString(),
                                title: `${visa.destinationCountry} - ${visa.visaType}`,
                                quantity: 1,
                              }))}
                              className="btn btn-sm btn-primary flex-grow-1"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info">No visa options found matching your criteria.</div>
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

export default VisaPage;
