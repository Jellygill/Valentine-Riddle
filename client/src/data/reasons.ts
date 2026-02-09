/** Static reasons data for GitHub Pages (no backend). Same as server seeds. */
export interface Reason {
  id: number;
  emoji: string;
  buttonText: string;
  roastText: string; // used as first-line / reason text (wholesome)
  sweetText: string;
}

export const STATIC_REASONS: Reason[] = [
  {
    id: 1,
    emoji: "😴",
    buttonText: "You fall asleep everywhere",
    roastText: "You get so cozy you drift off mid-movie or mid-conversation.",
    sweetText: "And somehow, watching you sleep makes my heart soft. You look so peaceful.",
  },
  {
    id: 2,
    emoji: "🍟",
    buttonText: "You steal my fries",
    roastText: "You always say you're not hungry, then end up eating half my plate.",
    sweetText: "But honestly? I'd give you all my fries just to see you smile.",
  },
  {
    id: 3,
    emoji: "🎮",
    buttonText: "You're my player 2",
    roastText: "We've spent so many hours on the couch with controllers in hand.",
    sweetText: "Playing with you is still my favorite thing. You're my player 2 forever.",
  },
  {
    id: 4,
    emoji: "📱",
    buttonText: "You take your time to reply",
    roastText: "You're not always on your phone, and that's actually rare.",
    sweetText: "But when you do reply, even a simple 'hehe' makes my whole day better.",
  },
];
