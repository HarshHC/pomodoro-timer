import { loadStripe } from '@stripe/stripe-js';

const SERVER_URL = 'https://pomotimer-server.herokuapp.com';

export const createCheckoutSession = (priceId, currentUser) =>
  fetch(`${SERVER_URL}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      priceId,
      email: currentUser.email,
      userID: currentUser.uid
    })
  }).then(result => result.json());

const handleResult = result => {
  console.log(result);
};

export const openCustomerDashboard = () => {
  fetch(`${SERVER_URL}/customer-portal`, {
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

export const processPayment = async (currentUser, isUserPremium, priceID) => {
  if (isUserPremium) {
    openCustomerDashboard();
    return;
  }

  const stripe = await loadStripe(
    'pk_live_51If6aMCis0IADyYOnEtT1mDXRRWTiE4TJTZ5kupPDFdtMMCTh2i6qoNQxaP9vvSyXvbqI7d4TPP6JaNDGwtxPLNN00qFmI9v9K'
  );

  createCheckoutSession(priceID, currentUser).then(data => {
    // Call Stripe.js method to redirect to the new Checkout page
    stripe
      .redirectToCheckout({
        sessionId: data.sessionId
      })
      .then(handleResult);
  });
};
