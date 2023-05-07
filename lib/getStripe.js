import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe("pk_test_51MtRwwSCKWlMTB5i62ghVNdDHxWKEk0f1xoLqs6SAZTGnGOfYnR8Iu7S1SNBo9p2fE2DTM7bz8CBiM1gcQ3KMs0W00pPsdzZ0a");
  }
  return stripePromise;
}

export default getStripe;