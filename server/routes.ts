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
      { text: "Because you're the only person I can stand for more than 4 hours.", isRoast: true },
      { text: "Your laugh is my favorite sound in the world.", isRoast: false },
      { text: "You make the absolute best grilled cheese sandwiches.", isRoast: false },
      { text: "Even when you're hangry, you're still kind of cute.", isRoast: true },
      { text: "You allow me to steal your french fries without complaining (much).", isRoast: false },
      { text: "Your morning hair looks like a bird's nest, but a cute bird's nest.", isRoast: true },
      { text: "You understand my weird references when no one else does.", isRoast: false },
      { text: "You refuse to kill spiders and make me do it.", isRoast: true },
      { text: "You're my player 2.", isRoast: false },
      { text: "Because you're you.", isRoast: false },
    ];

    for (const seed of seeds) {
      await storage.createReason(seed);
    }
  }
}
