export type TImage = {
  _id?: string;
  url?: string;
};

export type TSize = {
  _id?: string;
  sizeName?: string; // 'xl' | 'm' | '11'
  availbleQuantity?: number; // 2
};

export interface IVariant {
  _id?: string;
  color?: {
    name?: string; // red | blue
    hex?: string; // #f00
  };
  sizes?: TSize[];
  images?: TImage[];
}

export interface IProduct {
  _id?: string;
  brand?: string;
  name?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  tags?: string[];
  category?: string;
  subCategory?: string;
  vendor_id?: string;
  thumbnail?: string;
  variant?: IVariant[];
}
