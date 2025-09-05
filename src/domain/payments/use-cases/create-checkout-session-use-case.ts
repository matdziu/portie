import getAuthUserUseCase from "@/domain/auth/use-cases/get-auth-user-use-case";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { redirect } from "next/navigation";
import "server-only";
import { CreateCheckoutSessionInput } from "../entities/create-checkout-session-input";
import currentUserHasAnnualPassUseCase from "./current-user-has-annual-pass-use-case";

export default async function createCheckoutSessionUseCase({
  priceId,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionInput) {
  const { authUser } = await getAuthUserUseCase();

  if (!authUser) {
    redirect("/sign-in");
  }

  const { hasAnnualPass } = await currentUserHasAnnualPassUseCase();

  if (hasAnnualPass) {
    throw new Error("User already has 1-year pass active");
  }

  const user = await prisma.userDb.findUnique({
    where: {
      id: authUser.id,
    },
  });

  let stripeCustomerId = user?.stripeCustomerId;

  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: authUser.email,
      metadata: {
        userId: user?.id ?? "",
      },
    });

    await prisma.userDb.update({
      where: { id: authUser.id },
      data: {
        stripeCustomerId: newCustomer.id,
      },
    });

    stripeCustomerId = newCustomer.id;
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    allow_promotion_codes: true,
    customer: stripeCustomerId,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${successUrl}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${cancelUrl}`,
    metadata: {
      userId: user?.id ?? "",
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
