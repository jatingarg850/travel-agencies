'use client';

import { Visa } from '@/types/visa';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface VisaCardProps {
  visa: Visa;
}

const VisaCard = ({ visa }: VisaCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: visa.id.toString(),
      title: `${visa.visaType} - ${visa.destinationCountry}`,
      quantity: 1,
    }));
  };

  return (
    <div className="tg-visa-card card mb-3">
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-3">
          <Image
            src={visa.image}
            alt={visa.destinationCountry}
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
              {/* Visa Info */}
              <div className="col-md-6">
                <h5 className="card-title mb-2">{visa.destinationCountry}</h5>
                <div className="mb-3">
                  <span className="badge bg-info me-2">{visa.visaType}</span>
                  <span className="badge bg-secondary">{visa.processingTime}</span>
                </div>
                <div className="mb-3">
                  <span className="badge bg-success me-2">{visa.rating} ⭐</span>
                  <small className="text-muted">({visa.totalReviews} reviews)</small>
                </div>
                <div className="mb-2">
                  <small className="d-block">
                    <i className="fas fa-hourglass-end me-2"></i>Processing: {visa.processingTime}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-calendar me-2"></i>Validity: {visa.validity}
                  </small>
                  <small className="d-block">
                    <i className="fas fa-file-alt me-2"></i>{visa.documents.length} Documents Required
                  </small>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="col-md-6 text-end">
                <div className="mb-3">
                  <h4 className="mb-0 text-primary">${visa.price}</h4>
                  <small className="text-muted">visa fee</small>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Link href={`/visa/${visa.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  <button onClick={handleAddToCart} className="btn btn-sm btn-primary">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="row mt-3">
              <div className="col-12">
                <small className="text-muted">
                  Required: {visa.documents.slice(0, 3).map(d => d.name).join(', ')}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
