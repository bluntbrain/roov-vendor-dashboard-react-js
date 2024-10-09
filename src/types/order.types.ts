export interface IOrder {
  _id?: string;
  billingAddress?: string;
  createdAt?: string;
  deliveryTime?: string;
  items?: {
    price?: number;
    productId?: {
      _id?: string;
      brand?: string;
      name?: string;
      price?: number;
      discountedPrice?: number;
      thumbnail?: string;
    };
    quantity?: number;
    sizeId?: string;
    variantId?: string;
    vendorId?: string;
    _id?: string;
  }[];
  paymentStatus?: string;
  razorPayOrderId?: string;
  shippingAddress?: string;
  shippingCharge?: number;
  status?: string;
  totalAmount?: number;
  updatedAt?: string;
  userId?: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: string | null;
  nextPage: string | null;
}
