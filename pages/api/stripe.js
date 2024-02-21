import Stripe from 'stripe';

// * Fake card data
// * 4242424242424242
// * 02/42     424

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SANITY_PROJECT_ID = '76h5uo8t';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Om6DbA7mdx0vGNHtguKFsYK' },
          { shipping_rate: 'shr_1Om6F5A7mdx0vGNHMnLXcMYQ' },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/production/`
            )
            .replace('-webp', '.webp')
            .replace('-png', '.png')
            .replace('-jpeg', '.jpeg')
            .replace('-jpg', '.jpg');

          return {
            price_data: {
              currency: 'cad',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
