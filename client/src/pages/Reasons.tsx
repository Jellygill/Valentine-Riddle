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
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showSecretContent, setShowSecretContent] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleButtonClick = (reason: Reason) => {
    setSelectedReason(reason);
    setShowSweet(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "020326") { 
      setShowSecretContent(true);
      setIsPasswordModalOpen(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
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
          className="flex flex-col gap-4 items-center"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid={`button-reason-${reason.id}`}
                className={`
                  w-full max-w-xl p-4 md:p-5 rounded-full border-4 border-white/50 text-left transition-all flex items-center gap-4
                  ${isCompleted 
                    ? 'bg-green-400/80 text-white' 
                    : isSelected 
                      ? 'bg-pink-400 text-white' 
                      : 'bg-pink-300/70 text-white hover:bg-pink-400'
                  }
                `}
                style={{ 
                  fontFamily: 'var(--font-pixel)',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
                }}
              >
                <span className="text-2xl">{reason.emoji}</span>
                <span className="text-xs md:text-sm uppercase tracking-wider">
                  {reason.buttonText}
                </span>
                {isCompleted && (
                  <span className="ml-auto text-white">✓</span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Response Section */}
      <AnimatePresence mode="wait">
        {selectedReason && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/40 backdrop-blur-[2px]">
            <motion.div
              key={selectedReason.id}
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 5 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="max-w-xl w-full relative"
            >
              <PixelCard className="bg-[#f3e8ff] border-pink-300 shadow-xl py-12 px-8 flex flex-col items-center gap-8 min-h-[400px] justify-center">
                <div className="flex items-center gap-4 self-start md:self-center">
                  <span className="text-4xl">{selectedReason.emoji}</span>
                  <h2 className="text-2xl md:text-3xl text-[#9333ea] uppercase tracking-tighter" style={{ fontFamily: 'var(--font-pixel)' }}>
                    {selectedReason.buttonText}
                  </h2>
                </div>

                <div className="space-y-4 text-center">
                  {selectedReason.roastText.split(',').map((line, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="text-xl md:text-2xl font-retro text-[#7e22ce] opacity-80"
                    >
                      {line.trim()}
                    </motion.p>
                  ))}
                </div>

                {/* Sweet Text Overlay */}
                <AnimatePresence>
                  {showSweet && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-[#f3e8ff] z-10 flex flex-col items-center justify-center p-8 text-center"
                    >
                       <span className="text-5xl mb-6">💖</span>
                       <p className="text-2xl md:text-3xl font-retro text-pink-700 font-bold leading-tight">
                        "{selectedReason.sweetText}"
                      </p>
                      <PixelButton 
                        onClick={handleNext}
                        className="mt-8 rounded-full bg-pink-400 border-white hover:bg-pink-500"
                      >
                        NEXT ➡️
                      </PixelButton>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!showSweet && (
                  <div className="flex gap-4 mt-4">
                    <button 
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-[#fefce8] border-2 border-[#9333ea] rounded-full hover:bg-white transition-colors"
                      style={{ fontFamily: 'var(--font-retro)', fontSize: '1.25rem' }}
                    >
                      <span>😩</span>
                      <span className="text-[#9333ea]">Unacceptable</span>
                    </button>
                    <button 
                      onClick={handleButWait}
                      className="flex items-center gap-2 px-6 py-3 bg-[#fefce8] border-2 border-[#9333ea] rounded-full hover:bg-white transition-colors group"
                      style={{ fontFamily: 'var(--font-retro)', fontSize: '1.25rem' }}
                    >
                      <span className="group-hover:animate-pulse">💖</span>
                      <span className="text-[#9333ea]">And yet...</span>
                    </button>
                  </div>
                )}
              </PixelCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Message Button */}
      {allCompleted && !selectedReason && !showSecretContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12 relative z-10"
        >
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="font-pixel text-xs text-primary underline animate-pulse hover:text-primary/80"
          >
            [ CLICK FOR SECRET MESSAGE ]
          </button>
        </motion.div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 border-8 border-pink-400 max-w-sm w-full text-center space-y-6"
          >
            <h3 className="font-pixel text-sm text-primary">ENTER PASSWORD</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-4 border-black p-2 font-mono text-center outline-none focus:border-pink-500"
                placeholder="???"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 font-pixel text-[10px] animate-shake">WRONG PASSWORD! TRY AGAIN</p>
              )}
              <div className="flex gap-2">
                <PixelButton type="button" variant="secondary" onClick={() => setIsPasswordModalOpen(false)} className="flex-1">CANCEL</PixelButton>
                <PixelButton type="submit" className="flex-1">SUBMIT</PixelButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Secret Content */}
      <AnimatePresence>
        {showSecretContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto relative z-10 mt-8"
          >
            <PixelCard className="bg-pink-200 text-center space-y-6 py-8 border-pink-500">
              <div className="text-6xl animate-bounce">💌</div>
              <h2 className="text-xl md:text-2xl text-primary" style={{ fontFamily: 'var(--font-pixel)' }}>
                TOP SECRET!
              </h2>
              <p className="text-lg font-mono text-pink-800 font-bold px-4">
                "I knew you could do it! You're my favorite human, my best friend, and the person I want to annoy forever. Happy Valentine's Day! I love you more than all the pixels in this game."
              </p>
              <PixelButton 
                onClick={() => setLocation("/")}
                variant="secondary"
                data-testid="button-restart"
                className="rounded-full"
              >
                RESTART?
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
