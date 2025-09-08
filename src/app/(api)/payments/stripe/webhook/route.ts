import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature") as string;
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(`Webhook error: ${error}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session & {
      metadata: { userId: string };
    };

    const userId = session.metadata.userId;
    if (userId) {
      try {
        const user = await prisma.userDb.findUnique({
          where: { id: userId },
        });

        if (!user) {
          console.error("User not found");
          return NextResponse.json({ received: true });
        }

        if (user.lastCheckoutSessionId === session.id) {
          console.log(`Session with id ${session.id} was already processed`);
          return NextResponse.json({ received: true });
        }

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        await prisma.userDb.update({
          where: { id: userId },
          data: {
            annualPassExpiry: expiryDate,
            lastCheckoutSessionId: session.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
