import { useReasons } from "@/hooks/use-reasons";
import { PixelCard } from "@/components/PixelCard";
import { motion } from "framer-motion";
import { HeartRain } from "@/components/HeartRain";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PixelButton } from "@/components/PixelButton";
import { useLocation } from "wouter";

export default function Reasons() {
  const { data: reasons, isLoading } = useReasons();
  const [, setLocation] = useLocation();
  const [revealedCount, setRevealedCount] = useState(0);

  // Staggered reveal effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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

  const sortedReasons = reasons?.sort((a, b) => {
    // Put roasts mixed in, but maybe ensure they don't dominate early if sorted by ID
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <HeartRain />

      <header className="max-w-4xl mx-auto mb-12 text-center relative z-10 pt-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <PixelCard className="inline-block bg-primary/10 border-primary/50">
            <h1 className="text-2xl md:text-4xl text-primary leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
              REASONS WHY<br />I LOVE YOU
            </h1>
          </PixelCard>
        </motion.div>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 relative z-10"
      >
        {sortedReasons?.map((reason, index) => (
          <motion.div key={reason.id} variants={item}>
            <PixelCard 
              variant={reason.isRoast ? "white" : "pink"}
              className={`h-full flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 ${reason.isRoast ? 'border-dashed' : ''}`}
            >
              {reason.imageUrl && (
                <div className="mb-4 w-full h-48 overflow-hidden border-2 border-black rounded-sm bg-gray-100 flex items-center justify-center">
                  <img 
                    src={reason.imageUrl} 
                    alt="Reason illustration"
                    className="w-full h-full object-cover pixelated-image"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              )}
              
              <div className="flex-1 flex flex-col justify-center min-h-[120px]">
                <div className="mb-2">
                  {reason.isRoast ? (
                    <span className="inline-block px-2 py-1 bg-gray-200 text-[10px] font-bold font-pixel border border-black mb-2">
                      ROAST 🔥
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-pink-200 text-pink-800 text-[10px] font-bold font-pixel border border-pink-800 mb-2">
                      FACT ❤️
                    </span>
                  )}
                </div>
                
                <p className="text-xl md:text-2xl font-mono leading-relaxed">
                  "{reason.text}"
                </p>
              </div>

              <div className="mt-4 text-xs text-muted-foreground font-mono w-full text-right">
                #{index + 1}
              </div>
            </PixelCard>
          </motion.div>
        ))}

        <motion.div variants={item} className="flex items-center justify-center p-8 md:col-span-2 lg:col-span-3">
          <div className="text-center space-y-4">
             <p className="font-pixel text-sm text-primary mb-4 animate-bounce">
               GAME COMPLETE!
             </p>
             <PixelButton 
               onClick={() => setLocation("/")}
               variant="secondary"
             >
               RESTART GAME
             </PixelButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Retro scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] z-50 opacity-20" />
    </div>
  );
}
