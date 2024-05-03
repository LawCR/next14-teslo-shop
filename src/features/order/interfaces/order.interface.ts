import { Size } from '@/features/product';

export interface Order {
  id:           string;
  subTotal:     number;
  tax:          number;
  total:        number;
  itemsInOrder: number;
  isPaid:       boolean;
  paidAt:       Date | null;
  createdAt:    Date;
  updatedAt:    Date;
  userId:       string;
  orderItems:   OrderItem[];
  orderAddress: OrderAddress | null;
}

export interface OrderAddress {
  id:         string;
  firstName:  string;
  lastName:   string;
  address:    string;
  address2:   string;
  postalCode: string;
  phone:      string;
  department: string;
  province:   string;
  district:   string;
  countryId:  string;
  orderId:    string;
}

export interface OrderItem {
  // id:        string;
  quantity:  number;
  price:     number;
  size:      Size;
  product:   OrderProduct;
}

interface OrderProduct {
  title:  string;
  slug:   string;
  images: OrderImage[];
}

interface OrderImage {
  url: string;
}
