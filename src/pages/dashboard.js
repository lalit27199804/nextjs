import { useEffect, useState } from 'react';

const Dashboard = ({ darkTheme }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    recentOrders: []
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalSales = orders.reduce((sum, order) => 
      sum + order.products.reduce((qty, product) => qty + product.quantity, 0)
    , 0);
    
    const recentOrders = orders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setStats({ totalRevenue, totalSales, recentOrders });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-500">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        
        <div className={`p-6 rounded-lg shadow ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-blue-500">
            {stats.totalSales.toLocaleString()}
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className={`border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="py-3 px-4">#{order.id.slice(0, 8)}</td>
                  <td className="py-3 px-4">{order.customer.name}</td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;