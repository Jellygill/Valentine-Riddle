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
    buttonText: "You fall asleep when the cold sneaks in",
    roastText: "You get so cozy, you drift mid spin.",
    sweetText: "Watching you sleep feels calm and true, so peaceful somehow my heart warms you.",
  },
  {
    id: 2,
    emoji: "😔",
    buttonText: "You ragebait me sometimes",
    roastText: "You tease me at the funniest times",
    sweetText: "But when you laugh and start to smile, my heart just melts and stays warm awhile.",
  },
  {
    id: 3,
    emoji: "🎮",
    buttonText: "You're my player 2",
    roastText: "So many hours, just us two.",
    sweetText: "Win or lose, no matter the view,Every game is better playing with you.",
  },
  {
    id: 4,
    emoji: "📱",
    buttonText: "When you’re busy, replies take time",
    roastText: "Duties first and your phone usage declines.",
    sweetText: "But one 'hi babiii' when your day is through, turns everything bright just hearing from you.",
  },
];
