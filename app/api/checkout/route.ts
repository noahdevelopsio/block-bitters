import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initializePayment } from "@/lib/flutterwave";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      altPhone,
      email,
      address,
      state,
      lga,
      variantId,
      quantity,
      paymentMethod,
    } = body;

    // 1. Fetch variant details
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant) {
      return NextResponse.json({ error: "Product variant not found" }, { status: 400 });
    }

    const subtotal = variant.price * quantity;
    // For demo purposes, we fetch delivery fee as flat ₦2,000 or query DeliveryZone table
    let deliveryFee = 2000;
    const deliveryZone = await prisma.deliveryZone.findUnique({
      where: { state },
    });
    if (deliveryZone) {
      deliveryFee = deliveryZone.fee;
    }

    const total = subtotal + deliveryFee;

    // Generate human-readable order number, e.g. BB-[timestamp] or similar format
    const orderNumber = `BB-${Date.now().toString().slice(-6)}`;

    // 2. Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        altPhone,
        email,
        address,
        state,
        lga,
        deliveryFee,
        subtotal,
        total,
        paymentMethod,
        items: {
          create: {
            variantId,
            quantity,
            unitPrice: variant.price,
          },
        },
      },
    });

    // 3. Handle payment route
    if (paymentMethod === "FLUTTERWAVE") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const paymentResponse = await initializePayment({
        txRef: orderNumber,
        amount: total / 100, // convert kobo to Naira for Flutterwave payment
        email: email || "guest@blockbitters.com",
        phone,
        name: customerName,
        redirectUrl: `${siteUrl}/order/confirmation?orderNumber=${orderNumber}`,
      });

      if (paymentResponse.status === "success" && paymentResponse.data?.link) {
        return NextResponse.json({
          success: true,
          redirectUrl: paymentResponse.data.link,
          orderNumber,
        });
      } else {
        return NextResponse.json(
          { error: "Payment initialization failed", details: paymentResponse.message },
          { status: 500 }
        );
      }
    }

    // POD Path
    return NextResponse.json({
      success: true,
      redirectUrl: `/order/confirmation?orderNumber=${orderNumber}`,
      orderNumber,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
