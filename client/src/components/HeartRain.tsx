import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PIXEL_HEART = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h4v4h-4zM8 8h4v4h-4zM12 8h4v4h-4zM16 4h4v4h-4zM2 8h4v4h-4zM2 12h4v4h-4zM6 16h4v4h-4zM10 20h4v4h-4zM14 16h4v4h-4zM18 12h4v4h-4zM22 8h4v4h-4zM18 8h4v4h-4z" />
  </svg>
);

export function HeartRain() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-20), // Keep max 20 hearts in DOM
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: heart.delay, ease: "linear" }}
          className="absolute text-primary/30"
          style={{ left: `${heart.left}%` }}
        >
          {PIXEL_HEART}
        </motion.div>
      ))}
    </div>
  );
}
