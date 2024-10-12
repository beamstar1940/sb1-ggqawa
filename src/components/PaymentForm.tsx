import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertCircle } from 'lucide-react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'An error occurred');
        setProcessing(false);
      } else {
        // Here you would typically send the paymentMethod.id to your server
        // to complete the payment. For this example, we'll simulate success.
        console.log('PaymentMethod:', paymentMethod);
        setSucceeded(true);
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
        className="p-3 border rounded mb-4"
      />
      {error && (
        <div className="text-red-500 flex items-center mb-4">
          <AlertCircle className="mr-2" size={16} />
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50"
      >
        {processing ? 'Processing...' : succeeded ? 'Payment Successful' : 'Pay Now'}
      </button>
      {succeeded && (
        <div className="mt-4 text-green-600 text-center">
          Payment was successful! Thank you for your purchase.
        </div>
      )}
    </form>
  );
};

export default PaymentForm;