import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { TypeAnimation } from "react-type-animation";
import { HeartRain } from "@/components/HeartRain";

export default function Home() {
  const [, setLocation] = useLocation();
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <HeartRain />

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 animate-float text-primary/20 text-6xl select-none">♥</div>
      <div className="absolute bottom-20 right-10 animate-float text-primary/20 text-8xl select-none" style={{ animationDelay: "1s" }}>♥</div>
      <div className="absolute top-1/2 left-20 animate-float text-accent/30 text-4xl select-none" style={{ animationDelay: "2s" }}>GAME START</div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="z-10 max-w-2xl w-full"
      >
        <PixelCard className="text-center space-y-8 py-12 bg-white/90 backdrop-blur-sm">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2 leading-relaxed" style={{ fontFamily: 'var(--font-pixel)' }}>
              VALENTINE'S<br/>QUEST
            </h1>
            <div className="h-1 w-32 bg-primary mx-auto my-4" />
          </motion.div>

          <div className="min-h-[100px] text-lg md:text-2xl font-medium text-foreground px-4 md:px-12 font-mono leading-relaxed">
            <TypeAnimation
              sequence={[
                'This game contains: light roasting...',
                1000,
                'This game contains: light roasting, and love I refuse to deny.',
                () => setShowButton(true),
              ]}
              wrapper="p"
              speed={50}
              cursor={true}
            />
          </div>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-4"
            >
              <PixelButton 
                onClick={() => setLocation("/reasons")}
                size="lg"
                className="animate-pulse"
              >
                I ACCEPT
              </PixelButton>
              <p className="mt-4 text-xs text-muted-foreground font-mono">
                * Press start to continue
              </p>
            </motion.div>
          )}
        </PixelCard>
      </motion.div>
    </div>
  );
}
