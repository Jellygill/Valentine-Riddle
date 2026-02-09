import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartRain } from "@/components/HeartRain";
import { PixelCard } from "@/components/PixelCard";
import { PixelButton } from "@/components/PixelButton";
import { attachedAssets } from "@/assets/attached";

const STEPS = {
  LOCK: 0,
  LATTE: 1,
  BEET: 2,
  LOAF: 3,
  PROPOSAL: 4,
  YES_CELEBRATION: 5,
} as const;

export default function SecretSequence() {
  const [step, setStep] = useState(STEPS.LOCK);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);

  const moveNoButton = useCallback(() => {
    const padding = 100;
    setNoButtonPos({
      x: padding + Math.random() * (window.innerWidth - padding * 2 - 120),
      y: padding + Math.random() * (window.innerHeight - padding * 2 - 60),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeartRain />

      <AnimatePresence mode="wait">
        {/* Step 0: One more thing + lock */}
        {step === STEPS.LOCK && (
          <motion.div
            key="lock"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-lg w-full text-center space-y-8 relative z-10"
          >
            <PixelCard className="bg-white/95 backdrop-blur py-12 px-8 space-y-8">
              <p className="text-xl md:text-2xl font-retro text-foreground leading-relaxed">
                There is one more thing I haven&apos;t said yet..
              </p>
              <motion.button
                type="button"
                onClick={() => setStep(STEPS.LATTE)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl border-4 border-primary bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <img
                  src={attachedAssets.gifs.lock}
                  alt="Lock"
                  className="w-20 h-20 object-contain gif-transparent"
                  loading="eager"
                  decoding="async"
                />
                <span className="font-pixel text-sm text-primary">CLICK TO UNLOCK</span>
              </motion.button>
            </PixelCard>
          </motion.div>
        )}

        {/* Step 1: I like you a latte */}
        {step === STEPS.LATTE && (
          <motion.div
            key="latte"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg w-full text-center space-y-8 relative z-10"
          >
            <PixelCard className="bg-amber-50/95 border-amber-300 py-12 px-8 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center min-h-[8rem] items-center"
              >
                <img
                  src={attachedAssets.gifs.latteArt}
                  alt="Latte art"
                  className="w-40 h-40 object-contain rounded-lg border-4 border-amber-200 bg-white/70 gif-transparent"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
              <p className="text-2xl md:text-3xl font-bold text-amber-900" style={{ fontFamily: 'var(--font-pixel)' }}>
                I like you a latte!
              </p>
              <PixelButton onClick={() => setStep(STEPS.BEET)} size="lg" className="rounded-full">
                Click here →
              </PixelButton>
            </PixelCard>
          </motion.div>
        )}

        {/* Step 2: You make my heart skip a beet */}
        {step === STEPS.BEET && (
          <motion.div
            key="beet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg w-full text-center space-y-8 relative z-10"
          >
            <PixelCard className="bg-red-50/95 border-red-300 py-12 px-8 space-y-6">
              <motion.img
                src={attachedAssets.gifs.beet}
                alt="Beet"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring" }}
                className="w-40 h-40 object-contain mx-auto gif-transparent"
                loading="eager"
                decoding="async"
              />
              <p className="text-xl md:text-2xl font-bold text-red-900 leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
                You make my heart skip a beet
              </p>
              <PixelButton onClick={() => setStep(STEPS.LOAF)} size="lg" className="rounded-full">
                Next →
              </PixelButton>
            </PixelCard>
          </motion.div>
        )}

        {/* Step 3: I loaf you */}
        {step === STEPS.LOAF && (
          <motion.div
            key="loaf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg w-full text-center space-y-8 relative z-10"
          >
            <PixelCard className="bg-amber-100/95 border-amber-400 py-12 px-8 space-y-6">
              <motion.img
                src={attachedAssets.gifs.breadLoaf}
                alt="Bread loaf"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-40 h-40 object-contain mx-auto gif-transparent"
                loading="eager"
                decoding="async"
              />
              <p className="text-2xl md:text-3xl font-bold text-amber-900" style={{ fontFamily: 'var(--font-pixel)' }}>
                I loaf you
              </p>
              <PixelButton onClick={() => setStep(STEPS.PROPOSAL)} size="lg" className="rounded-full">
                One more... →
              </PixelButton>
            </PixelCard>
          </motion.div>
        )}

        {/* Step 4: Will you be my Valentine? Yes / No */}
        {step === STEPS.PROPOSAL && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg w-full text-center space-y-8 relative z-10"
          >
            <PixelCard className="bg-pink-50/95 border-pink-400 py-12 px-8 space-y-8">
              <img
                src={attachedAssets.gifs.loveLetter}
                alt="Love letter"
                className="w-44 h-44 object-contain mx-auto gif-transparent"
                loading="eager"
                decoding="async"
              />
              <p className="text-lg md:text-xl font-bold text-pink-900 leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
                Will you be my Valentines Mary Iris, my babi?
              </p>
              <div className="flex flex-wrap justify-center gap-4 items-center min-h-[120px] relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PixelButton
                    size="lg"
                    onClick={() => setStep(STEPS.YES_CELEBRATION)}
                    className="rounded-full bg-green-500 border-green-700 hover:bg-green-600"
                  >
                    Yes!
                  </PixelButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={noButtonPos ? "fixed z-[100]" : ""}
                  style={
                    noButtonPos
                      ? { left: noButtonPos.x, top: noButtonPos.y, transform: "translate(-50%, -50%)" }
                      : undefined
                  }
                >
                  <PixelButton
                    size="lg"
                    variant="secondary"
                    onClick={moveNoButton}
                    onMouseEnter={noButtonPos ? undefined : moveNoButton}
                    className="rounded-full"
                  >
                    No
                  </PixelButton>
                </motion.div>
              </div>
            </PixelCard>
          </motion.div>
        )}

        {/* Step 5: Celebration */}
        {step === STEPS.YES_CELEBRATION && (
          <Celebration />
        )}
      </AnimatePresence>
    </div>
  );
}

function Celebration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundImages = attachedAssets.images.backgrounds;

  // Stacked pile layout: pics fanned behind each other, overlapping in one cluster
  const getStackPosition = (idx: number) => {
    const angle = (idx / backgroundImages.length) * Math.PI * 1.2 - 0.4;
    const radius = 35 + (idx % 3) * 18;
    const baseX = Math.cos(angle) * radius + (idx % 2 === 0 ? 8 : -8);
    const baseY = Math.sin(angle) * radius * 0.7 + (idx % 3) * 6;
    const rotate = -12 + (idx % 5) * 7 - idx * 2;
    return { baseX, baseY, rotate };
  };

  return (
    <motion.div
      key="celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center p-4 z-20 bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100"
    >
      <HeartRain />
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <img
          src={attachedAssets.gifs.valentinesDay}
          alt=""
          className="absolute left-6 top-6 w-28 h-28 object-contain gif-transparent"
          aria-hidden="true"
        />
        <img
          src={attachedAssets.gifs.love}
          alt=""
          className="absolute right-6 top-10 w-28 h-28 object-contain gif-transparent"
          aria-hidden="true"
        />
        <img
          src={attachedAssets.gifs.kiss}
          alt=""
          className="absolute left-10 bottom-10 w-28 h-28 object-contain gif-transparent"
          aria-hidden="true"
        />
      </div>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.02,
          }}
          className="absolute text-primary text-4xl"
          style={{ pointerEvents: "none" }}
        >
          ❤️
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative z-10 text-center max-w-4xl w-full"
      >
        <p className="text-5xl md:text-7xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
          YAY!
        </p>
        {/* Edit the celebration message below (e.g. change name or message) */}
        <p className="text-xl md:text-2xl text-foreground font-retro">
          My babiii saidd yess!! YAYYYYYYYYY! Happy Valentine&apos;s Day!!!
        </p>

        <div
          ref={containerRef}
          className="mt-10 relative w-[320px] h-[280px] md:w-[380px] md:h-[340px] mx-auto"
        >
          {backgroundImages.map((src: string, idx: number) => {
            const { baseX, baseY, rotate } = getStackPosition(idx);
            const z = idx;

            return (
              <motion.div
                key={idx}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing touch-none will-change-transform"
                style={{ zIndex: z }}
                initial={{ scale: 0, x: baseX, y: baseY, rotate }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.04, zIndex: 99 }}
                whileDrag={{ scale: 1.02, zIndex: 99, cursor: "grabbing" }}
                drag
                dragElastic={0.05}
                dragMomentum={false}
                dragConstraints={containerRef}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="bg-white/95 border-4 border-black/70 rounded-xl shadow-[6px_6px_0_0_rgba(0,0,0,0.15)] overflow-hidden pointer-events-none select-none">
                  <img
                    src={src}
                    alt="A memory"
                    className="w-32 h-32 md:w-40 md:h-40 object-cover bg-pink-50"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
