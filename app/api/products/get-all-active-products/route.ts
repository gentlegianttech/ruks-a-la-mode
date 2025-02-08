import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export const revalidate = 60;
export async function GET(req: NextRequest) {
  try {
    const productsDb = db.collection("products").where("quantity", ">", 0);
    let result: any = [];
    let snapshot = await productsDb.get();
    if (snapshot.empty) {
      return NextResponse.json(
        {
          success: true,
          message: "No Products Found",
        },
        { headers: { "Cache-Control": "no-store, max-age=0" } } // Prevents caching
      );
    }
    snapshot.forEach((doc) => result.push({ id: doc.id, data: doc.data() }));
    return NextResponse.json(
      {
        success: true,
        products: result,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } } // Prevents caching
    );
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
