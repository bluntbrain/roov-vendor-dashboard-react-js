import { IOrder, PaginatedResponse } from "../types/order.types";
import { IProduct, IVariant } from "../types/product.types";
import callAPI from "../utils/callAPI";
import { BASE_URL } from "../utils/constants";

export const createProduct = (body: Partial<IProduct>) => {
  return callAPI<{ data: IProduct }>(
    BASE_URL,
    "/api/v1/product/",
    "post",
    body
  );
};
export const updateProduct = (body: Partial<IProduct>, productId: string) => {
  return callAPI<{ data: IProduct }>(
    BASE_URL,
    "/api/v1/product/" + productId,
    "put",
    body
  );
};

export const getProductByVendorId = (vendorId: string, page: number = 1) => {
  return callAPI<PaginatedResponse<IProduct>>(
    BASE_URL,
    `/api/v1/product/vendor/${vendorId}?page=${page}`,
    "get"
  );
};

export const updateVariant = (body: {
  productId: string;
  variantId: string;
  data: IVariant;
}) => {
  return callAPI<{ data: IProduct }>(
    BASE_URL,
    "/api/v1/product/variant/edit",
    "put",
    body
  );
};

export const updateQuantity = (body: {
  productId: string;
  variantId: string;
  sizeId: string;
  quantity: number;
}) => {
  return callAPI<{ data: IProduct }>(
    BASE_URL,
    "/api/v1/product/variant/quantity/edit",
    "put",
    body
  );
};
export const getOrders = (
  token: string,
  page: number = 1,
  status?: "PENDING" | "IN_TRANSIT" | "COMPLETED" | "MERCHANT_ACCEPTED"
) => {
  let queryParams = "";
  if (!!status) {
    queryParams = `&status=${status}`;
  }
  return callAPI<PaginatedResponse<IOrder>>(
    BASE_URL,
    `/api/v1/vendor/orders?page${page}${queryParams}`,
    "get",
    null,
    token
  );
};

interface ChangeOrderStatusBody {
  approvalStatus: boolean;
}
export const changeOrderStatus = (
  orderId: string,
  body: ChangeOrderStatusBody
) => {
  return callAPI<{order?: IOrder}>(
    BASE_URL,
    "/api/v1/vendor/orders/" + orderId,
    "put",
    body
  );
};
