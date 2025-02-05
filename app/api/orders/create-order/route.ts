import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields (modify as needed)
    if (!body.items || !body.shippingInfo) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare product data
    const newOrder = {
      txref: body?.txref,
      items: body?.items,
      shippingInfo: body?.shippingInfo,
      createdAt: body?.createdAt,
      status: "processing",
    };

    // Add to Firestore
    const docRef = await db.collection("orders").add(newOrder);

    return NextResponse.json(
      { success: true, message: "Order created", id: docRef.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}
