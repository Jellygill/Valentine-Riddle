import { useQuery } from "@tanstack/react-query";
import { PixelCard } from "@/components/PixelCard";
import { motion, AnimatePresence } from "framer-motion";
import { HeartRain } from "@/components/HeartRain";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PixelButton } from "@/components/PixelButton";
import { useLocation } from "wouter";
import type { Reason } from "@shared/schema";

export default function Reasons() {
  const { data: reasons, isLoading } = useQuery<Reason[]>({
    queryKey: ["/api/reasons"],
  });
  const [, setLocation] = useLocation();
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [showSweet, setShowSweet] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  const handleButtonClick = (reason: Reason) => {
    setSelectedReason(reason);
    setShowSweet(false);
  };

  const handleNext = () => {
    if (selectedReason) {
      setCompletedIds(prev => new Set(prev).add(selectedReason.id));
    }
    setSelectedReason(null);
    setShowSweet(false);
  };

  const handleButWait = () => {
    setShowSweet(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-mono text-xl">LOADING LOVE DATA...</p>
        </div>
      </div>
    );
  }

  const allCompleted = reasons && completedIds.size === reasons.length;

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <HeartRain />

      <header className="max-w-4xl mx-auto mb-8 text-center relative z-10 pt-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <PixelCard className="inline-block bg-primary/10 border-primary/50">
            <h1 className="text-xl md:text-3xl text-primary leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
              REASONS WHY<br />I LOVE YOU
            </h1>
          </PixelCard>
        </motion.div>
      </header>

      {/* Reason Buttons Grid */}
      <div className="max-w-4xl mx-auto mb-8 relative z-10">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {reasons?.map((reason) => {
            const isCompleted = completedIds.has(reason.id);
            const isSelected = selectedReason?.id === reason.id;
            return (
              <motion.button
                key={reason.id}
                onClick={() => handleButtonClick(reason)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`button-reason-${reason.id}`}
                className={`
                  p-4 md:p-6 border-4 border-black text-center transition-all
                  ${isCompleted 
                    ? 'bg-green-200 border-green-600' 
                    : isSelected 
                      ? 'bg-pink-300 border-pink-600' 
                      : 'bg-white hover:bg-pink-100'
                  }
                `}
                style={{ 
                  boxShadow: isCompleted 
                    ? 'inset -4px -4px rgba(0,100,0,0.3)' 
                    : 'inset -4px -4px rgba(0,0,0,0.2)',
                  fontFamily: 'var(--font-pixel)'
                }}
              >
                <div className="text-3xl md:text-4xl mb-2">{reason.emoji}</div>
                <div className="text-[10px] md:text-xs leading-tight">
                  {reason.buttonText}
                </div>
                {isCompleted && (
                  <div className="mt-2 text-green-700 text-lg">✓</div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Response Section */}
      <AnimatePresence mode="wait">
        {selectedReason && (
          <motion.div
            key={selectedReason.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="max-w-2xl mx-auto relative z-10"
          >
            <PixelCard className="bg-white/95 backdrop-blur-sm text-center space-y-6 py-8">
              <div className="text-5xl mb-4">{selectedReason.emoji}</div>
              
              <h2 className="text-lg md:text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
                {selectedReason.buttonText}
              </h2>

              {/* Roast Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-100 border-4 border-dashed border-gray-400 p-4 mx-4"
              >
                <p className="text-lg md:text-xl font-mono text-gray-700">
                  "{selectedReason.roastText}"
                </p>
              </motion.div>

              {/* Sweet Text (shows after clicking "But wait...") */}
              <AnimatePresence>
                {showSweet && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-pink-100 border-4 border-pink-400 p-4 mx-4"
                  >
                    <p className="text-lg md:text-xl font-mono text-pink-800">
                      "{selectedReason.sweetText}"
                    </p>
                    <div className="mt-2 text-2xl">💕</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {!showSweet ? (
                  <>
                    <PixelButton 
                      onClick={handleNext}
                      variant="secondary"
                      data-testid="button-rude"
                    >
                      RUDE! 😤
                    </PixelButton>
                    <PixelButton 
                      onClick={handleButWait}
                      data-testid="button-but-wait"
                    >
                      BUT WAIT... 🥺
                    </PixelButton>
                  </>
                ) : (
                  <PixelButton 
                    onClick={handleNext}
                    data-testid="button-next"
                  >
                    NEXT ➡️
                  </PixelButton>
                )}
              </div>
            </PixelCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Completed Message */}
      <AnimatePresence>
        {allCompleted && !selectedReason && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto relative z-10"
          >
            <PixelCard className="bg-pink-200 text-center space-y-6 py-8">
              <div className="text-6xl">💖</div>
              <h2 className="text-xl md:text-2xl text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
                YOU COMPLETED<br/>THE GAME!
              </h2>
              <p className="text-lg font-mono text-pink-800">
                But the real game is loving you every day... and I'm always winning. 🎮💕
              </p>
              <PixelButton 
                onClick={() => setLocation("/")}
                variant="secondary"
                data-testid="button-restart"
              >
                PLAY AGAIN?
              </PixelButton>
            </PixelCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!selectedReason && !allCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 relative z-10"
        >
          <p className="text-sm text-muted-foreground font-mono animate-pulse">
            ↑ Click a button to see the reason ↑
          </p>
        </motion.div>
      )}

      {/* Retro scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] z-50 opacity-20" />
    </div>
  );
}
