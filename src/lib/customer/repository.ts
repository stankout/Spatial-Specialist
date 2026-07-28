import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { customerSchema, type Customer } from "@/lib/customer/types";
export interface CustomerRepository { list(): Promise<Customer[]>; get(id: string): Promise<Customer | null>; save(customer: Customer): Promise<Customer>; }
export class LocalCustomerRepository implements CustomerRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "customers.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return customerSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async get(id: string) { return (await this.list()).find((item) => item.id === id) ?? null; }
  async save(input: Customer) { if (process.env.NODE_ENV === "production") throw new Error("Local customer storage is disabled in production."); const records = await this.list(); const customer = customerSchema.parse(input); await mkdir(path.dirname(this.file), { recursive: true }); const temp = `${this.file}.tmp`; await writeFile(temp, JSON.stringify([...records.filter((item) => item.id !== customer.id), customer], null, 2), "utf8"); await rename(temp, this.file); return customer; }
}

