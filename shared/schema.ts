import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reasons = pgTable("reasons", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  isRoast: boolean("is_roast").default(false),
  imageUrl: text("image_url"),
});

export const insertReasonSchema = createInsertSchema(reasons).omit({ id: true });

export type Reason = typeof reasons.$inferSelect;
export type InsertReason = z.infer<typeof insertReasonSchema>;
