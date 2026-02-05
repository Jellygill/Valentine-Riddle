import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reasons = pgTable("reasons", {
  id: serial("id").primaryKey(),
  emoji: text("emoji").notNull(),
  buttonText: text("button_text").notNull(),
  roastText: text("roast_text").notNull(),
  sweetText: text("sweet_text").notNull(),
});

export const insertReasonSchema = createInsertSchema(reasons).omit({ id: true });

export type Reason = typeof reasons.$inferSelect;
export type InsertReason = z.infer<typeof insertReasonSchema>;
