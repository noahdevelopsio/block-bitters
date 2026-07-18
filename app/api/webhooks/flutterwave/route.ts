import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/flutterwave";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("verif-hash");

    // 1. Verify webhook signature
    if (!verifyWebhookSignature(signature)) {
      return NextResponse.json({ error: "Invalid signature hash" }, { status: 401 });
    }

    const payload = await request.json();
    
    // We expect the payload structure to match Flutterwave webhook structure
    // e.g. payload.event === "charge.completed"
    if (payload.status === "successful" || payload.event === "charge.completed") {
      const txRef = payload.txRef || payload.data?.tx_ref;
      const flwId = payload.id || payload.data?.id;
      const flwRef = payload.flwRef || payload.data?.flw_ref;

      // 2. Find the corresponding order
      const order = await prisma.order.findUnique({
        where: { orderNumber: txRef },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // 3. Mark the order as paid authoritatively
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED",
          flutterwaveRef: flwRef,
          flutterwaveTxId: String(flwId),
        },
      });

      return NextResponse.json({ success: true, message: "Webhook processed and order marked PAID" });
    }

    return NextResponse.json({ message: "Event ignored" });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
