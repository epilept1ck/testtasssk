import { Joke, ApiResponse } from "models";

class JokeService {
  getRandomJokes(amount: number): Promise<Joke[]> {
    return fetch(`http://api.icndb.com/jokes/random/${amount}`)
      .then(r => r.json() as Promise<ApiResponse<Joke[]>>)
      .then(r => r.value);
  }
}

export default new JokeService();
