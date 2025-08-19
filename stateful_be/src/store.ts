type Move = {
  userId: string;
  move: string;
}

// interface for each chess game:
interface Game {
  id: string;
  whitePlayerName: string;
  blackPlayerName: string;
  moves: Move[]
}

export const games: Game[] = []