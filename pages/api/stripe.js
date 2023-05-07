import Stripe from 'stripe';

const stripe = new Stripe("pk_test_51MtRwwSCKWlMTB5i62ghVNdDHxWKEk0f1xoLqs6SAZTGnGOfYnR8Iu7S1SNBo9p2fE2DTM7bz8CBiM1gcQ3KMs0W00pPsdzZ0a");

export default async function handler(req, res) {
  if (req.method === 'POST') {

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1MtRqOQvNJMbeTnrZGSxAGR5'}
                
            ],

            line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/8ojpij95/production/').replace('-webp', '.webp');
      
                return {
                  price_data: { 
                    currency: 'inr',
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  },
                  quantity: item.quantity
                }
              }),
              success_url: `${req.headers.origin}/success`,
              cancel_url: `${req.headers.origin}/canceled`,
            }


      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
        console.log(err)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}