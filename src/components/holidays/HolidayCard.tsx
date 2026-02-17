'use client';

import { Holiday } from '@/types/holiday';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface HolidayCardProps {
  holiday: Holiday;
}

const HolidayCard = ({ holiday }: HolidayCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: holiday.id.toString(),
      title: `${holiday.destination} - ${holiday.duration} Days`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-holiday-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <Image
            src={holiday.image}
            alt={holiday.destination}
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
              {/* Holiday Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{holiday.destination}</h5>
                <div className="mb-3">
                  <span className="badge bg-info me-2">{holiday.duration} Days</span>
                  <span className="badge bg-secondary">{holiday.difficulty}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{holiday.rating} ⭐</span>
                  <small className="text-muted">({holiday.totalReviews} reviews)</small>
                </div>
                <div className="mb-2">
                  <small className="d-block">
                    <i className="fas fa-calendar me-2"></i>Best Time: {holiday.bestTime}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-users me-2"></i>Group Size: {holiday.groupSize}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-map-marker-alt me-2"></i>{holiday.destination}
                  </small>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  {holiday.originalPrice && (
                    <small className="text-muted text-decoration-line-through d-block">
                      ${holiday.originalPrice}
                    </small>
                  )}
                  <h4 className="mb-0 text-primary">${holiday.price}</h4>
                  <small className="text-muted">per person</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/holidays/${holiday.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted">
                  {holiday.highlights.slice(0, 3).join(' • ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayCard;
