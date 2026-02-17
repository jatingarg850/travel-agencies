'use client';

import { Esim } from '@/types/esim';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface EsimCardProps {
  esim: Esim;
}

const EsimCard = ({ esim }: EsimCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: esim.id.toString(),
      title: `${esim.coverage} - ${esim.dataAmount}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-esim-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <Image
            src={esim.image}
            alt={esim.coverage}
            width={300}
            height={300}
            className="img-fluid h-100 object-fit-cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card-body">
            <div className="row align-items-start">
              {/* eSIM Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{esim.coverage}</h5>
                <div className="mb-3">
                  <span className="badge bg-info me-2">{esim.dataAmount} Data</span>
                  <span className="badge bg-secondary">{esim.validity}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{esim.rating} ⭐</span>
                  <small className="text-muted">({esim.totalReviews} reviews)</small>
                </div>
                <div className="mb-2">
                  <small className="d-block">
                    <i className="fas fa-globe me-2"></i>Coverage: {esim.coverage}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-database me-2"></i>Data: {esim.dataAmount}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-tachometer-alt me-2"></i>Speed: {esim.speed}
                  </small>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  {esim.originalPrice && (
                    <small className="text-muted text-decoration-line-through d-block">
                      ${esim.originalPrice}
                    </small>
                  )}
                  <h4 className="mb-0 text-primary">${esim.price}</h4>
                  <small className="text-muted">for {esim.validity}</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/esim/${esim.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted">
                  {esim.features.slice(0, 3).join(' • ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsimCard;
