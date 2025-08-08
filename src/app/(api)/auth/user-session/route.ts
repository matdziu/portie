import getUserSessionUseCase from "@/domain/auth/use-cases/get-user-session-use-case";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { session } = await getUserSessionUseCase();
    return NextResponse.json(session);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
