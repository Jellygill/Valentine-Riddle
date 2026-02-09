import beet from "@assets/beet.gif";
import breadLoaf from "@assets/bread-loaf.gif";
import heart from "@assets/heart_14113044.gif";
import kiss from "@assets/kiss.gif";
import latteArt from "@assets/latte-art.gif";
import lock from "@assets/lock.gif";
import loveLetter from "@assets/love-letter.gif";
import love from "@assets/love_11697258.gif";
import valentinesDay from "@assets/valentines-day_14113008.gif";

import kissPng from "@assets/kiss.png";
import img1 from "@assets/image_1770269557320.png";
import img2 from "@assets/image_1770269659359.png";

import bg1 from "@assets/Background pic1.png";
import bg2 from "@assets/background pic 2.png";
import bg3 from "@assets/background pic 3.png";
import bg4 from "@assets/background pic 4.png";
import bg5 from "@assets/background pic 5.png";

import download from "@assets/Download_1769940663555.mp4";
import valentineMp3 from "@assets/Laufey - Valentine (Official Audio).mp3";

export const attachedAssets = {
  audio: {
    valentine: valentineMp3,
  },
  gifs: {
    beet,
    breadLoaf,
    heart,
    kiss,
    latteArt,
    lock,
    loveLetter,
    love,
    valentinesDay,
  },
  images: {
    kissPng,
    img1,
    img2,
    backgrounds: [bg1, bg2, bg3, bg4, bg5],
  },
  video: {
    download,
  },
} as const;

