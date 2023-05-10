// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

async function CreateStripeSession(req: NextApiRequest, res: NextApiResponse) {
  const product = req.body.product;
  const transformedItem = {
    price_data: {
      currency: "usd",
      unit_amount: product.price,
      product_data: {
        images: [product.image],
        name: product.name,
        description: product.description,
      },
    },
    quantity: 1,
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });
  console.log(session);
  res.json({ id: session.id });
}

export default CreateStripeSession;
