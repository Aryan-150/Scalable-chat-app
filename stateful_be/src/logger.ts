// it supposed to log the state of "games" every 5secs

import { gameManager } from "./store";

export const logger = () => {
  setInterval(() => {
    gameManager.logGames();
  }, 5000)
}