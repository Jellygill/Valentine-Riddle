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
        roastText: "Mid-movie, mid-conversation, probably mid-sentence.",
        sweetText: "And somehow, watching you sleep makes my heart soft. You look so peaceful."
      },
      { 
        emoji: "🍟", 
        buttonText: "You steal my fries",
        roastText: "Even when you said you weren't hungry. EVERY. SINGLE. TIME.",
        sweetText: "But honestly? I'd give you all my fries just to see you smile."
      },
      { 
        emoji: "🎮", 
        buttonText: "You're bad at games",
        roastText: "Like, impressively bad. How do you even lose at Mario Kart that badly?",
        sweetText: "But playing with you is still my favorite thing. You're my player 2 forever."
      },
      { 
        emoji: "📱", 
        buttonText: "You take forever to reply",
        roastText: "I could literally grow a beard waiting for your texts sometimes.",
        sweetText: "But when you do reply, even a simple 'hehe' makes my whole day better."
      },
    ];

    for (const seed of seeds) {
      await storage.createReason(seed);
    }
  }
}
