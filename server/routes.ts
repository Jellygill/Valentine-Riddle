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
        buttonText: "You fall asleep when the cold sneaks in",
        roastText: "You get so cozy, you drift mid spin.",
        sweetText: "Watching you sleep feels calm and true, so peaceful somehow my heart warms you.",
      },
      {
        emoji: "😔",
        buttonText: "You ragebait me sometimes",
        roastText: "You tease me at the funniest times",
        sweetText: "But when you laugh and start to smile, my heart just melts and stays warm awhile.",
      },
      {
        emoji: "🎮",
        buttonText: "You're my player 2",
        roastText: "So many hours, just us two.",
        sweetText: "Win or lose, no matter the view, every game is better playing with you.",
      },
      {
        emoji: "📱",
        buttonText: "When you're busy, replies take time",
        roastText: "Duties first and your phone usage declines.",
        sweetText: "But one 'hi babiii' when your day is through, turns everything bright just hearing from you.",
      },
    ];

    for (const seed of seeds) {
      await storage.createReason(seed);
    }
  }
}
