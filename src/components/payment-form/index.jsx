import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../button';
import './styles.scss';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 10 * 100 }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log('error ->', error));

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Name of buyer',
        },
      },
    });
    console.log('paymentResult ->', paymentResult);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succesful');
      }
    }
  };

  return (
    <div className='paymentFormContainer'>
      <form className='formContainer' onSubmit={paymentHandler}>
        <h2>CREDIT CARD PAYMENT</h2>
        <CardElement />
        <Button
          buttonType={'inverted'}
          onClick={(e) => {
            paymentHandler(e);
          }}
        >
          PAY NOW
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
