import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { orderSchema, type Order } from "@/lib/orders/types";

export interface OrderRepository { list(): Promise<Order[]>; get(id: string): Promise<Order | null>; findByIdempotencyKey(key: string): Promise<Order | null>; save(order: Order): Promise<Order>; }
export class LocalOrderRepository implements OrderRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "orders.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return orderSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async get(id: string) { return (await this.list()).find((order) => order.id === id) ?? null; }
  async findByIdempotencyKey(key: string) { return (await this.list()).find((order) => order.idempotencyKey === key) ?? null; }
  async save(input: Order) { if (process.env.NODE_ENV === "production") throw new Error("Local orders are disabled in production."); const records = await this.list(); const order = orderSchema.parse(input); await mkdir(path.dirname(this.file), { recursive: true }); const temp = `${this.file}.tmp`; await writeFile(temp, JSON.stringify([...records.filter((item) => item.id !== order.id), order], null, 2), "utf8"); await rename(temp, this.file); return order; }
}

