// it supposed to push a "game" every 3secs.

import { games } from "./store";
import { logger } from "./logger";

logger();

setInterval(() => {
  console.log('game added in the games array');
  games.push({
    id: Math.random().toString(),
    whitePlayerName: Math.random().toString(),
    blackPlayerName: Math.random().toString(),
    moves: []
  })
}, 3000)