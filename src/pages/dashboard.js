import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const data = await res.json();
      setWatches(data.watches);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watches.map((watch) => (
          <div key={watch.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{watch.name}</h3>
            <p className="text-gray-500">Stock: {watch.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;