import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { bookingSchema, type Booking } from "@/lib/booking/types";
export class LocalBookingRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "bookings.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return bookingSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async save(input: Booking) { if (process.env.NODE_ENV === "production") throw new Error("Local bookings are disabled in production."); const records = await this.list(); const booking = bookingSchema.parse(input); await mkdir(path.dirname(this.file), { recursive: true }); const temp = `${this.file}.tmp`; await writeFile(temp, JSON.stringify([...records.filter((item) => item.id !== booking.id), booking], null, 2), "utf8"); await rename(temp, this.file); return booking; }
}

