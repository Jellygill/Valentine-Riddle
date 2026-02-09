import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { attachedAssets } from "@/assets/attached";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(attachedAssets.audio.valentine);
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[60] p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary transition-colors border-2 border-white/50"
      title={playing ? "Pause music" : "Play music"}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
    </button>
  );
}
