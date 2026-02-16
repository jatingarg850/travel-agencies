'use client';

import { Flight } from '@/types/flight';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: flight.id.toString(),
      title: `${flight.airline} - ${flight.from} to ${flight.to}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-flight-card card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Airline Info */}
          <div className="col-md-2">
            <div className="tg-flight-airline">
              <h6 className="mb-2">{flight.airline}</h6>
              <small className="text-muted">{flight.flightNumber}</small>
            </div>
          </div>

          {/* Departure */}
          <div className="col-md-2">
            <div className="tg-flight-time">
              <h5 className="mb-0">{flight.departureTime}</h5>
              <small className="text-muted">{flight.fromCode}</small>
            </div>
          </div>

          {/* Duration & Stops */}
          <div className="col-md-2">
            <div className="tg-flight-duration text-center">
              <small className="d-block mb-2">{flight.duration}</small>
              <small className="text-muted">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop(s)`}
              </small>
            </div>
          </div>

          {/* Arrival */}
          <div className="col-md-2">
            <div className="tg-flight-time">
              <h5 className="mb-0">{flight.arrivalTime}</h5>
              <small className="text-muted">{flight.toCode}</small>
            </div>
          </div>

          {/* Rating */}
          <div className="col-md-2">
            <div className="tg-flight-rating">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success">{flight.rating}</span>
                <small className="text-muted">({flight.totalReviews})</small>
              </div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="col-md-2">
            <div className="tg-flight-price text-end">
              <div className="mb-2">
                {flight.originalPrice && (
                  <small className="text-muted text-decoration-line-through d-block">
                    ${flight.originalPrice}
                  </small>
                )}
                <h5 className="mb-0 text-primary">${flight.price}</h5>
              </div>
              <div className="d-flex gap-2">
                <Link href={`/flights/${flight.id}`} className="btn btn-sm btn-outline-primary">
                  Details
                </Link>
                <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="row mt-3">
          <div className="col-12">
            <small className="text-muted">
              {flight.amenities.join(' • ')}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
