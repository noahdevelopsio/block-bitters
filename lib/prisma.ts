import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// Helper to get path to local data storage
const getFilePath = (fileName: string) => {
  const dir = path.join(process.cwd(), "prisma", "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, fileName);
};

const readData = (fileName: string) => {
  const filePath = getFilePath(fileName);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
};

const writeData = (fileName: string, data: any) => {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Seed local storage with default database records if they are missing
function initDb() {
  const variants = readData("variants.json");
  if (variants.length === 0) {
    writeData("variants.json", [
      {
        id: "single-bottle",
        name: "Single Bottle",
        sizeLabel: "300ml",
        price: 1500000,
        stock: 100,
        isActive: true,
        description: "Standard 300ml bottle of Block Bitters.",
        sortOrder: 1,
        images: ["/icon.svg"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3-bottle-pack",
        name: "3-Bottle Pack",
        sizeLabel: "3-Pack",
        price: 4050000,
        stock: 50,
        isActive: true,
        description: "Convenient 3-pack bundle of Block Bitters.",
        sortOrder: 2,
        images: ["/icon.svg"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "6-bottle-pack",
        name: "6-Bottle Pack",
        sizeLabel: "6-Pack",
        price: 7650000,
        stock: 30,
        isActive: true,
        description: "Value 6-pack box of Block Bitters for long-term stamina.",
        sortOrder: 3,
        images: ["/icon.svg"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }

  const admin = readData("admin.json");
  if (admin.length === 0) {
    writeData("admin.json", [
      {
        id: "admin-user",
        email: "admin@blockbitters.com",
        name: "Block Bitters Admin",
        passwordHash: bcrypt.hashSync("adminpassword123", 10),
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  const zones = readData("zones.json");
  if (zones.length === 0) {
    writeData("zones.json", [
      { id: "lagos", state: "Lagos", fee: 200000 },
      { id: "abuja", state: "Abuja", fee: 350000 },
      { id: "rivers", state: "Rivers", fee: 400000 },
      { id: "ogun", state: "Ogun", fee: 250000 },
      { id: "oyo", state: "Oyo", fee: 250000 },
    ]);
  }
}

class MockProductVariant {
  async findMany(args?: any) {
    initDb();
    let data = readData("variants.json");
    if (args?.where) {
      data = data.filter((v: any) => {
        for (const [key, val] of Object.entries(args.where)) {
          if (v[key] !== val) return false;
        }
        return true;
      });
    }
    if (args?.orderBy) {
      const sortKey = Object.keys(args.orderBy)[0];
      const sortDir = args.orderBy[sortKey];
      data.sort((a: any, b: any) => {
        if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }

  async findUnique(args: any) {
    initDb();
    const data = readData("variants.json");
    const found = data.find((v: any) => v.id === args.where.id);
    return found || null;
  }

  async findFirst(args?: any) {
    const list = await this.findMany(args);
    return list[0] || null;
  }

  async count(args?: any) {
    const list = await this.findMany(args);
    return list.length;
  }

  async create(args: any) {
    initDb();
    const data = readData("variants.json");
    const newItem = {
      ...args.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.push(newItem);
    writeData("variants.json", data);
    return newItem;
  }

  async update(args: any) {
    initDb();
    const data = readData("variants.json");
    const idx = data.findIndex((v: any) => v.id === args.where.id);
    if (idx === -1) throw new Error("Variant not found");
    data[idx] = {
      ...data[idx],
      ...args.data,
      updatedAt: new Date().toISOString(),
    };
    writeData("variants.json", data);
    return data[idx];
  }

  async delete(args: any) {
    initDb();
    let data = readData("variants.json");
    const found = data.find((v: any) => v.id === args.where.id);
    data = data.filter((v: any) => v.id !== args.where.id);
    writeData("variants.json", data);
    return found;
  }

  async upsert(args: any) {
    const found = await this.findUnique({ where: args.where });
    if (found) {
      return this.update({ where: args.where, data: args.update });
    } else {
      return this.create({ data: { id: args.where.id, ...args.create } });
    }
  }
}

class MockOrder {
  async create(args: any) {
    initDb();
    const orders = readData("orders.json");
    const orderItems = readData("order_items.json");

    const newOrder = {
      id: "ord-" + Date.now().toString(),
      orderNumber: args.data.orderNumber,
      customerName: args.data.customerName,
      phone: args.data.phone,
      altPhone: args.data.altPhone,
      email: args.data.email,
      address: args.data.address,
      state: args.data.state,
      lga: args.data.lga,
      deliveryFee: args.data.deliveryFee,
      subtotal: args.data.subtotal,
      total: args.data.total,
      paymentMethod: args.data.paymentMethod,
      paymentStatus: args.data.paymentStatus || "UNPAID",
      status: args.data.status || "PENDING",
      flutterwaveRef: args.data.flutterwaveRef,
      flutterwaveTxId: args.data.flutterwaveTxId,
      notes: args.data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    writeData("orders.json", orders);

    if (args.data.items?.create) {
      const items = Array.isArray(args.data.items.create)
        ? args.data.items.create
        : [args.data.items.create];

      for (const it of items) {
        orderItems.push({
          id: "item-" + Math.random().toString(36).substring(2, 9),
          orderId: newOrder.id,
          variantId: it.variantId,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
        });
      }
      writeData("order_items.json", orderItems);
    }

    return newOrder;
  }

  async findUnique(args: any) {
    initDb();
    const orders = readData("orders.json");
    const foundOrder = orders.find(
      (o: any) => o.id === args.where.id || o.orderNumber === args.where.orderNumber
    );
    if (!foundOrder) return null;

    const result = { ...foundOrder };
    if (args.include?.items) {
      const orderItems = readData("order_items.json");
      const variants = readData("variants.json");

      result.items = orderItems
        .filter((it: any) => it.orderId === foundOrder.id)
        .map((it: any) => ({
          ...it,
          variant: variants.find((v: any) => v.id === it.variantId),
        }));
    }
    return result;
  }

  async findMany(args?: any) {
    initDb();
    let data = readData("orders.json");
    if (args?.where) {
      data = data.filter((v: any) => {
        for (const [key, val] of Object.entries(args.where)) {
          if (key === "createdAt" && val && typeof val === "object") {
            const timeVal = val as any;
            if (timeVal.gte) {
              return new Date(v.createdAt) >= new Date(timeVal.gte);
            }
          }
          if (v[key] !== val) return false;
        }
        return true;
      });
    }

    data.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (args?.include?.items) {
      const orderItems = readData("order_items.json");
      const variants = readData("variants.json");
      data = data.map((o: any) => ({
        ...o,
        items: orderItems
          .filter((it: any) => it.orderId === o.id)
          .map((it: any) => ({
            ...it,
            variant: variants.find((v: any) => v.id === it.variantId),
          })),
      }));
    }
    return data;
  }

  async count(args?: any) {
    const list = await this.findMany(args);
    return list.length;
  }

  async aggregate(args: any) {
    const list = await this.findMany(args);
    const sum = list.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);
    return {
      _sum: {
        total: sum,
      },
    };
  }

  async update(args: any) {
    initDb();
    const orders = readData("orders.json");
    const idx = orders.findIndex((o: any) => o.id === args.where.id);
    if (idx === -1) throw new Error("Order not found");
    orders[idx] = {
      ...orders[idx],
      ...args.data,
      updatedAt: new Date().toISOString(),
    };
    writeData("orders.json", orders);
    return orders[idx];
  }
}

class MockDeliveryZone {
  async findMany() {
    initDb();
    return readData("zones.json");
  }

  async findUnique(args: any) {
    initDb();
    const data = readData("zones.json");
    const found = data.find(
      (z: any) => z.state.toLowerCase() === args.where.state.toLowerCase()
    );
    return found || null;
  }

  async upsert(args: any) {
    initDb();
    const data = readData("zones.json");
    const idx = data.findIndex(
      (z: any) => z.state.toLowerCase() === args.where.state.toLowerCase()
    );
    if (idx !== -1) {
      data[idx] = { ...data[idx], ...args.update };
      writeData("zones.json", data);
      return data[idx];
    } else {
      const newItem = {
        id: "zone-" + Math.random().toString(36).substring(2, 9),
        state: args.where.state,
        ...args.create,
      };
      data.push(newItem);
      writeData("zones.json", data);
      return newItem;
    }
  }
}

class MockAdminUser {
  async findUnique(args: any) {
    initDb();
    const data = readData("admin.json");
    const found = data.find((a: any) => a.email === args.where.email);
    return found || null;
  }

  async create(args: any) {
    initDb();
    const data = readData("admin.json");
    const newItem = {
      id: "admin-" + Math.random().toString(36).substring(2, 9),
      ...args.data,
      createdAt: new Date().toISOString(),
    };
    data.push(newItem);
    writeData("admin.json", data);
    return newItem;
  }
}

class MockPrismaClient {
  productVariant = new MockProductVariant();
  order = new MockOrder();
  deliveryZone = new MockDeliveryZone();
  adminUser = new MockAdminUser();

  async $connect() {
    initDb();
    return Promise.resolve();
  }

  async $disconnect() {
    return Promise.resolve();
  }
}

const prismaClientSingleton = () => {
  // If explicitly configured to use mock database, instantiate Mock Client
  if (process.env.MOCK_DB === "true") {
    console.log("🛠 Using File-Based Mock Database Layer");
    return new MockPrismaClient() as unknown as PrismaClient;
  }
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
