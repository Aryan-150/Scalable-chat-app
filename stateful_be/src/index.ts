// it supposed to push a "game" every 3secs.

import { GameManager } from "./store";
import { logger } from "./logger";

logger();
setInterval(() => {
  GameManager.getInstance().addGame();
}, 3000)

// checking if moves has been added or not...!
setInterval(() => {
  try {
    const randomGame = GameManager.getInstance().getRandomGame();
    if(randomGame == "No games" || !randomGame){
      throw new Error("error getting a random game");
    }
    GameManager.getInstance().addMove(randomGame.gameId, randomGame.playerName);
    
  } catch (error: any) {
    console.log(error.toString());
  }
  
}, 2000)