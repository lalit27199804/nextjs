import { useEffect, useState } from 'react';

const OrdersPage = ({ darkTheme }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = (JSON.parse(localStorage.getItem('orders')) || [])
    setOrders(savedOrders);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>
      <div className={`overflow-x-auto rounded-lg shadow ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full">
          <thead className={`${darkTheme ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Products</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm">#{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-sm">{order.customer.name}</td>
                <td className="px-6 py-4 text-sm">
                  {order.products.map((p) => (
                    <div key={p.id}>{p.name} (x{p.quantity})</div>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;