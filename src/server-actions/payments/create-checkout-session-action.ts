"use server";

import { CreateCheckoutSessionInput } from "@/domain/payments/entities/create-checkout-session-input";
import createCheckoutSessionUseCase from "@/domain/payments/use-cases/create-checkout-session-use-case";

export async function createCheckoutSessionAction(
  input: CreateCheckoutSessionInput
) {
  return await createCheckoutSessionUseCase(input);
}
