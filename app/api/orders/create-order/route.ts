import { NextRequest, NextResponse } from "next/server";
import { firebase, db } from "@/helpers/utils/db";

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
    const orderRef = db.collection("orders").doc();

    const verifyRef = db.collection("orders").where("txref", "==", body?.txref);

    const snap = await verifyRef.get();

    if (!snap.empty) {
      return NextResponse.json(
        { success: true, message: "doppelganger" },
        { status: 201 }
      );
    }
    // Prepare product data
    const newOrder = {
      txref: body?.txref,
      items: body?.items,
      price: body?.price,
      shippingInfo: body?.shippingInfo,
      createdAt: body?.createdAt,
      status: "producing",
    };

    const batch = db.batch();

    batch.set(orderRef, newOrder);
    // Reduce stock for each purchased product
    body?.items?.forEach((commodity: any, index: number) => {
      const productRef = db.collection("products").doc(commodity?.item?.id);
      console.log(commodity);
      batch.update(productRef, {
        quantity: firebase.firestore.FieldValue.increment(-commodity?.quantity),
        sold: firebase.firestore.FieldValue.increment(commodity?.quantity),
      });
    });

    // Commit the batch operation (order creation + stock reduction)
    await batch.commit();

    // // Add to Firestore
    // const docRef = await db.collection("orders").add(newOrder);

    return NextResponse.json(
      { success: true, message: "Order created" },
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
