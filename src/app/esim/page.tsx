'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEsims } from '@/redux/features/esimSlice';
import { selectEsims } from '@/redux/features/esimSlice';
import EsimSearchForm from '@/components/common/banner-form/EsimSearchForm';
import esimData from '@/data/EsimData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import Link from 'next/link';
import { useDispatch as useDispatchCart } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

const EsimPage = () => {
  const dispatch = useDispatch();
  const dispatchCart = useDispatchCart();
  const esims = useSelector(selectEsims);
  const [filteredEsims, setFilteredEsims] = useState(esims);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 150 });
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setEsims(esimData as any));
  }, [dispatch]);

  useEffect(() => {
    let filtered = esims;

    filtered = filtered.filter(e => e.price >= priceFilter.min && e.price <= priceFilter.max);

    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredEsims(filtered);
  }, [esims, priceFilter, sortBy]);

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
                <EsimSearchForm />
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredEsims.length} eSIM Plans</h5>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select form-select-sm"
                  style={{ width: '200px' }}
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>

              <div className="tg-esims-list row">
                {filteredEsims.length > 0 ? (
                  filteredEsims.map(esim => (
                    <div key={esim.id} className="col-md-6 mb-4">
                      <div className="tg-esim-card card h-100">
                        <img src={esim.image} alt={esim.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                        <div className="card-body">
                          <h5 className="card-title">{esim.name}</h5>
                          <p className="text-muted mb-2">
                            <small>{esim.coverage}</small>
                          </p>
                          <div className="mb-3">
                            <small className="d-block mb-1">
                              <strong>Data:</strong> {esim.dataAmount}
                            </small>
                            <small className="d-block mb-1">
                              <strong>Validity:</strong> {esim.validity}
                            </small>
                            <small className="d-block mb-1">
                              <strong>Speed:</strong> {esim.speed}
                            </small>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-success">{esim.rating} ⭐</span>
                              <small className="text-muted">({esim.totalReviews})</small>
                            </div>
                          </div>
                          <div className="mb-3">
                            {esim.originalPrice && (
                              <small className="text-muted text-decoration-line-through d-block">
                                ${esim.originalPrice}
                              </small>
                            )}
                            <h4 className="mb-0 text-primary">${esim.price}</h4>
                          </div>
                          <div className="d-flex gap-2">
                            <Link href={`/esim/${esim.id}`} className="btn btn-sm btn-outline-primary flex-grow-1">
                              Details
                            </Link>
                            <button
                              onClick={() => dispatchCart(addToCart({
                                id: esim.id.toString(),
                                title: esim.name,
                                quantity: 1,
                              }))}
                              className="btn btn-sm btn-primary flex-grow-1"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info">No eSIM plans found matching your criteria.</div>
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

export default EsimPage;
