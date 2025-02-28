import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");

    const discountRef = db.collection("discount-codes").doc(code ?? "");

    const doc = await discountRef.get();

    if (!doc.exists) {
      return NextResponse.json({
        success: true,
        message: "discount not found",
      });
    }
    if (doc?.data()?.count < 0) {
      return NextResponse.json({
        success: true,
        message: "discount not applicable",
      });
    }
    const rate = doc.data()?.rate;

    return NextResponse.json({
      success: true,
      discount: rate,
    });
  } catch (err) {
    console.error("Error fetching discount:", err);
    return NextResponse.json(
      { error: "Failed to fetch discount" },
      { status: 500 }
    );
  }
}
