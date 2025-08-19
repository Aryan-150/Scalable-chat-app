// it supposed to log the state of "games" every 5secs

import { GameManager } from "./store";

export const logger = () => {
  setInterval(() => {
    GameManager.getInstance().logGames();
  }, 5000)
}