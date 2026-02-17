'use client';

import { Hotel } from '@/types/hotel';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: hotel.id.toString(),
      title: `${hotel.name} - ${hotel.city}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-hotel-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <Image
            src={hotel.image}
            alt={hotel.name}
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
              {/* Hotel Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{hotel.name}</h5>
                <p className="text-muted mb-2">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {hotel.location}, {hotel.city}
                </p>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{hotel.rating} ⭐</span>
                  <small className="text-muted">({hotel.totalReviews} reviews)</small>
                </div>
                <p className="mb-0">
                  <small className="text-muted">
                    {hotel.amenities.slice(0, 3).join(' • ')}
                  </small>
                </p>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  {hotel.originalPrice && (
                    <small className="text-muted text-decoration-line-through d-block">
                      ${hotel.originalPrice}/night
                    </small>
                  )}
                  <h4 className="mb-0 text-primary">${hotel.pricePerNight}</h4>
                  <small className="text-muted">per night</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/hotels/${hotel.id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Room Types */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted d-block mb-2">Available Rooms:</small>
                <div className="d-flex gap-2 flex-wrap">
                  {hotel.roomTypes.map(room => (
                    <span key={room.id} className="badge bg-light text-dark">
                      {room.name} (${room.price})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
