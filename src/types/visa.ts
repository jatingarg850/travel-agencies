export interface Visa {
  id: number;
  destinationCountry: string;
  visaType: string;
  image: string;
  price: number;
  processingTime: string;
  validity: string;
  stayDuration: string;
  requirements: string[];
  documents: DocumentRequirement[];
  description: string;
  rating: number;
  totalReviews: number;
  eligibility: string;
  applicationFee: number;
  serviceFee: number;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  format?: string;
}

export interface VisaSearchParams {
  nationality: string;
  destinationCountry: string;
  visaType: string;
  travelDate: string;
}

export interface VisaApplication {
  id: string;
  visaId: number;
  searchParams: VisaSearchParams;
  applicantInfo: ApplicantInfo;
  documents: UploadedDocument[];
  totalPrice: number;
  applicationDate: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected' | 'cancelled';
}

export interface ApplicantInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  occupation: string;
  address: string;
}

export interface UploadedDocument {
  id: string;
  documentType: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
}
