'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEsims } from '@/redux/features/esimSlice';
import { selectEsims } from '@/redux/features/esimSlice';
import EsimCard from '@/components/esim/EsimCard';
import EsimSearchForm from '@/components/common/banner-form/EsimSearchForm';
import esimData from '@/data/EsimData';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const EsimPage = () => {
  const dispatch = useDispatch();
  const esims = useSelector(selectEsims);
  const [filteredEsims, setFilteredEsims] = useState(esims);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 200 });
  const [dataFilter, setDataFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    dispatch(setEsims(esimData as typeof esimData));
  }, [dispatch]);

  useEffect(() => {
    let filtered = esims;

    // Price filter
    filtered = filtered.filter(e => e.price >= priceFilter.min && e.price <= priceFilter.max);

    // Data filter
    if (dataFilter) {
      filtered = filtered.filter(e => e.dataAmount === dataFilter);
    }

    // Sorting
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'data') {
      filtered = [...filtered].sort((a, b) => {
        const aData = parseInt(a.dataAmount);
        const bData = parseInt(b.dataAmount);
        return bData - aData;
      });
    }

    setFilteredEsims(filtered);
  }, [esims, priceFilter, dataFilter, sortBy]);

  const dataOptions = ['1GB', '3GB', '5GB', '10GB', '20GB'];

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

                {/* Data Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Data Amount</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="data"
                      id="data-all"
                      checked={dataFilter === null}
                      onChange={() => setDataFilter(null)}
                    />
                    <label className="form-check-label" htmlFor="data-all">
                      All Plans
                    </label>
                  </div>
                  {dataOptions.map(data => (
                    <div key={data} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data"
                        id={`data-${data}`}
                        checked={dataFilter === data}
                        onChange={() => setDataFilter(data)}
                      />
                      <label className="form-check-label" htmlFor={`data-${data}`}>
                        {data}
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
                <EsimSearchForm />
              </div>

              {/* Sort Options */}
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
                  <option value="data">Sort by Data</option>
                </select>
              </div>

              {/* eSIM Cards */}
              <div className="tg-esims-list">
                {filteredEsims.length > 0 ? (
                  filteredEsims.map(esim => (
                    <EsimCard key={esim.id} esim={esim} />
                  ))
                ) : (
                  <div className="alert alert-info">No eSIM plans found matching your criteria.</div>
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
