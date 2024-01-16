import React from 'react';

export interface OrderData {
  symOrdId: string;
  sym: string;
  ordDtTm: string;
  qty: number;
  stat: string;
  prod: string;
  // Add more properties as needed
}

interface OrderCardProps {
  orderData: OrderData;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderData }) => {
  return (
    <div className="w-full bg-white rounded-md overflow-hidden shadow-md border border-gray-200">
      <div className="px-3 py-1">
        {/* <div className="font-bold text-xl mb-2">Order Details</div> */}
        <ul>
          <li>
            <strong>Order ID:</strong> {orderData.symOrdId}
          </li>
          <li>
            <strong>Symbol:</strong> {orderData.sym}
          </li>
          <li>
            <strong>Order Date & Time:</strong> {orderData.ordDtTm}
          </li>
          <li>
            <strong>Quantity:</strong> {orderData.qty}
          </li>
          {/* Add more details as needed */}
        </ul>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Status: {orderData.stat}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Market Type: {orderData.prod}
        </span>
        {/* Add more status or market-related details */}
      </div>
    </div>
  );
};

export default OrderCard;
