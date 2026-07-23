const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const adminEmail = "admin@licoramargo.com";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("adminpassword123", 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Licor Amargo Admin",
      },
    });
    console.log("✔ Default admin user created (admin@licoramargo.com / adminpassword123)");
  } else {
    console.log("✔ Admin user already exists");
  }

  // 2. Create Product Variants
  // Prices stored in kobo (1 Naira = 100 kobo)
  const variants = [
    {
      name: "Single Bottle",
      sizeLabel: "300ml",
      price: 150000, // ₦1,500
      stock: 100,
      description: "Standard 300ml bottle of Licor Amargo.",
      sortOrder: 1,
      images: ["/licor-amargo-bottle-transparent-1600w.png"],
    },
    {
      name: "3-Bottle Pack",
      sizeLabel: "3-Pack",
      price: 450000, // ₦4,500
      stock: 50,
      description: "Convenient 3-pack bundle of Licor Amargo (3pcs).",
      sortOrder: 2,
      images: ["/licor-amargo-3-pack.webp"],
    },
    {
      name: "6-Bottle Pack",
      sizeLabel: "6-Pack",
      price: 750000, // ₦7,500
      stock: 30,
      description: "Value 6-pack box of Licor Amargo (6pcs).",
      sortOrder: 3,
      images: ["/licor-amargo-6-pack.webp"],
    },
  ];

  for (const variant of variants) {
    await prisma.productVariant.upsert({
      where: { id: variant.name.replace(/\s+/g, "-").toLowerCase() }, // mock stable ID for seeding
      update: {
        name: variant.name,
        sizeLabel: variant.sizeLabel,
        price: variant.price,
        stock: variant.stock,
        description: variant.description,
        sortOrder: variant.sortOrder,
        images: variant.images,
      },
      create: {
        id: variant.name.replace(/\s+/g, "-").toLowerCase(),
        name: variant.name,
        sizeLabel: variant.sizeLabel,
        price: variant.price,
        stock: variant.stock,
        description: variant.description,
        sortOrder: variant.sortOrder,
        images: variant.images,
      },
    });
  }
  console.log("✔ Product variants seeded");

  // 3. Create Delivery Zones
  const zones = [
    { state: "Lagos", fee: 200000 }, // ₦2,000
    { state: "Abuja", fee: 350000 }, // ₦3,500
    { state: "Rivers", fee: 400000 }, // ₦4,000
    { state: "Ogun", fee: 250000 }, // ₦2,500
    { state: "Oyo", fee: 250000 }, // ₦2,500
  ];

  for (const zone of zones) {
    await prisma.deliveryZone.upsert({
      where: { state: zone.state },
      update: { fee: zone.fee },
      create: zone,
    });
  }
  console.log("✔ Delivery zones seeded");

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
