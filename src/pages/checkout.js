import { useState } from 'react';
import { useRouter } from 'next/router';

const CheckoutPage = ({ cart, setCart, darkTheme }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'credit-card'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Order details:', { ...formData, cart });
    localStorage.removeItem('cart');
    setCart([]);
    router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Address</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">City</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-6">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={formData.paymentMethod === 'credit-card'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="form-radio"
              />
              <span>Credit Card</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="form-radio"
              />
              <span>PayPal</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mt-8 hover:bg-blue-600"
            disabled={cart.length === 0}
          >
            Place Order
          </button>
        </form>

        <div className={`p-6 rounded-lg shadow-md ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;