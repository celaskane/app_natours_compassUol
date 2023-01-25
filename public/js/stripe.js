/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MU8HRHtvmqTyuqgTnOgxBuvBvuQBjDu5fFDw3XXDzvsZRBk3tajP9GFUcLigVNhVdckhxykpaexlg3P6JiGHamB00s9vbK2D8'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
