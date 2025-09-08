import currentUserHasAnnualPassUseCase from "@/domain/payments/use-cases/current-user-has-annual-pass-use-case";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hasAnnualPassResult = await currentUserHasAnnualPassUseCase();
    return NextResponse.json(hasAnnualPassResult);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
