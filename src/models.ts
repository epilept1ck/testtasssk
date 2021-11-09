export interface Joke {
  id: number;
  joke: string;
  categories: string[];

}

export interface ApiResponse<T> {
  type: string;
  value: T;
}
