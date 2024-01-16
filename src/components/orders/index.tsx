// Orders.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores';
import OrderCard, { OrderData } from './orderCard';

const Orders: React.FC = () => {

  const { accessToken, sessionToken } = useAuthStore()
  const [orders, setOrders] = useState<OrderData[]>([])
  // Sample data for orders
  // const orders = [
  //   { id: 1, product: 'Product A', quantity: 2, status: 'Pending' },
  //   { id: 2, product: 'Product B', quantity: 1, status: 'Completed' },
  //   // Add more sample orders as needed
  // ];

  const fetchData = async () => {
    // console.log(accessToken,sessionToken)
    let response = await axios.get('https://gw-napi.kotaksecurities.com/Orders/2.0/quick/user/orders?sId=server1', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.access_token || ''}`,
        Auth: `${sessionToken.token || ''}`,
        Sid: `${sessionToken.sid || ''}`,
        'Neo-fin-key': 'neotradeapi'
      }
    })
    setOrders(response.data.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchData().then(() => {

    }).catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='p-8'>
          <h2 className='text-center'>Orders</h2>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.map((order) => (
              <OrderCard key={order.symOrdId} orderData={order} />
            ))
          )}
        </div>
        <div className='p-8'>
              hello
        </div>

      </div>
    </>
  );
};

export default Orders;
