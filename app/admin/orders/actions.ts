"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  notes: string | null
) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      notes,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
