import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.reasons.list.path, async (req, res) => {
    const reasons = await storage.getReasons();
    res.json(reasons);
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingReasons = await storage.getReasons();
  if (existingReasons.length === 0) {
    const seeds = [
      { 
        emoji: "😴", 
        buttonText: "You fall asleep everywhere",
        roastText: "You get so cozy you drift off mid-movie or mid-conversation.",
        sweetText: "And somehow, watching you sleep makes my heart soft. You look so peaceful."
      },
      { 
        emoji: "🍟", 
        buttonText: "You steal my fries",
        roastText: "You always say you're not hungry, then end up eating half my plate.",
        sweetText: "But honestly? I'd give you all my fries just to see you smile."
      },
      { 
        emoji: "🎮", 
        buttonText: "You're my player 2",
        roastText: "We've spent so many hours on the couch with controllers in hand.",
        sweetText: "Playing with you is still my favorite thing. You're my player 2 forever."
      },
      { 
        emoji: "📱", 
        buttonText: "You take your time to reply",
        roastText: "You're not always on your phone, and that's actually rare.",
        sweetText: "But when you do reply, even a simple 'hehe' makes my whole day better."
      },
    ];

    for (const seed of seeds) {
      await storage.createReason(seed);
    }
  }
}
