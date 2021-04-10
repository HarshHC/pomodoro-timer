import { loadStripe } from '@stripe/stripe-js';

export const createCheckoutSession = (priceId, currentUser) =>
  fetch('http://localhost:4000/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      priceId,
      email: currentUser.email,
      userID: currentUser.uid,
      custID: 'cus_JHMxux7uBsIRCv'
    })
  }).then(result => result.json());

const handleResult = result => {
  console.log(result);
};

export const openCustomerDashboard = () => {
  fetch('http://localhost:4000/customer-portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      custID: 'cus_JHMxux7uBsIRCv'
    })
  })
    .then(response => response.json())
    .then(data => {
      window.location.href = data.url;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const processPayment = async (currentUser, isUserPremium) => {
  if (isUserPremium) {
    openCustomerDashboard();
    return;
  }

  const PRICE_ID = 'price_1Idbl2HDIe5YOLPEOenqpsQa';
  const stripe = await loadStripe(
    'pk_test_51Ia4N7HDIe5YOLPEPy2Zz3ymAbBKYiTDNKTAHJZ0kWEYHORd3ISIa2qVfuNbsRa71mbbbcNlNsqR4YZGuZoKOsYR00wJTCYWeO'
  );

  createCheckoutSession(PRICE_ID, currentUser).then(data => {
    // Call Stripe.js method to redirect to the new Checkout page
    stripe
      .redirectToCheckout({
        sessionId: data.sessionId
      })
      .then(handleResult);
  });
};
