import currentUserHasAnnualPassUseCase from "@/domain/payments/use-cases/current-user-has-annual-pass-use-case";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { hasAnnualPass } = await currentUserHasAnnualPassUseCase();
    return NextResponse.json(hasAnnualPass);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
