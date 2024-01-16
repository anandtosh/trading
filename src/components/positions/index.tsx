// Positions.tsx

import React from 'react';

const Positions: React.FC = () => {
  // Sample data for orders
  const orders = [
    { id: 1, product: 'Product A', quantity: 2, status: 'Pending' },
    { id: 2, product: 'Product B', quantity: 1, status: 'Completed' },
    // Add more sample orders as needed
  ];

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id}<br />
            <strong>Product:</strong> {order.product}<br />
            <strong>Quantity:</strong> {order.quantity}<br />
            <strong>Status:</strong> {order.status}<br />
            {/* Add more details as needed */}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Positions;
