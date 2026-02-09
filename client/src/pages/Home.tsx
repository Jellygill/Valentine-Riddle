import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { TypeAnimation } from "react-type-animation";
import { HeartRain } from "@/components/HeartRain";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { attachedAssets } from "@/assets/attached";

const CHOOSE_ICON_SRC = "https://animatedicons.co/get-icon?name=Choose&style=minimalistic&token=02e4a243-2939-468a-a1f0-632c7e448ddb";

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
      <div className="absolute top-1/4 right-16 animate-float text-primary/25 text-5xl select-none" style={{ animationDelay: "0.5s" }}>✨</div>
      <div className="absolute bottom-1/3 left-16 animate-float text-primary/25 text-5xl select-none" style={{ animationDelay: "1.5s" }}>💕</div>
      <div className="absolute top-20 right-1/4 animate-float text-accent/20 text-3xl select-none" style={{ animationDelay: "2.5s" }}>★</div>
      <div className="absolute bottom-40 left-1/3 animate-float text-primary/20 text-4xl select-none" style={{ animationDelay: "0.8s" }}>🌸</div>

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
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src={attachedAssets.gifs.valentinesDay}
                alt="Valentine's Day"
                className="w-16 h-16 md:w-20 md:h-20 object-contain pixel-corners border-4 border-primary/40 bg-white/70"
                loading="eager"
                decoding="async"
              />
              <img
                src={attachedAssets.images.kissPng}
                alt="Kiss"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
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
                800,
                'Ready to find out why you\'re the best? 👀',
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
              <div className="flex flex-col items-center gap-3">
                <AnimatedIcon src={CHOOSE_ICON_SRC} width={80} height={80} />
                <PixelButton 
                  onClick={() => setLocation("/reasons")}
                  size="lg"
                  className="animate-pulse"
                >
                  <span className="inline-flex items-center gap-3">
                    <img
                      src={attachedAssets.gifs.heart}
                      alt="Heart"
                      className="w-6 h-6 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    I ACCEPT
                  </span>
                </PixelButton>
              </div>
              <p className="mt-4 text-xs text-muted-foreground font-mono animate-pulse">
                * Press start to continue *
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground/80 font-mono">
                (yes, you have to click it)
              </p>
            </motion.div>
          )}
        </PixelCard>
      </motion.div>
    </div>
  );
}
