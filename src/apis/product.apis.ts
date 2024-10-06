import { IProduct } from "../types/product.types";
import callAPI from "../utils/callAPI";
import { BASE_URL } from "../utils/constants copy";

export const createProduct = (body: Partial<IProduct>) => {
    return callAPI<IProduct>(BASE_URL, "/api/v1/product/", "post", body);
  };
  