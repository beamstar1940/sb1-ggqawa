import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './components/PaymentForm';
import { ShoppingCart, CreditCard, Lock } from 'lucide-react';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

function App() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Secure Payment Integration</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center">
            <ShoppingCart className="mr-2" />
            Product Name
          </span>
          <span>$99.99</span>
        </div>
        
        {!showPaymentForm ? (
          <button
            onClick={() => setShowPaymentForm(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Proceed to Payment
          </button>
        ) : (
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        )}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Our Secure Payment Process</h3>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <CreditCard className="text-blue-600 mb-2" size={32} />
            <span className="text-sm">Encrypted Data</span>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="text-green-600 mb-2" size={32} />
            <span className="text-sm">PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;