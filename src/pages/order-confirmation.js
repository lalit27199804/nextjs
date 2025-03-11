import Link from 'next/link';

const OrderConfirmation = ({ darkTheme }) => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully! 🎉</h1>
      <p className="text-xl mb-8">Thank you for your purchase!</p>
      <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;