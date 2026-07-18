"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertVariant(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const sizeLabel = formData.get("sizeLabel") as string;
  const priceNaira = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const description = formData.get("description") as string | null;
  const sortOrder = parseInt(formData.get("sortOrder") as string || "0", 10);
  const isActive = formData.get("isActive") === "true";

  // Price stored in kobo (1 Naira = 100 kobo)
  const priceKobo = Math.round(priceNaira * 100);

  const data = {
    name,
    sizeLabel,
    price: priceKobo,
    stock,
    description,
    sortOrder,
    isActive,
    // Provide fallback image if not specified
    images: ["/icon.svg"],
  };

  if (id) {
    // Edit existing variant
    await prisma.productVariant.update({
      where: { id },
      data,
    });
  } else {
    // Create new variant, generate stable alphanumeric ID
    const generatedId = name.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now().toString().slice(-4);
    await prisma.productVariant.create({
      data: {
        id: generatedId,
        ...data,
      },
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/product");
  revalidatePath("/");
}

export async function deleteVariant(id: string) {
  await prisma.productVariant.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/product");
  revalidatePath("/");
}

export async function toggleVariantStatus(id: string, currentStatus: boolean) {
  await prisma.productVariant.update({
    where: { id },
    data: {
      isActive: !currentStatus,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/product");
  revalidatePath("/");
}
