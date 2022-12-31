import { Request, response } from "express";
import Stripe from "stripe";
import { saveSubscription } from "../../utils/manageSubscription";
import { stripe } from "../../utils/stripe";

class WebhooksController {
  async handle(req: Request, res: Response) {
    let event: Stripe.Event = req.body;

    const signature = req.headers["stripe-signature"];

    let endpointSecret = "whsec_20824815ffe1596653824433a49082cd5dc0dce127ab6fb3a609c42037982022";

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log("Webhook signature failed", error.message);
      return response.sendStatus(400);
    }

    switch (event.type) {
      case "customer.subscription.deleted":
        const payment = event.data.object as Stripe.Subscription;

        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        );

        break;
      case "customer.subscription.updated":
        const paymentIntent = event.data.object as Stripe.Subscription;

        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false
        );

        break;
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true
        );

        break;
      default:
        console.log("Evento desonhecido", event.type);
    }

    response.send();
  }
}

export { WebhooksController };
