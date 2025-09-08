import currentUserAnnualPassInfoUseCase from "@/domain/payments/use-cases/current-user-annual-pass-info-use-case";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userAnnualPassInfoResult = await currentUserAnnualPassInfoUseCase();
    return NextResponse.json(userAnnualPassInfoResult);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
