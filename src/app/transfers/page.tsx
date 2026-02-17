'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransfers } from '@/redux/features/transferSlice';
import { selectTransfers } from '@/redux/features/transferSlice';
import TransferCard from '@/components/transfers/TransferCard';
import TransferSearchForm from '@/components/common/banner-form/TransferSearchForm';
import transferData from '@/data/TransferData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const TransfersPage = () => {
  const dispatch = useDispatch();
  const transfers = useSelector(selectTransfers);
  const [filteredTransfers, setFilteredTransfers] = useState(transfers);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setTransfers(transferData as typeof transferData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = transfers;

    // Price filter
    filtered = filtered.filter(t => t.price >= priceFilter.min && t.price <= priceFilter.max);

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
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
                  <option value="name">Sort by Type</option>
                </select>
              </div>

              <div className="tg-transfers-list">
                {filteredTransfers.length > 0 ? (
                  filteredTransfers.map(transfer => (
                    <TransferCard key={transfer.id} transfer={transfer} />
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
