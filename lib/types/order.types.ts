// types/order.ts

export type Payment = {
  id: string;
  amount: number;
  payment_status: string;
  payment_method: string;
  created_at: string;
  order: string;
};

export interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  price: string;
  quantity: number;
  item_total: string;
  sku: string;
  variant: any | null;
  created_at: string;
  sub_order: string;
  product: string;
}

export interface SubOrder {
  id: string;
  items: OrderItem[];
  sub_order_number: string;
  status: string;
  subtotal: string;
  tracking_number: string;
  carrier: string;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string;
  shipped_at: string | null;
  delivered_at: string | null;
  order: string;
  merchant: string;
}

export interface Order {
  id: string;
  sub_orders: SubOrder[];
  order_status: string;
  payment: Payment;
  order_number: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  user: string;
  shipping_address: string;
}
