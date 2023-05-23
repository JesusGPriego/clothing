import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button from '../button';
import { clearCart } from '../../store/cart/cart.action';
import './styles.scss';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const dispatch = useDispatch();

  const clearCartItems = () => {
    console.log('linmpiando items');
    dispatch(clearCart());
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
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
          name: currentUser ? currentUser.displayName : 'guest ',
        },
      },
    });
    console.log('paymentResult ->', paymentResult);
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succesful');
      }
    }
    clearCartItems();
  };
  return (
    <div className='paymentFormContainer'>
      <form className='formContainer' onSubmit={paymentHandler}>
        <h2>CREDIT CARD PAYMENT</h2>
        <CardElement />
        <Button
          buttonType={'inverted'}
          isLoading={isProcessingPayment}
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
