// it supposed to push a "game" every 3secs.

import { gameManager } from "./store";
import { logger } from "./logger";

logger();
setInterval(() => {
  gameManager.addGame();
}, 3000)

// checking if moves has been added or not...!
setInterval(() => {
  try {
    const randomGame = gameManager.getRandomGame();
    if(randomGame == "No games" || !randomGame){
      throw new Error("error getting a random game");
    }
    gameManager.addMove(randomGame.gameId, randomGame.playerName);
    
  } catch (error: any) {
    console.log(error.toString());
  }
  
}, 2000)