'use client';

import { CarRental } from '@/types/carRental';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface CarRentalCardProps {
  car: CarRental;
}

const CarRentalCard = ({ car }: CarRentalCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: car.id.toString(),
      title: `${car.name} - ${car.type}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-car-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <img src={car.image} alt={car.name} className="img-fluid h-100 object-fit-cover" />
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card-body">
            <div className="row align-items-start">
              {/* Car Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{car.name}</h5>
                <div className="mb-3">
                  <span className="badge bg-info me-2">{car.type.toUpperCase()}</span>
                  <span className="badge bg-secondary">{car.transmission}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{car.rating} ⭐</span>
                  <small className="text-muted">({car.totalReviews} reviews)</small>
                </div>
                <div className="mb-2">
                  <small className="d-block">
                    <i className="fas fa-users me-2"></i>{car.seats} Seats
                  </small>
                  <small className="d-block">
                    <i className="fas fa-door-open me-2"></i>{car.doors} Doors
                  </small>
                  <small className="d-block">
                    <i className="fas fa-suitcase me-2"></i>{car.luggage} Luggage
                  </small>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  {car.originalPrice && (
                    <small className="text-muted text-decoration-line-through d-block">
                      ${car.originalPrice}/day
                    </small>
                  )}
                  <h4 className="mb-0 text-primary">${car.pricePerDay}</h4>
                  <small className="text-muted">per day</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/car-rentals/${car.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted">
                  {car.features.join(' • ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalCard;
