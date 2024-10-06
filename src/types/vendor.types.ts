export interface IVendor {
  _id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  shopContact?: string;
  shopEmail?: string;
  brandName?: string;
  logo?: string;
  address?: {
    formattedAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: number;
    locality?: string;
    coordinates?: {
      type?: "Point";
      coordinates?: [number, number]; // [longitude, latitude]
    };
  };
  panNumber?: string;
  gstNumber?: string;
  licenseNumber?: string;
  uploadedPan?: string;
  uploadedGSTCertificate?: string;
  uploadedLicense?: string;
  uploadedRentDetails?: string;
  otherDocs?: string[];
  openTime?: string;
  closeTime?: string;
}
