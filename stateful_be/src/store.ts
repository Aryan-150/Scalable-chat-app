type Move = {
  username: string;
  move: string;
}

// interface for each chess game:
interface Game {
  id: string;
  whitePlayerName: string;
  blackPlayerName: string;
  moves: Move[]
}

export class GameManager {
  private games: Game[]
  private static instance: GameManager

  private constructor(){
    this.games = [];
  }

  public static getInstance(){
    if(!GameManager.instance){
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public logGames(){
    console.log(this.games);
  }

  public addGame(){
    this.games.push({
      id: Math.random().toString(),
      whitePlayerName: Math.random().toString(),
      blackPlayerName: Math.random().toString(),
      moves: []
    })
    console.log("A new game has been added...!")
  }

  public getRandomGame(){
    if(this.games.length == 0){
      return "No games"
    }
    while(1){
      const index = Math.floor(Math.random() * this.games.length);
      const game = this.games[index];
      const choices = ["white", "black"];
      const choice = choices[Math.floor(Math.random() * 2)];
      if(game){
        const playerName = choice == "white" ? game.whitePlayerName : game.blackPlayerName;
        return {
          gameId: game.id,
          playerName: playerName
        }
      }
    }
  }

  // also, can create a function to add move:
  public addMove(gameId: string, player: string){
    const game = this.games.find(x => x.id === gameId);
    if(game){
      game.moves.push({
        username: player,
        move: Math.random().toString()
      })
    }
    else{
      console.log(`game with gameId: ${gameId} does not exists...!`);
    }
  }
}

