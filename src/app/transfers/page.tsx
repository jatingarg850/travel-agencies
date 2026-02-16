'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransfers } from '@/redux/features/transferSlice';
import { selectTransfers } from '@/redux/features/transferSlice';
import TransferSearchForm from '@/components/common/banner-form/TransferSearchForm';
import transferData from '@/data/TransferData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import Link from 'next/link';
import { useDispatch as useDispatchCart } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

const TransfersPage = () => {
  const dispatch = useDispatch();
  const dispatchCart = useDispatchCart();
  const transfers = useSelector(selectTransfers);
  const [filteredTransfers, setFilteredTransfers] = useState(transfers);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 200 });
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setTransfers(transferData as any));
  }, [dispatch]);

  useEffect(() => {
    let filtered = transfers;

    filtered = filtered.filter(t => t.price >= priceFilter.min && t.price <= priceFilter.max);

    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredTransfers(filtered);
  }, [transfers, priceFilter, sortBy]);

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
                <TransferSearchForm />
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5>Found {filteredTransfers.length} Transfers</h5>
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

              <div className="tg-transfers-list">
                {filteredTransfers.length > 0 ? (
                  filteredTransfers.map(transfer => (
                    <div key={transfer.id} className="tg-transfer-card card mb-3">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img src={transfer.image} alt={transfer.name} className="img-fluid h-100 object-fit-cover" />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <div className="row align-items-start">
                              <div className="col-md-6">
                                <h5 className="card-title mb-2">{transfer.name}</h5>
                                <p className="text-muted mb-2">
                                  <i className="fas fa-arrow-right me-2"></i>
                                  {transfer.from} → {transfer.to}
                                </p>
                                <div className="mb-3">
                                  <span className="badge bg-success me-2">{transfer.rating} ⭐</span>
                                  <small className="text-muted">({transfer.totalReviews} reviews)</small>
                                </div>
                                <small className="text-muted d-block">
                                  {transfer.features.join(' • ')}
                                </small>
                              </div>
                              <div className="col-md-6 text-end">
                                <div className="mb-3">
                                  {transfer.originalPrice && (
                                    <small className="text-muted text-decoration-line-through d-block">
                                      ${transfer.originalPrice}
                                    </small>
                                  )}
                                  <h4 className="mb-0 text-primary">${transfer.price}</h4>
                                </div>
                                <div className="d-flex gap-2 justify-content-end">
                                  <Link href={`/transfers/${transfer.id}`} className="btn btn-sm btn-outline-primary">
                                    Details
                                  </Link>
                                  <button
                                    onClick={() => dispatchCart(addToCart({
                                      id: transfer.id.toString(),
                                      title: transfer.name,
                                      quantity: 1,
                                    }))}
                                    className="btn btn-sm btn-primary"
                                  >
                                    Book
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-info">No transfers found matching your criteria.</div>
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

export default TransfersPage;
