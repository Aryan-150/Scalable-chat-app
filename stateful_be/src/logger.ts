// it supposed to log the state of "games" every 5secs

import { games } from "./store";

export const logger = () => {
  setInterval(() => {
    console.log(games);
  }, 5000)
}