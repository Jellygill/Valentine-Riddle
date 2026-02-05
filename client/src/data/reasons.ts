/** Static reasons data for GitHub Pages (no backend). Same as server seeds. */
export interface Reason {
  id: number;
  emoji: string;
  buttonText: string;
  roastText: string;
  sweetText: string;
}

export const STATIC_REASONS: Reason[] = [
  {
    id: 1,
    emoji: "😴",
    buttonText: "You fall asleep everywhere",
    roastText: "Mid-movie, mid-conversation, probably mid-sentence.",
    sweetText: "And somehow, watching you sleep makes my heart soft. You look so peaceful.",
  },
  {
    id: 2,
    emoji: "🍟",
    buttonText: "You steal my fries",
    roastText: "Even when you said you weren't hungry. EVERY. SINGLE. TIME.",
    sweetText: "But honestly? I'd give you all my fries just to see you smile.",
  },
  {
    id: 3,
    emoji: "🎮",
    buttonText: "You're bad at games",
    roastText: "Like, impressively bad. How do you even lose at Mario Kart that badly?",
    sweetText: "But playing with you is still my favorite thing. You're my player 2 forever.",
  },
  {
    id: 4,
    emoji: "📱",
    buttonText: "You take forever to reply",
    roastText: "I could literally grow a beard waiting for your texts sometimes.",
    sweetText: "But when you do reply, even a simple 'hehe' makes my whole day better.",
  },
];
