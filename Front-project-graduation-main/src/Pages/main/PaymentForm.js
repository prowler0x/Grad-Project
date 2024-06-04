import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const PaymentForm = ({ stripe, onStripeLoad }) => {
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      const { token } = await stripe.createToken();

      // Send the token to your server to complete the payment
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Adjust the amount as needed
      });

      const { clientSecret } = await response.json();

      const result = await stripe.handleCardPayment(clientSecret, {
        payment_method_data: {
          card: token.id,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log(result.paymentIntent);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Notify the parent component that Stripe has loaded
  onStripeLoad(stripe);

  return (
    <div>
      <CardElement />
      <button onClick={handlePayment}>Pay</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default injectStripe(PaymentForm);