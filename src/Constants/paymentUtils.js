// import { loadStripe } from '@stripe/stripe-js';

const SERVER_URL = 'https://pomotimer-server.herokuapp.com';

export const createCheckoutSession = (priceId, custID, currentUser) => {
  console.log(custID);
  return fetch(`${SERVER_URL}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      priceId,
      email: currentUser.email,
      userID: currentUser.uid,
      custID: custID || undefined
    })
  }).then(result => result.json());
};

// const handleResult = () => {
//   // console.log(result);
// };

export const openCustomerDashboard = customerID => {
  fetch(`${SERVER_URL}/customer-portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      custID: customerID
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

export const processPayment = async () => {
  alert('This feature is currently unavailable');
};

// export const processPayment = async (currentUser, priceID, custID) => {
//   //   if (isUserPremium) {
//   //     openCustomerDashboard();
//   //     return;
//   //   }

//   const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

//   createCheckoutSession(priceID, custID, currentUser).then(data => {
//     // Call Stripe.js method to redirect to the new Checkout page

//     stripe
//       .redirectToCheckout({
//         sessionId: data.sessionId
//       })
//       .then(handleResult);
//   });
// };
