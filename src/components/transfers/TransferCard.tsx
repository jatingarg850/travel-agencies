'use client';

import { Transfer } from '@/types/transfer';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface TransferCardProps {
  transfer: Transfer;
}

const TransferCard = ({ transfer }: TransferCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: transfer.id.toString(),
      title: `${transfer.from} to ${transfer.to}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-transfer-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <Image
            src={transfer.image}
            alt={transfer.vehicleType}
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
              {/* Transfer Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{transfer.name}</h5>
                <div className="mb-3">
                  <span className="badge bg-info me-2">{transfer.from} → {transfer.to}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{transfer.rating} ⭐</span>
                  <small className="text-muted">({transfer.totalReviews} reviews)</small>
                </div>
                <div className="mb-2">
                  <small className="d-block">
                    <i className="fas fa-users me-2"></i>{transfer.capacity} Passengers
                  </small>
                  <small className="d-block">
                    <i className="fas fa-clock me-2"></i>{transfer.estimatedDuration}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-road me-2"></i>{transfer.distance}
                  </small>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  {transfer.originalPrice && (
                    <small className="text-muted text-decoration-line-through d-block">
                      ${transfer.originalPrice}
                    </small>
                  )}
                  <h4 className="mb-0 text-primary">${transfer.price}</h4>
                  <small className="text-muted">per transfer</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/transfers/${transfer.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted">
                  {transfer.features.join(' • ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCard;
