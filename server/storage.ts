import { db } from "./db";
import { reasons, type Reason, type InsertReason } from "@shared/schema";

export interface IStorage {
  getReasons(): Promise<Reason[]>;
  createReason(reason: InsertReason): Promise<Reason>;
}

export class DatabaseStorage implements IStorage {
  async getReasons(): Promise<Reason[]> {
    return await db.select().from(reasons);
  }

  async createReason(insertReason: InsertReason): Promise<Reason> {
    const [reason] = await db.insert(reasons).values(insertReason).returning();
    return reason;
  }
}

export const storage = new DatabaseStorage();
